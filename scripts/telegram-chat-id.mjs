/**
 * `.env.local` dagi TELEGRAM_BOT_TOKEN ni o'qib, botga yozgan odamlarning
 * chat_id sini chiqaradi.
 *
 *   npm run tg:id
 *
 * TARTIB
 * ──────
 *   1. @BotFather → /newbot → token oling va uni `.env.local` ga yozing:
 *        TELEGRAM_BOT_TOKEN=...
 *   2. Telegramda o'sha botni toping va unga BIROR NARSA YOZING (masalan
 *      /start). Bu majburiy: bot birinchi bo'lib yoza olmaydi, shuning
 *      uchun suhbatni siz boshlashingiz kerak.
 *
 *      Guruhga yubormoqchi bo'lsangiz: botni guruhga qo'shib, o'sha yerga
 *      "/start@<bot_username>" deb yozing. Botga to'g'ridan-to'g'ri
 *      qaratilmagan xabarlarni u maxfiylik rejimida ko'rmaydi, shuning
 *      uchun oddiy "salom" kifoya qilmaydi. Guruh id si manfiy bo'ladi.
 *   3. Shu skriptni ishga tushiring va chiqqan id ni `.env.local` ga
 *      TELEGRAM_CHAT_ID sifatida qo'shing.
 *
 * NIMA UCHUN ALOHIDA SKRIPT
 * ─────────────────────────
 * getUpdates havolasini brauzerda ochish ham mumkin, lekin unda token
 * manzil qatorida qoladi — brauzer tarixiga, ba'zan sinxronizatsiyaga
 * tushadi. Bu yerda token faqat `.env.local` da turadi.
 *
 * Token noto'g'ri bo'lsa Telegram "Unauthorized" deydi; bo'sh ro'yxat esa
 * deyarli har doim 2-qadam bajarilmaganini bildiradi.
 */

import { readFileSync } from "node:fs";

const ENV_FILE = ".env.local";

function readToken() {
  let raw;
  try {
    raw = readFileSync(ENV_FILE, "utf8");
  } catch {
    console.error(`${ENV_FILE} topilmadi. .env.example dan nusxa oling.`);
    process.exit(1);
  }

  // Oddiy o'qish yetarli: bu faylni faqat o'zimiz yozamiz, dotenv kerak emas.
  const line = raw.split(/\r?\n/).find((l) => l.trim().startsWith("TELEGRAM_BOT_TOKEN="));
  const token = line?.slice(line.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "");

  if (!token) {
    console.error(`${ENV_FILE} da TELEGRAM_BOT_TOKEN bo'sh yoki yo'q.`);
    console.error("@BotFather dan token oling va shu faylga yozing.");
    process.exit(1);
  }
  return token;
}

const token = readToken();

/** Telegram API chaqiruvi. Token hech qachon chop etilmaydi. */
async function tg(method) {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`);
  const data = await res.json();
  if (!data.ok) {
    console.error(`Telegram rad etdi (${method}):`, data.description);
    console.error("Ko'pincha bu \u2014 token xato ko'chirilgani.");
    process.exit(1);
  }
  return data.result;
}

const me = await tg("getMe");
console.log(`Bot: @${me.username}\n`);

/*
  Webhook o'rnatilgan bo'lsa Telegram xabarlarni o'sha manzilga yuboradi va
  getUpdates hech narsa qaytarmaydi \u2014 ro'yxat bo'sh ko'rinadi. Buni
  aytmasak, sabab topilmay qoladi.
*/
const hook = await tg("getWebhookInfo");
if (hook.url) {
  console.error(`Diqqat: botga webhook o'rnatilgan \u2014 ${hook.url}`);
  console.error("Shu sabab getUpdates hech narsa qaytarmaydi. Bot boshqa");
  console.error("loyihada ishlayotgan bo'lsa, portfolio uchun alohida bot");
  console.error("yarating \u2014 webhookni o'chirsangiz o'sha loyiha buziladi.");
  process.exit(1);
}

const data = { result: await tg("getUpdates") };

/*
  Bitta odam bir nechta xabar yozgan bo'lishi mumkin, chat_id esa bitta.
  Shuning uchun id bo'yicha yig'amiz.
*/
const chats = new Map();
for (const update of data.result) {
  const msg = update.message ?? update.channel_post ?? update.my_chat_member;
  const chat = msg?.chat;
  if (chat) chats.set(chat.id, chat);
}

if (chats.size === 0) {
  console.log("Yangi xabar yo'q. Sabablari:\n");
  console.log("  • Botga hali yozmagansiz — Telegramda oching va /start yozing.");
  console.log("  • Eski xabarlar o'chgan — Telegram ularni ~24 soat saqlaydi.");
  console.log("  • GURUHDA bo'lsa: bot maxfiylik rejimida faqat o'ziga qaratilgan");
  console.log(`    xabarlarni ko'radi. Guruhga "/start@${me.username}" deb yozing.\n`);
  console.log("Keyin qayta ishga tushiring: npm run tg:id");
  process.exit(0);
}

console.log("Topildi:\n");
for (const chat of chats.values()) {
  const nom = chat.title ?? [chat.first_name, chat.last_name].filter(Boolean).join(" ");
  console.log(`  ${nom || "(nomsiz)"}  \u2014  ${chat.type}`);
  console.log(`  TELEGRAM_CHAT_ID=${chat.id}\n`);
}
console.log(`Kerakligini tanlab, ${ENV_FILE} ga qo'shing va dev serverni qayta ishga tushiring.`);
