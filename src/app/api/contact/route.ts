import { NextResponse } from "next/server";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const LIMITS = { name: 80, email: 120, message: 2000 } as const;

/**
 * Telegram xabari `parse_mode: "HTML"` bilan yuboriladi, shuning uchun
 * foydalanuvchi matnidagi `<`, `>`, `&` belgilari escape qilinishi SHART.
 * Aks holda `<b>` kabi matn xabarni buzadi (yoki Telegram uni butunlay rad etadi).
 */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Oddiy in-memory rate limit: bitta IP daqiqasiga 5 ta xabar.
 * Serverless'da har instance o'z hisobini yuritadi — bu to'liq himoya emas,
 * lekin oddiy spam-botni to'xtatish uchun yetarli.
 *
 * MUHIM: hisob faqat **to'g'ri to'ldirilgan** so'rovlar uchun yuritiladi
 * (pastdagi chaqiruv joyiga qarang). Aks holda emailini ikki marta xato yozgan
 * odam bloklanib qolardi.
 */
const RATE_LIMIT = { max: 5, windowMs: 60_000 };
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);

  // Xotira cheksiz o'smasin — eskirgan IP'larni tozalab turamiz.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT.max;
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  if (!TOKEN || !CHAT_ID) {
    console.error("Contact API: TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID sozlanmagan");
    return NextResponse.json({ ok: false, error: "server_not_configured" }, { status: 500 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const body = (payload ?? {}) as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!email || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return NextResponse.json({ ok: false, error: "too_long" }, { status: 400 });
  }

  // Faqat shu nuqtagacha yetib kelgan (ya'ni Telegram'ga ketadigan) so'rovlar
  // hisobga olinadi.
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const text = [
    "<b>Yangi portfolio kontakt xabari</b>",
    "",
    `<b>Ism:</b> ${escapeHtml(name || "—")}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    "",
    "<b>Xabar:</b>",
    escapeHtml(message),
  ].join("\n");

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" }),
    });

    const data = (await tgRes.json()) as { ok?: boolean; description?: string };

    if (!data.ok) {
      // Telegram'ning xato matni foydalanuvchiga ko'rsatilmaydi (token/chat_id sizib
      // chiqmasligi uchun) — faqat serverda loglanadi.
      console.error("Telegram API error", data.description);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error", error);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }
}
