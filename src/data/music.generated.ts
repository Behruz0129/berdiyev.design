/**
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
} = {
  "service": "yandex",
  "name": "berdiyev.design",
  "url": "https://music.yandex.com/playlists/b7d99837-71c2-cc4a-96ec-22bed98edcb8",
  "covers": [
    "/personal/music-1.jpg",
    "/personal/music-2.jpg",
    "/personal/music-3.jpg",
    "/personal/music-4.jpg",
    "/personal/music-5.jpg"
  ],
  "trackCount": 6,
  "syncedAt": "2026-08-31"
};
