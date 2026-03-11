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

export function getNested(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return path;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : path;
}

export type MessageKey = keyof Messages | `${keyof Messages}.${string}`;
