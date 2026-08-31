/**
 * Pleylistdan nom, trek soni va albom muqovalarini olib keladi; muqovalarni
 * `public/personal/` ga yozadi va natijani `src/data/music.generated.ts` ga
 * saqlaydi.
 *
 *   npm run music:sync "<pleylist havolasi>"
 *   npm run music:sync                        # oldingi havolani qayta ishlatadi
 *
 * IKKALA XIZMAT HAM QO'LLAB-QUVVATLANADI — havolaga qarab o'zi tanlaydi:
 *
 *   Yandex   music.yandex.uz/users/<login>/playlists/<raqam>
 *            music.yandex.com/playlists/<uuid>          (ulashish havolasi)
 *   Spotify  open.spotify.com/playlist/<id>
 *
 * NIMA OLINADI
 * ────────────
 *   Yandex           nom · trek soni · 5 ta albom muqovasi   (kalit kerak emas)
 *   Spotify + kalit  nom · trek soni · 5 ta albom muqovasi
 *   Spotify kalitsiz nom · 1 ta umumiy muqova
 *
 * Spotify Web API kalitdan tashqari ilova egasida Premium obuna ham talab
 * qiladi; bo'lmasa 403 qaytaradi va skript kalitsiz rejimga tushadi.
 * Yandexda bunday cheklov yo'q, lekin uning API si norasmiy — hujjati ham,
 * kafolati ham yo'q, istalgan payt o'zgarishi mumkin.
 *
 * NIMA UCHUN BUILD PAYTIDA, RUNTIME'DA EMAS
 * ─────────────────────────────────────────
 * Pleylist oyiga bir marta o'zgaradi. Har so'rovda tashqi API'ga borish
 * hech narsa bermaydi, faqat yangi buziladigan joy qo'shadi. Bu yerda eng
 * yomon holat — shu skriptning xato berishi; saytdagi ma'lumot oxirgi
 * muvaffaqiyatli sinxrondan qolgan holida ishlab turaveradi.
 */

import { writeFile, mkdir, readFile, readdir, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DATA = path.join(ROOT, "src", "data", "music.generated.ts");
const OUT_IMAGES = path.join(ROOT, "public", "personal");
const ENV_FILE = path.join(ROOT, ".env.local");

/** Kartochkada nechta muqova ko'rinadi. Trek kamroq bo'lsa — kamroq. */
const COVER_COUNT = 5;
/** Yandex muqova URI sida `%%` o'rniga qo'yiladigan o'lcham. */
const YANDEX_COVER_SIZE = "400x400";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

/* ─── Havolani tanish ────────────────────────────────────────────────── */

/**
 * Havoladan qaysi xizmat va qaysi pleylist ekanini aniqlaydi hamda toza
 * ko'rinishga keltiradi. Ulashish havolasidagi `?si=...` kabi kuzatuv
 * belgilari tashlab yuboriladi — ular saytda turishi shart emas.
 */
function parseSource(raw) {
  const uri = raw.match(/^spotify:playlist:([A-Za-z0-9]+)$/);
  if (uri) {
    return { service: "spotify", id: uri[1], url: `https://open.spotify.com/playlist/${uri[1]}` };
  }

  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error(`Havola noto'g'ri: ${raw}`);
  }
  const host = parsed.hostname;

  if (/(^|\.)music\.yandex\.[a-z]+$/.test(host)) {
    // Domen foydalanuvchi yozganicha qoladi (.uz / .ru / .com) — tashrif
    // buyuruvchi keraksiz qayta yo'naltirishga tushmasin. Kuzatuv
    // parametrlari (`?ref_id=`, `?utm_*`) esa tashlab yuboriladi.
    const url = `${parsed.origin}${parsed.pathname}`;

    // Eski shakl: egasi va raqami havolaning o'zida.
    const byUser = parsed.pathname.match(/\/users\/([^/]+)\/playlists\/(\d+)/);
    if (byUser) {
      return { service: "yandex", owner: decodeURIComponent(byUser[1]), kind: byUser[2], url };
    }

    // Yangi ulashish havolasi faqat uuid beradi — uning uchun alohida
    // endpoint bor, javob tuzilishi esa bir xil.
    const byUuid = parsed.pathname.match(/\/playlists\/([0-9a-f-]{36})/i);
    if (byUuid) {
      return { service: "yandex", uuid: byUuid[1], url };
    }

    throw new Error(
      "Yandex havolasi tanilmadi.\n" +
        "  Kutilgani: `/users/<login>/playlists/<raqam>` yoki `/playlists/<uuid>`.\n" +
        `  Kelgani: ${parsed.pathname}`,
    );
  }

  if (/(^|\.)spotify\.com$/.test(host)) {
    const m = parsed.pathname.match(/\/playlist\/([A-Za-z0-9]+)/);
    if (!m) {
      throw new Error(
        "Spotify havolasida `/playlist/<id>` bo'lishi kerak.\n" +
          "  Pleylistni oching → «Share» → «Copy link to playlist».\n" +
          `  Kelgani: ${parsed.pathname}`,
      );
    }
    return { service: "spotify", id: m[1], url: `https://open.spotify.com/playlist/${m[1]}` };
  }

  throw new Error(
    `Tanish bo'lmagan xizmat: ${host}\n  Yandex Music yoki Spotify havolasi kutilyapti.`,
  );
}

/* ─── Yandex ─────────────────────────────────────────────────────────── */

/**
 * Ochiq pleylist token'siz o'qiladi. Ikki endpoint bor: eski havola egasi va
 * raqami bo'yicha, yangi ulashish havolasi esa uuid bo'yicha — javob
 * tuzilishi ikkalasida bir xil.
 */
async function fetchYandex({ owner, kind, uuid }) {
  const endpoint = uuid
    ? `https://api.music.yandex.net/playlist/${uuid}`
    : `https://api.music.yandex.net/users/${owner}/playlists/${kind}`;

  const res = await fetch(endpoint, {
    headers: { Accept: "application/json", "User-Agent": UA },
  });
  if (res.status === 404) {
    throw new Error("Pleylist topilmadi — u ochiq (public) ekaniga ishonch hosil qiling.");
  }
  if (!res.ok) throw new Error(`Yandex javobi HTTP ${res.status} ${res.statusText}`);

  const { result } = await res.json();
  if (!result) throw new Error("Yandex javobida `result` yo'q — pleylist ochiqmi?");

  // Bitta albomdan bir necha trek bo'lsa kartochkada bir xil plitkalar
  // chiqib qolardi — takrorlar tashlab yuboriladi.
  const seen = new Set();
  const covers = [];
  for (const entry of result.tracks ?? []) {
    const track = entry.track ?? entry;
    const uri = track?.albums?.[0]?.coverUri ?? track?.coverUri;
    if (!uri || seen.has(uri)) continue;
    seen.add(uri);
    covers.push(`https://${uri.replace("%%", YANDEX_COVER_SIZE)}`);
    if (covers.length === COVER_COUNT) break;
  }

  return { name: result.title ?? "", trackCount: result.trackCount ?? 0, covers, full: true };
}

/* ─── Spotify ────────────────────────────────────────────────────────── */

/**
 * `.env.local` ni o'qiydi. Tashqi paket ishlatilmaydi: kerak bo'ladigani —
 * `KALIT=qiymat` qatorlari, boshqa hech narsa emas.
 */
async function readEnvFile() {
  if (!existsSync(ENV_FILE)) return {};
  const text = await readFile(ENV_FILE, "utf8");
  const env = {};
  for (const line of text.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

async function spotifyToken(id, secret) {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      `Spotify kalitlarini qabul qilmadi (HTTP ${res.status}): ${data.error_description ?? data.error ?? ""}`,
    );
  }
  return data.access_token;
}

async function fetchSpotifyApi(id, token) {
  const res = await fetch(
    `https://api.spotify.com/v1/playlists/${id}?fields=name,tracks(total,items(track(album(images))))`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  // Spotify xatoni ba'zan oddiy matn bilan qaytaradi (JSON emas).
  const rawBody = await res.text();
  let data = {};
  try {
    data = JSON.parse(rawBody);
  } catch {
    data = {};
  }

  if (res.status === 404) {
    throw new Error("Pleylist topilmadi — u ochiq (public) ekaniga ishonch hosil qiling.");
  }
  if (!res.ok) {
    // 403 odatda kalit xato bo'lgani uchun emas: Spotify Web API ni faqat
    // Premium obunasi bor akkauntning ilovasiga ochadi. Shuning uchun bu
    // xato "tuzatib bo'ladigan" deb belgilanadi — kalitsiz rejimga o'tiladi.
    const err = new Error(
      `Spotify javobi HTTP ${res.status}: ${data.error?.message ?? rawBody}`.trim(),
    );
    err.recoverable = res.status === 403;
    throw err;
  }

  const seen = new Set();
  const covers = [];
  for (const item of data.tracks?.items ?? []) {
    const images = item?.track?.album?.images ?? [];
    // Spotify rasmlarni kattadan kichikka beradi; o'rtachasi yetarli.
    const image = images[1] ?? images[0];
    if (!image?.url || seen.has(image.url)) continue;
    seen.add(image.url);
    covers.push(image.url);
    if (covers.length === COVER_COUNT) break;
  }

  return { name: data.name ?? "", trackCount: data.tracks?.total ?? 0, covers, full: true };
}

/** Kalitsiz yo'l: faqat nom va bitta umumiy muqova. */
async function fetchSpotifyOembed(playlistUrl) {
  const res = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(playlistUrl)}`);
  if (!res.ok) {
    throw new Error(`Spotify oembed javob bermadi (HTTP ${res.status}) — pleylist ochiqmi?`);
  }
  const data = await res.json();
  return {
    name: data.title ?? "",
    trackCount: 0,
    covers: data.thumbnail_url ? [data.thumbnail_url] : [],
    full: false,
  };
}

async function fetchSpotify(source) {
  const env = { ...(await readEnvFile()), ...process.env };
  if (env.SPOTIFY_CLIENT_ID && env.SPOTIFY_CLIENT_SECRET) {
    try {
      const token = await spotifyToken(env.SPOTIFY_CLIENT_ID, env.SPOTIFY_CLIENT_SECRET);
      const data = await fetchSpotifyApi(source.id, token);
      console.log("Rejim     : Spotify Web API (to'liq)");
      return data;
    } catch (err) {
      if (!err.recoverable) throw err;
      console.log("Rejim     : Spotify oembed (Web API ruxsat bermadi)");
      console.log(`            ${err.message}`);
      return fetchSpotifyOembed(source.url);
    }
  }
  console.log("Rejim     : Spotify oembed (kalitsiz)");
  return fetchSpotifyOembed(source.url);
}

/* ─── Fayllar ────────────────────────────────────────────────────────── */

/** Oldingi sinxrondan qolgan muqovalar — yangisidan ko'p bo'lsa qolib ketardi. */
async function clearOldCovers() {
  if (!existsSync(OUT_IMAGES)) return;
  for (const file of await readdir(OUT_IMAGES)) {
    if (/^music-\d+\.jpg$/.test(file)) await unlink(path.join(OUT_IMAGES, file));
  }
}

async function downloadCover(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Muqova yuklanmadi (HTTP ${res.status}): ${url}`);

  const type = res.headers.get("content-type") ?? "";
  if (!type.startsWith("image/")) {
    throw new Error(`Muqova o'rniga rasm emas keldi (${type}): ${url}`);
  }
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
}

/** Argument berilmasa oldingi havola ishlatiladi. */
async function previousUrl() {
  if (!existsSync(OUT_DATA)) return null;
  const { musicPlaylist } = await import(`file://${OUT_DATA}?t=${Date.now()}`);
  return musicPlaylist?.url || null;
}

/* ─── Asosiy oqim ────────────────────────────────────────────────────── */

async function main() {
  const input = process.argv[2] ?? (await previousUrl());
  if (!input) {
    console.error(
      "Pleylist havolasi kerak:\n" +
        '  npm run music:sync "https://music.yandex.uz/users/<login>/playlists/<raqam>"\n' +
        '  npm run music:sync "https://open.spotify.com/playlist/<id>"',
    );
    process.exit(1);
  }

  const source = parseSource(input);
  console.log(`Xizmat    : ${source.service === "yandex" ? "Yandex Music" : "Spotify"}`);

  const data = source.service === "yandex" ? await fetchYandex(source) : await fetchSpotify(source);

  if (data.covers.length === 0) throw new Error("Muqova topilmadi.");
  console.log(`Nomi      : ${data.name}`);
  if (data.trackCount) console.log(`Treklar   : ${data.trackCount}`);

  await mkdir(OUT_IMAGES, { recursive: true });
  await clearOldCovers();

  const covers = [];
  for (const [i, url] of data.covers.entries()) {
    const file = `music-${i + 1}.jpg`;
    await downloadCover(url, path.join(OUT_IMAGES, file));
    covers.push(`/personal/${file}`);
    console.log(`Muqova ${i + 1} : public/personal/${file}`);
  }

  const out = {
    // Kartochka tugma matnini shu maydonga qarab tanlaydi.
    service: source.service,
    name: data.name,
    url: source.url,
    covers,
    trackCount: data.trackCount,
    // Mahalliy sana: `toISOString()` UTC beradi, Toshkent esa UTC+5 —
    // kechqurun sinxron qilinsa u kechagi kunni yozib qo'yardi.
    syncedAt: new Date().toLocaleDateString("sv-SE"),
  };

  await writeFile(
    OUT_DATA,
    `/**
 * AVTOMATIK YARATILADI — qo'lda tahrirlamang.
 * Yangilash: npm run music:sync ["<pleylist havolasi>"]
 */
export const musicPlaylist: {
  service: "" | "yandex" | "spotify";
  name: string;
  url: string;
  covers: string[];
  trackCount: number;
  syncedAt: string;
} = ${JSON.stringify(out, null, 2)};
`,
    "utf8",
  );

  console.log(`\nYozildi   : src/data/music.generated.ts (${out.syncedAt})`);
  if (!data.full) {
    console.log(
      "\nEslatma   : faqat nom va bitta umumiy muqova olindi. Trek soni va\n" +
        "            alohida albom muqovalari Spotify Web API dan keladi,\n" +
        "            u esa ilova egasida Premium obuna bo'lishini talab qiladi.",
    );
  }
}

main().catch((err) => {
  console.error(`\nSinxron bajarilmadi:\n  ${err.message}`);
  console.error(
    "\nSaytdagi ma'lumot o'zgarmadi — oxirgi muvaffaqiyatli sinxrondan qolgani turibdi.",
  );
  process.exit(1);
});
