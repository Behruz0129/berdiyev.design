import { NextResponse } from "next/server";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  if (!TOKEN || !CHAT_ID) {
    return NextResponse.json(
      { ok: false, error: "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing" },
      { status: 500 },
    );
  }

  try {
    const { name, email, message } = (await request.json()) as {
      name: string;
      email: string;
      message: string;
    };

    const safeName = name?.trim() || "Anon";
    const safeEmail = email?.trim() || "No email";
    const safeMessage = message?.trim() || "No message";

    const text = [
      "<b>Yangi portfolio kontakt xabari</b>",
      "",
      `<b>Ism:</b> ${safeName}`,
      `<b>Email:</b> ${safeEmail}`,
      "",
      `<b>Xabar:</b>`,
      safeMessage,
    ].join("\n");

    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    const tgRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });

    const data = await tgRes.json();

    if (!data.ok) {
      return NextResponse.json(
        { ok: false, error: data.description ?? "Telegram API error" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error", error);
    return NextResponse.json(
      { ok: false, error: "Internal error" },
      { status: 500 },
    );
  }
}

