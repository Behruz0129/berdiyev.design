/**
 * Shaxsiy kartochkalar uchun ma'lumot — joylashuv rasmi.
 * Pleylist `music.generated.ts` da (skript yozadi), jihozlar `setup.ts` da.
 *
 */

/**
 * Pleylist Yandex Musicdan avtomatik olinadi — `npm run music:sync`.
 * Nomi, trek soni va uchta albom muqovasi shu buyruq bilan yangilanadi,
 * shuning uchun bu yerda qo'lda yoziladigan narsa yo'q.
 */
export { musicPlaylist } from "./music.generated";

/**
 * Joylashuv kartochkasining fon rasmi — masalan Toshkent sur'ati yoki
 * sun'iy yo'ldosh kadri. Bo'sh qoldirilsa chizilgan ko'cha to'ri qoladi,
 * shuning uchun rasm qo'yilmaguncha ham kartochka bo'sh ko'rinmaydi.
 *
 * Rasmni `public/personal/` ga tashlab, yo'lini shu yerga yozing:
 * masalan "/personal/toshkent.jpg".
 */
export const locationImage = "/personal/tashkent.png";
