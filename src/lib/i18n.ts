import type { Messages } from "@/messages/en";

export type Locale = "en" | "uz" | "ru";

const COOKIE_NAME = "NEXT_LOCALE";

export function getLocaleFromCookie(cookieHeader: string | undefined): Locale {
  if (!cookieHeader) return "en";
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  const value = match?.[1]?.trim();
  if (value === "uz" || value === "ru" || value === "en") return value;
  return "en";
}

export function setLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${locale};path=/;max-age=31536000`;
}

/**
 * Kalit bo'yicha matnni oladi. Topilmasa **bo'sh string** qaytaradi — kalitning
 * o'zini emas. Chaqiruvchi kod hamma joyda `t(key) || fallback` naqshini
 * ishlatadi; kalit qaytarilsa u naqsh hech qachon ishlamas edi va ekranda
 * `projects.modme-landing.problem3` kabi texnik matn ko'rinardi.
 */
export function getNested(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return "";
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : "";
}

export type MessageKey = keyof Messages | `${keyof Messages}.${string}`;
