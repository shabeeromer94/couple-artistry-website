import "server-only";
import { env, isTelegramConfigured } from "@/lib/config/env";

// Silent, server-side "notify the owner" — distinct from
// lib/utils/whatsapp.ts's buildWaLink, which builds a wa.me link a
// *visitor* clicks and sends themselves. Nothing here ever opens on the
// visitor's device. Uses Telegram's Bot API rather than WhatsApp: rock
// solid, official, and free — set up in ~2 minutes via @BotFather (see
// SETUP.md). Swapped in after CallMeBot (an unofficial WhatsApp notifier)
// proved too unreliable in practice.
//
// Optional: until TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are both set,
// this is a no-op — callers don't need to check isTelegramConfigured()
// themselves, and a failure here never throws (logged only), so a hiccup
// with the notification never blocks the availability check response.
export async function sendOwnerNotification(message: string): Promise<void> {
  if (!isTelegramConfigured()) return;

  const url = `https://api.telegram.org/bot${env.telegramBotToken}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: env.telegramChatId, text: message }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("Telegram notification failed:", res.status, body);
    }
  } catch (err) {
    console.error("Telegram notification threw:", err);
  }
}
