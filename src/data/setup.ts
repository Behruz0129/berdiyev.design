/**
 * «My Setup» — ish stolimdagi jihozlar. Kartochka shu ro'yxatni bittalab,
 * o'zi aylantirib ko'rsatadi.
 *
 * Rasmlar `public/setup/` da: 996×996, shaffof fonli PNG. Kartochka ularni
 * `object-contain` bilan chizadi, ya'ni buyum qirqilmaydi va kartochkaning
 * o'z foni ustida "suzib" turadi.
 *
 * Yangi jihoz qo'shish: rasmni shu papkaga tashlang va pastga bitta blok
 * yozing. Ro'yxat bo'sh bo'lsa kartochka umuman chiqmaydi.
 */

export type SetupItem = {
  /** Ichki nom — React ro'yxati uchun, ekranda ko'rinmaydi. */
  id: string;
  /** `public/setup/` ichidagi rasm. */
  image: string;
  /** Jihoz nomi — brend va model. Uch tilda ham bir xil. */
  name: string;
  /** Bir gaplik izoh: nima uchun aynan shu. */
  description: { uz: string; ru: string; en: string };
  /**
   * Ixtiyoriy texnik tarkib — hozircha faqat kompyuterda. Izoh ostida
   * mayda ro'yxat bo'lib chiqadi va o'sha yerning o'zida aylantiriladi,
   * shuning uchun kartochka balandligi o'zgarmaydi.
   */
  specs?: string[];
};

export const setupItems: SetupItem[] = [
  {
    id: "pc-build",
    image: "/setup/case.png",
    name: "Ocypus Gamma C72 White",
    description: {
      uz: "Oq korpus ichidagi butun mashina — sokin, sovuq va yig'ish menga zavq bergan.",
      ru: "Вся машина в белом корпусе — тихая, холодная, и собирать её было в кайф.",
      en: "The whole machine in a white case — quiet, cool, and a joy to build.",
    },
    specs: [
      "AMD Ryzen 5 7600X — 6 cores / 12 threads",
      "ASUS B650E MAX GAMING WiFi W",
      "ZOTAC GAMING GeForce RTX 5060 8GB",
      "32GB G.SKILL Trident Z5 Neo RGB DDR5",
      "2TB NVMe SSD",
      "Delta P650 PSU",
      "Delta L36 WH ARGB V2 cooler",
    ],
  },
  {
    // Ikkala monitor bitta suratda — shuning uchun bitta yozuv. Alohida
    // yozilsa ro'yxatda ketma-ket ikkita bir xil rasm chiqib qolardi.
    id: "asus-tuf-monitors",
    image: "/setup/monitors.png",
    name: 'ASUS TUF Gaming 27" 2K + 24" FHD',
    description: {
      uz: 'Ikki ekran: 27" da kod va dizayn, 24" da terminal, hujjatlar, musiqa.',
      ru: 'Два экрана: на 27" — код и дизайн, на 24" — терминал, документы, музыка.',
      en: 'Two screens: the 27" for code and design, the 24" for terminal, docs and music.',
    },
  },
  {
    id: "aula-f99-pro",
    image: "/setup/keytboard.png",
    name: "AULA F99 Pro",
    description: {
      uz: "Mexanik klaviatura — bosilishi yumshoq, kun bo'yi yozsam ham qo'l charchamaydi.",
      ru: "Механическая клавиатура — мягкий ход, руки не устают за целый день.",
      en: "Mechanical keyboard — soft travel my hands survive a full day of typing on.",
    },
  },
  {
    id: "dark-project-novus",
    image: "/setup/mouse.png",
    name: "Dark Project NOVUS",
    description: {
      uz: "Yengil sichqoncha — uzoq sessiyalardan keyin ham bilak og'rimaydi.",
      ru: "Лёгкая мышь — запястье не ноет даже после долгих сессий.",
      en: "Light mouse — no wrist ache even after long sessions.",
    },
  },
  {
    id: "rapoo-vh500c",
    image: "/setup/headset.png",
    name: "Rapoo VH500C",
    description: {
      uz: "Naushnik — musiqa uchun emas, atrofdagi hamma narsani o'chirish uchun.",
      ru: "Наушники — не столько ради музыки, сколько чтобы отключить всё вокруг.",
      en: "Headset — less about the music, more about muting everything else.",
    },
  },
  {
    id: "logitech-brio-100",
    image: "/setup/webcam.png",
    name: "Logitech BRIO 100",
    description: {
      uz: "1080p veb-kamera — qo'ng'iroqlarda tirik odamdek ko'rinish uchun.",
      ru: "Веб-камера 1080p — чтобы на созвонах выглядеть живым человеком.",
      en: "1080p webcam — so I look like a living person on calls.",
    },
  },
  {
    id: "cougar-e-star-140",
    image: "/setup/table.png",
    name: "Cougar E-Star 140",
    description: {
      uz: "140 sm stol — ikkita monitor, klaviatura, va hali ham bo'sh joy qoladi.",
      ru: "Стол 140 см — два монитора, клавиатура, и место ещё остаётся.",
      en: "140cm desk — two monitors, a keyboard, and still room to spare.",
    },
  },
  {
    id: "ldt46-co12e",
    image: "/setup/breakets.png",
    name: "LDT46-CO12E ×2",
    description: {
      uz: "Monitor kronshteynlari — stol usti bo'shadi, ekranlar nihoyat ko'z balandligida.",
      ru: "Кронштейны для мониторов — стол освободился, экраны наконец на уровне глаз.",
      en: "Monitor arms — desk cleared, screens finally at eye level.",
    },
  },
  {
    // Rasmda brend nomi xiralashtirilgan, shuning uchun nom turiga qarab
    // yozilgan. Aniq modelini bilsangiz — shu qatorni almashtiring.
    id: "armchair",
    image: "/setup/armchair.png",
    name: "Ergonomic Mesh Chair",
    description: {
      uz: "Setupdagi eng arzimas ko'ringan, aslida eng muhim qism: to'r suyanchiq, boshtayanch va tortib chiqariladigan oyoq qo'ygich.",
      ru: "Самая недооценённая и на деле самая важная часть сетапа: сетчатая спинка, подголовник и выдвижная подставка для ног.",
      en: "The most overlooked and actually most important part of the setup: mesh back, headrest and a footrest that slides out.",
    },
  },
  {
    id: "poster-three-circles",
    image: "/setup/poster1.png",
    name: "Three Circles",
    description: {
      uz: "Bauhaus ruhidagi geometrik plakat: qora yoylar, apelsin, pushti va ko'k. Oynaga bosilgan.",
      ru: "Геометрический плакат в духе Баухауса: чёрные дуги, оранжевый, розовый и голубой. Напечатан на стекле.",
      en: "A Bauhaus-minded geometric print: black arcs with orange, pink and blue. Printed on glass.",
    },
  },
  {
    id: "poster-fragments",
    image: "/setup/poster2.png",
    name: "Fragments",
    description: {
      uz: "Qora yumaloq shakllar to'ri va bitta apelsin doira — devordagi yagona rang.",
      ru: "Сетка чёрных скруглённых форм и один оранжевый круг — единственный цвет на стене.",
      en: "A grid of black rounded shapes and a single orange circle — the only colour on the wall.",
    },
  },
  {
    id: "poster-now",
    image: "/setup/poster3.png",
    name: "NOW 今",
    description: {
      uz: "Yaponcha «今» — «hozir». Ertaga emas degan eslatma, ish stolining ro'parasida.",
      ru: "Японское «今» — «сейчас». Напоминание «не завтра» прямо напротив стола.",
      en: "The Japanese “今” — “now”. A not-tomorrow reminder, right across from the desk.",
    },
  },
];
