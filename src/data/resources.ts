/**
 * «Resurslar» sahifasining butun mazmuni.
 *
 * YANGI RESURS QO'SHISH: pastdagi ro'yxatga bitta blok qo'shing — boshqa
 * hech qayerga tegish shart emas. Kategoriya chiplari, sanoqlar, qidiruv
 * va sitemap shu ro'yxatdan hisoblanadi.
 *
 * Domen `url` dan olinadi, shuning uchun u alohida yozilmaydi — ikki joyda
 * yozilgan narsa ertami-kechmi bir-biriga mos kelmay qoladi.
 *
 * Har bir havola HTTP bilan tekshirilgan. Ba'zi saytlar (Unsplash, Pexels,
 * LottieFiles, Screely) avtomatik so'rovni bloklaydi va 401/403 qaytaradi —
 * ular brauzerda normal ochiladi. Figma plaginlarining ID lari Figma'ning
 * o'z ro'yxatidan ko'chirilgan: ularni yoddan yozib bo'lmaydi, noto'g'ri
 * ID esa jim turib 404 beradi.
 */

export type ResourcePrice = "free" | "freemium" | "paid";

export type ResourceCategory =
  | "inspiration"
  | "uikit"
  | "designSystem"
  | "icons"
  | "fonts"
  | "colors"
  | "images"
  | "mockups"
  | "motion"
  | "learning"
  | "figmaPlugins"
  | "tools";

export type Resource = {
  /** Brend nomi — uch tilda ham bir xil, tarjima qilinmaydi. */
  name: string;
  url: string;
  category: ResourceCategory;
  /** Bir gap: nima uchun kerak. Reklama emas, vazifasi. */
  description: { uz: string; ru: string; en: string };
  price: ResourcePrice;
  /** ★ bilan belgilanadi — o'zim doim ishlatadiganlar. */
  featured?: boolean;
};

/**
 * Kategoriyalar — ekranda shu tartibda chiqadi. Yangi kategoriya qo'shish
 * uchun bu yerga bitta yozuv va `ResourceCategory` ga bitta nom.
 */
export const resourceCategories: {
  key: ResourceCategory;
  label: { uz: string; ru: string; en: string };
}[] = [
  {
    key: "inspiration",
    label: { uz: "Ilhom", ru: "Вдохновение", en: "Inspiration" },
  },
  {
    key: "uikit",
    label: { uz: "UI kit va Figma", ru: "UI-киты и Figma", en: "UI kits & Figma" },
  },
  {
    key: "designSystem",
    label: { uz: "Dizayn tizimlari", ru: "Дизайн-системы", en: "Design systems" },
  },
  { key: "icons", label: { uz: "Ikonkalar", ru: "Иконки", en: "Icons" } },
  { key: "fonts", label: { uz: "Shriftlar", ru: "Шрифты", en: "Typefaces" } },
  { key: "colors", label: { uz: "Ranglar", ru: "Цвета", en: "Colour" } },
  {
    key: "images",
    label: {
      uz: "Rasm, illyustratsiya, 3D",
      ru: "Фото, иллюстрации, 3D",
      en: "Photos, illustration, 3D",
    },
  },
  { key: "mockups", label: { uz: "Mockup", ru: "Мокапы", en: "Mockups" } },
  { key: "motion", label: { uz: "Motion", ru: "Моушн", en: "Motion" } },
  { key: "learning", label: { uz: "O'rganish", ru: "Обучение", en: "Learning" } },
  {
    key: "figmaPlugins",
    label: { uz: "Figma plaginlar", ru: "Плагины Figma", en: "Figma plugins" },
  },
  { key: "tools", label: { uz: "Vositalar", ru: "Инструменты", en: "Tools" } },
];

export const resources: Resource[] = [
  // ── Ilhom ───────────────────────────────────────────────────────────────
  {
    name: "Mobbin",
    url: "https://mobbin.com",
    category: "inspiration",
    price: "freemium",
    featured: true,
    description: {
      uz: "Haqiqiy ilovalardan olingan ekranlar kutubxonasi — oqim bo'yicha qidiriladi: ro'yxatdan o'tish, to'lov, onboarding.",
      ru: "Библиотека экранов из реальных приложений — поиск по потокам: регистрация, оплата, онбординг.",
      en: "Screens from real apps, searchable by flow — sign-up, checkout, onboarding.",
    },
  },
  {
    name: "Refero",
    url: "https://refero.design",
    category: "inspiration",
    price: "freemium",
    description: {
      uz: "Veb-ilovalar ekranlari: komponent, sahifa turi va sanoat bo'yicha filtrlanadi.",
      ru: "Экраны веб-приложений с фильтрами по компонентам, типам страниц и отраслям.",
      en: "Web app screens filtered by component, page type and industry.",
    },
  },
  {
    name: "Awwwards",
    url: "https://www.awwwards.com",
    category: "inspiration",
    price: "free",
    description: {
      uz: "Kuchli veb-dizayn namunalari. Kundalik ish uchun emas, chegarani ko'rish uchun.",
      ru: "Сильные примеры веб-дизайна. Не для ежедневной работы, а чтобы увидеть границу.",
      en: "Ambitious web design. Not for everyday work — for seeing where the edge is.",
    },
  },
  {
    name: "Godly",
    url: "https://godly.website",
    category: "inspiration",
    price: "free",
    description: {
      uz: "Tanlab olingan zamonaviy saytlar to'plami — ortiqcha shovqinsiz, qisqa ro'yxat.",
      ru: "Подборка современных сайтов — короткий список без лишнего шума.",
      en: "A tight, curated list of modern sites — no noise.",
    },
  },
  {
    name: "Land-book",
    url: "https://land-book.com",
    category: "inspiration",
    price: "freemium",
    description: {
      uz: "Landing sahifalar galereyasi: tuzilish va blok ketma-ketligini ko'rish uchun qulay.",
      ru: "Галерея лендингов — удобно смотреть структуру и порядок блоков.",
      en: "A landing page gallery — handy for studying structure and block order.",
    },
  },

  // ── UI kit va Figma ─────────────────────────────────────────────────────
  {
    name: "Untitled UI",
    url: "https://www.untitledui.com",
    category: "uikit",
    price: "freemium",
    featured: true,
    description: {
      uz: "Katta Figma UI kit va dizayn tizimi — nol nuqtadan boshlamaslik uchun.",
      ru: "Большой UI-кит и дизайн-система для Figma — чтобы не начинать с нуля.",
      en: "A large Figma UI kit and design system — so you don't start from zero.",
    },
  },
  {
    name: "Figma Community",
    url: "https://www.figma.com/community",
    category: "uikit",
    price: "free",
    description: {
      uz: "Bepul UI kit, shablon va fayllar — ko'pincha kerakli narsa shu yerdan topiladi.",
      ru: "Бесплатные UI-киты, шаблоны и файлы — чаще всего нужное находится здесь.",
      en: "Free UI kits, templates and files — usually where the thing you need already exists.",
    },
  },
  {
    name: "shadcn/ui",
    url: "https://ui.shadcn.com",
    category: "uikit",
    price: "free",
    featured: true,
    description: {
      uz: "React komponentlari kodini loyihangizga ko'chirib olasiz — kutubxona sifatida bog'lanmaydi.",
      ru: "Код React-компонентов копируется в проект — не подключается как библиотека.",
      en: "React component code you copy into the project — not a dependency.",
    },
  },
  {
    name: "Tailwind Plus",
    url: "https://tailwindui.com",
    category: "uikit",
    price: "paid",
    description: {
      uz: "Tailwind mualliflaridan tayyor bloklar: landing, ilova ekranlari, elektron do'kon.",
      ru: "Готовые блоки от авторов Tailwind: лендинги, экраны приложений, магазин.",
      en: "Ready-made blocks from the Tailwind authors — landing, app screens, commerce.",
    },
  },
  {
    name: "Relume",
    url: "https://www.relume.io",
    category: "uikit",
    price: "paid",
    description: {
      uz: "Sayt xaritasi va wireframe'ni tez yig'ish, keyin Figma yoki Webflow'ga o'tkazish.",
      ru: "Быстрая сборка карты сайта и вайрфреймов с переносом в Figma или Webflow.",
      en: "Build a sitemap and wireframes fast, then push them to Figma or Webflow.",
    },
  },

  // ── Dizayn tizimlari ────────────────────────────────────────────────────
  {
    name: "Material Design 3",
    url: "https://m3.material.io",
    category: "designSystem",
    price: "free",
    description: {
      uz: "Google tizimi — ayniqsa Android uchun o'lcham, holat va harakat qoidalari.",
      ru: "Система Google — размеры, состояния и движение, особенно для Android.",
      en: "Google's system — sizing, states and motion rules, especially for Android.",
    },
  },
  {
    name: "Apple HIG",
    url: "https://developer.apple.com/design/human-interface-guidelines",
    category: "designSystem",
    price: "free",
    description: {
      uz: "iOS va macOS uchun rasmiy qo'llanma. Platforma odatlarini shu yerdan tekshiraman.",
      ru: "Официальное руководство для iOS и macOS. Здесь сверяю привычки платформы.",
      en: "Apple's official guidance for iOS and macOS — where I check platform conventions.",
    },
  },
  {
    name: "Shopify Polaris",
    url: "https://polaris.shopify.com",
    category: "designSystem",
    price: "free",
    description: {
      uz: "Ichki panellar uchun kuchli namuna: jadval, forma, bo'sh holat va xabarlar.",
      ru: "Сильный пример для админок: таблицы, формы, пустые состояния, сообщения.",
      en: "A strong reference for admin UI — tables, forms, empty states, messaging.",
    },
  },
  {
    name: "IBM Carbon",
    url: "https://carbondesignsystem.com",
    category: "designSystem",
    price: "free",
    description: {
      uz: "Ochiq kodli korporativ tizim — token va grid qanday hujjatlashtirilishiga misol.",
      ru: "Открытая корпоративная система — пример документации токенов и сетки.",
      en: "An open enterprise system — a model for documenting tokens and grids.",
    },
  },
  {
    name: "Atlassian Design System",
    url: "https://atlassian.design",
    category: "designSystem",
    price: "free",
    description: {
      uz: "Komponent qoidalari matn bilan batafsil yozilgan — qachon ishlatilmasligi ham.",
      ru: "Правила компонентов расписаны словами — включая то, когда их не использовать.",
      en: "Component rules written out in plain words — including when not to use them.",
    },
  },

  // ── Ikonkalar ───────────────────────────────────────────────────────────
  {
    name: "Lucide",
    url: "https://lucide.dev",
    category: "icons",
    price: "free",
    featured: true,
    description: {
      uz: "Tiniq chiziqli ochiq to'plam, 1500 dan ortiq belgi. React va boshqalar uchun paket bor.",
      ru: "Чистый линейный набор, больше 1500 иконок. Есть пакеты для React и других.",
      en: "A clean open line set, 1500+ icons, with packages for React and friends.",
    },
  },
  {
    name: "Phosphor Icons",
    url: "https://phosphoricons.com",
    category: "icons",
    price: "free",
    featured: true,
    description: {
      uz: "Oltita qalinlik — bitta to'plam ichida yengil va to'q variant. Shu sayt ham shuni ishlatadi.",
      ru: "Шесть начертаний — лёгкий и жирный вариант в одном наборе. Этот сайт на нём.",
      en: "Six weights in one family — light and bold from the same set. This site uses it.",
    },
  },
  {
    name: "Heroicons",
    url: "https://heroicons.com",
    category: "icons",
    price: "free",
    description: {
      uz: "Tailwind jamoasidan kichik, puxta to'plam — ikki o'lcham, ikki uslub.",
      ru: "Небольшой аккуратный набор от команды Tailwind — два размера, два стиля.",
      en: "A small, careful set from the Tailwind team — two sizes, two styles.",
    },
  },
  {
    name: "Tabler Icons",
    url: "https://tabler.io/icons",
    category: "icons",
    price: "free",
    description: {
      uz: "5000 dan ortiq ikonka — kamdan-kam uchraydigan belgi kerak bo'lganda shu yerda bor.",
      ru: "Больше 5000 иконок — когда нужен редкий символ, он обычно здесь.",
      en: "5000+ icons — when you need an unusual symbol, it's usually here.",
    },
  },
  {
    name: "Iconify",
    url: "https://iconify.design",
    category: "icons",
    price: "free",
    description: {
      uz: "Yuzlab to'plam bitta qidiruvda — qaysi to'plamdan ekanini ko'rsatib beradi.",
      ru: "Сотни наборов в одном поиске — сразу видно, из какого набора иконка.",
      en: "Hundreds of sets behind one search, telling you which set each icon is from.",
    },
  },
  {
    name: "Simple Icons",
    url: "https://simpleicons.org",
    category: "icons",
    price: "free",
    description: {
      uz: "Brend logotiplari SVG'da, rasmiy rangi bilan. Texnologiyalar qatori uchun.",
      ru: "Логотипы брендов в SVG с официальным цветом. Для строки технологий.",
      en: "Brand logos as SVG with their official colour — for tech stack rows.",
    },
  },
  {
    name: "Remix Icon",
    url: "https://remixicon.com",
    category: "icons",
    price: "free",
    description: {
      uz: "Chiziqli va to'ldirilgan juftliklar — faol holat uchun qulay.",
      ru: "Парные линейные и заливные начертания — удобно для активного состояния.",
      en: "Matched line and fill pairs — handy for active states.",
    },
  },

  // ── Shriftlar ───────────────────────────────────────────────────────────
  {
    name: "Google Fonts",
    url: "https://fonts.google.com",
    category: "fonts",
    price: "free",
    featured: true,
    description: {
      uz: "Bepul shriftlar; kirill va o'zbek belgilarini qo'llashini shu yerda tekshiraman.",
      ru: "Бесплатные шрифты; здесь проверяю поддержку кириллицы и узбекских знаков.",
      en: "Free typefaces — where I check Cyrillic and Uzbek character support.",
    },
  },
  {
    name: "Fontshare",
    url: "https://www.fontshare.com",
    category: "fonts",
    price: "free",
    featured: true,
    description: {
      uz: "Indian Type Foundry'dan tijorat uchun ham bepul shriftlar — xarakterli va toza.",
      ru: "Бесплатные и для коммерции шрифты от Indian Type Foundry — с характером.",
      en: "Free-for-commercial typefaces from Indian Type Foundry — with real character.",
    },
  },
  {
    name: "Fontsource",
    url: "https://fontsource.org",
    category: "fonts",
    price: "free",
    description: {
      uz: "Shriftni npm orqali o'z serveringizga olasiz — tashqi so'rov va kuzatuv yo'q.",
      ru: "Шрифт ставится через npm на свой сервер — без внешних запросов и трекинга.",
      en: "Self-host fonts via npm — no third-party requests, no tracking.",
    },
  },
  {
    name: "Typewolf",
    url: "https://www.typewolf.com",
    category: "fonts",
    price: "free",
    description: {
      uz: "Haqiqiy saytlarda qaysi shrift juftligi ishlatilganini ko'rsatadi.",
      ru: "Показывает, какие пары шрифтов используются на реальных сайтах.",
      en: "Shows which type pairings real sites are actually using.",
    },
  },
  {
    name: "Modern Font Stacks",
    url: "https://modernfontstacks.com",
    category: "fonts",
    price: "free",
    description: {
      uz: "Hech narsa yuklamaydigan tizim shrift zanjirlari — eng tez variant.",
      ru: "Системные стеки шрифтов, которые ничего не грузят — самый быстрый вариант.",
      en: "System font stacks that load nothing — the fastest option there is.",
    },
  },

  // ── Ranglar ─────────────────────────────────────────────────────────────
  {
    name: "Realtime Colors",
    url: "https://www.realtimecolors.com",
    category: "colors",
    price: "free",
    featured: true,
    description: {
      uz: "Palitrani tayyor sahifa maketida sinaysiz — kvadratchalarda emas.",
      ru: "Палитра проверяется на готовом макете страницы, а не на квадратиках.",
      en: "Try a palette on a real page mock-up instead of swatches.",
    },
  },
  {
    name: "Coolors",
    url: "https://coolors.co",
    category: "colors",
    price: "freemium",
    description: {
      uz: "Palitra generatori — bitta rangni qulflab, qolganini aylantirib tanlanadi.",
      ru: "Генератор палитр — фиксируешь один цвет и перебираешь остальные.",
      en: "A palette generator — lock one colour and cycle the rest.",
    },
  },
  {
    name: "Happy Hues",
    url: "https://www.happyhues.co",
    category: "colors",
    price: "free",
    description: {
      uz: "Har palitra qaysi rang qayerda ishlatilishini ko'rsatib beradi — fon, matn, tugma.",
      ru: "Каждая палитра показывает, где какой цвет: фон, текст, кнопка.",
      en: "Each palette tells you which colour goes where — background, text, button.",
    },
  },
  {
    name: "Open Color",
    url: "https://yeun.github.io/open-color/",
    category: "colors",
    price: "free",
    description: {
      uz: "Interfeys uchun ochiq rang to'plami — har rang 10 pog'onada, yorqinligi tekis.",
      ru: "Открытый набор цветов для интерфейсов — 10 ступеней с ровной светлотой.",
      en: "An open UI colour set — ten steps per hue with even lightness.",
    },
  },
  {
    name: "WebAIM Contrast Checker",
    url: "https://webaim.org/resources/contrastchecker/",
    category: "colors",
    price: "free",
    description: {
      uz: "Matn va fon kontrasti WCAG talabiga yetadimi — bir soniyada javob beradi.",
      ru: "Хватает ли контраста текста и фона по WCAG — ответ за секунду.",
      en: "Whether text and background clear WCAG contrast — answered in a second.",
    },
  },
  {
    name: "UI Colors",
    url: "https://uicolors.app/create",
    category: "colors",
    price: "free",
    description: {
      uz: "Bitta rangdan Tailwind pog'onalarini (50–950) yasab beradi.",
      ru: "Из одного цвета собирает шкалу Tailwind (50–950).",
      en: "Turns one colour into a full Tailwind scale (50–950).",
    },
  },

  // ── Rasm, illyustratsiya, 3D ────────────────────────────────────────────
  {
    name: "Unsplash",
    url: "https://unsplash.com",
    category: "images",
    price: "free",
    featured: true,
    description: {
      uz: "Yuqori sifatli bepul fotosuratlar — tijorat loyihada ham ishlatsa bo'ladi.",
      ru: "Качественные бесплатные фото — можно использовать и в коммерции.",
      en: "High-quality free photography, usable in commercial work.",
    },
  },
  {
    name: "Pexels",
    url: "https://www.pexels.com",
    category: "images",
    price: "free",
    description: {
      uz: "Foto va qisqa videolar — Unsplash'da topilmagani ko'pincha shu yerda bo'ladi.",
      ru: "Фото и короткие видео — чего нет на Unsplash, часто есть здесь.",
      en: "Photos and short video — what Unsplash lacks is often here.",
    },
  },
  {
    name: "unDraw",
    url: "https://undraw.co/illustrations",
    category: "images",
    price: "free",
    featured: true,
    description: {
      uz: "Illyustratsiyalar; asosiy rangini yuklab olishdan oldin o'zgartirasiz.",
      ru: "Иллюстрации; основной цвет меняется прямо перед скачиванием.",
      en: "Illustrations whose accent colour you set before downloading.",
    },
  },
  {
    name: "Storyset",
    url: "https://storyset.com",
    category: "images",
    price: "free",
    description: {
      uz: "Illyustratsiyalar tahrirlanadi va animatsiyali ko'rinishda ham yuklanadi.",
      ru: "Иллюстрации редактируются и скачиваются в том числе анимированными.",
      en: "Editable illustrations that also export animated.",
    },
  },
  {
    name: "Spline",
    url: "https://spline.design",
    category: "images",
    price: "freemium",
    featured: true,
    description: {
      uz: "Brauzerda 3D sahna yasab, uni to'g'ridan-to'g'ri saytga joylash.",
      ru: "3D-сцена прямо в браузере и встраивание её на сайт.",
      en: "Build a 3D scene in the browser and embed it straight into a page.",
    },
  },
  {
    name: "Haikei",
    url: "https://app.haikei.app",
    category: "images",
    price: "free",
    description: {
      uz: "Fon uchun SVG shakllar — to'lqin, blob, to'r; o'lchami kichik.",
      ru: "SVG-фоны: волны, блобы, сетки; маленький вес.",
      en: "SVG backgrounds — waves, blobs, grids; tiny files.",
    },
  },

  // ── Mockup ──────────────────────────────────────────────────────────────
  {
    name: "Shots.so",
    url: "https://shots.so",
    category: "mockups",
    price: "freemium",
    featured: true,
    description: {
      uz: "Skrinshotni bir necha soniyada taqdimotga yaroqli holga keltiradi.",
      ru: "Скриншот за пару секунд превращается в презентационный кадр.",
      en: "Turns a screenshot into a presentable shot in seconds.",
    },
  },
  {
    name: "Mockuuups Studio",
    url: "https://mockuuups.studio",
    category: "mockups",
    price: "freemium",
    description: {
      uz: "Qurilma va muhit mockuplari katalogi — Figma plagini ham bor.",
      ru: "Каталог мокапов устройств и окружений — есть плагин для Figma.",
      en: "A catalogue of device and scene mock-ups, with a Figma plugin.",
    },
  },
  {
    name: "Rotato",
    url: "https://www.rotato.app",
    category: "mockups",
    price: "paid",
    description: {
      uz: "3D qurilma mockuplari va ulardan video — mahsulot sahifasi uchun.",
      ru: "3D-мокапы устройств и видео из них — для страницы продукта.",
      en: "3D device mock-ups and video from them — for product pages.",
    },
  },
  {
    name: "Artboard Studio",
    url: "https://artboard.studio",
    category: "mockups",
    price: "freemium",
    description: {
      uz: "Brauzerdagi sahna muharriri: mockup, yorug'lik va soyani o'zingiz yig'asiz.",
      ru: "Редактор сцены в браузере: мокап, свет и тени собираются вручную.",
      en: "A browser scene editor — compose the mock-up, light and shadow yourself.",
    },
  },
  {
    name: "Screely",
    url: "https://www.screely.com",
    category: "mockups",
    price: "free",
    description: {
      uz: "Skrinshotga brauzer oynasi va fon qo'shadi — eng tez variant.",
      ru: "Добавляет скриншоту окно браузера и фон — самый быстрый вариант.",
      en: "Wraps a screenshot in a browser window and background — the fastest option.",
    },
  },

  // ── Motion ──────────────────────────────────────────────────────────────
  {
    name: "LottieFiles",
    url: "https://lottiefiles.com",
    category: "motion",
    price: "freemium",
    featured: true,
    description: {
      uz: "Yengil JSON animatsiyalar — veb va mobil uchun, video o'rniga.",
      ru: "Лёгкие JSON-анимации для веба и мобильных — вместо видео.",
      en: "Lightweight JSON animations for web and mobile — instead of video.",
    },
  },
  {
    name: "Rive",
    url: "https://rive.app",
    category: "motion",
    price: "freemium",
    description: {
      uz: "Holatlari bor interaktiv animatsiya: bosilganda, hoverda o'zgaradi.",
      ru: "Интерактивная анимация с состояниями: меняется по клику и наведению.",
      en: "Interactive animation with states — it reacts to hover and clicks.",
    },
  },
  {
    name: "GSAP",
    url: "https://gsap.com",
    category: "motion",
    price: "free",
    description: {
      uz: "Murakkab vaqt chizig'i va skroll animatsiyalari uchun kutubxona.",
      ru: "Библиотека для сложных таймлайнов и скролл-анимаций.",
      en: "The library for complex timelines and scroll-driven animation.",
    },
  },
  {
    name: "Motion",
    url: "https://motion.dev",
    category: "motion",
    price: "free",
    featured: true,
    description: {
      uz: "React uchun animatsiya (avvalgi Framer Motion) — bu saytda ham shu.",
      ru: "Анимация для React (бывший Framer Motion) — используется и на этом сайте.",
      en: "Animation for React (formerly Framer Motion) — used on this site too.",
    },
  },
  {
    name: "Easings.net",
    url: "https://easings.net",
    category: "motion",
    price: "free",
    description: {
      uz: "Easing egri chiziqlari jonli ko'rinishda — kerakligini bosib ko'chirasiz.",
      ru: "Кривые easing в живом виде — нужную просто копируешь.",
      en: "Easing curves you can watch, then copy the one you want.",
    },
  },
  {
    name: "cubic-bezier.com",
    url: "https://cubic-bezier.com",
    category: "motion",
    price: "free",
    description: {
      uz: "O'z egri chizig'ingizni yasab, eskisi bilan yonma-yon solishtirasiz.",
      ru: "Своя кривая с возможностью сравнить её со старой рядом.",
      en: "Draw your own curve and compare it side by side with the old one.",
    },
  },

  // ── O'rganish ───────────────────────────────────────────────────────────
  {
    name: "Laws of UX",
    url: "https://lawsofux.com",
    category: "learning",
    price: "free",
    featured: true,
    description: {
      uz: "Dizayn qarorlari ortidagi psixologiya qonunlari — qisqa va misol bilan.",
      ru: "Психологические законы за дизайн-решениями — кратко и с примерами.",
      en: "The psychology behind design decisions — short, with examples.",
    },
  },
  {
    name: "Refactoring UI",
    url: "https://www.refactoringui.com",
    category: "learning",
    price: "paid",
    featured: true,
    description: {
      uz: "Dasturchi uchun amaliy dizayn kitobi — nazariya emas, aniq usullar.",
      ru: "Практичная книга по дизайну для разработчиков — приёмы, а не теория.",
      en: "A practical design book for developers — techniques, not theory.",
    },
  },
  {
    name: "Nielsen Norman Group",
    url: "https://www.nngroup.com",
    category: "learning",
    price: "free",
    description: {
      uz: "Foydalanuvchi tadqiqotlari va UX maqolalari — da'vo emas, o'lchov.",
      ru: "Исследования пользователей и статьи по UX — измерения, а не мнения.",
      en: "User research and UX articles — measurements, not opinions.",
    },
  },
  {
    name: "web.dev",
    url: "https://web.dev",
    category: "learning",
    price: "free",
    description: {
      uz: "Tezlik, Core Web Vitals va qulaylik bo'yicha Google qo'llanmalari.",
      ru: "Руководства Google по скорости, Core Web Vitals и доступности.",
      en: "Google's guidance on speed, Core Web Vitals and accessibility.",
    },
  },
  {
    name: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    category: "learning",
    price: "free",
    description: {
      uz: "CSS va HTML bo'yicha asosiy manba — xossa qanday ishlashini shu yerda tekshiraman.",
      ru: "Основной справочник по CSS и HTML — здесь проверяю, как работает свойство.",
      en: "The reference for CSS and HTML — where I check how a property actually behaves.",
    },
  },
  {
    name: "Growth.Design",
    url: "https://growth.design",
    category: "learning",
    price: "free",
    description: {
      uz: "Mashhur mahsulotlarning UX tahlili komiks ko'rinishida — o'qish oson.",
      ru: "UX-разборы известных продуктов в виде комиксов — читается легко.",
      en: "UX teardowns of well-known products, told as comics — easy to read.",
    },
  },

  // ── Figma plaginlar ─────────────────────────────────────────────────────
  {
    name: "Iconify",
    url: "https://www.figma.com/community/plugin/735098390272716381/iconify",
    category: "figmaPlugins",
    price: "free",
    featured: true,
    description: {
      uz: "Yuzlab ikonka to'plamini Figma ichiga olib kiradi — qidirib, joyiga qo'yasiz.",
      ru: "Приносит сотни наборов иконок прямо в Figma — искать и вставлять.",
      en: "Brings hundreds of icon sets into Figma — search and drop in.",
    },
  },
  {
    name: "Unsplash",
    url: "https://www.figma.com/community/plugin/738454987945972471/unsplash",
    category: "figmaPlugins",
    price: "free",
    description: {
      uz: "Maketga haqiqiy fotosuratni to'g'ridan-to'g'ri qo'yadi — kulrang kvadrat emas.",
      ru: "Вставляет в макет настоящее фото вместо серого прямоугольника.",
      en: "Drops real photography into the mock-up instead of a grey box.",
    },
  },
  {
    name: "Content Reel",
    url: "https://www.figma.com/community/plugin/731627216655469013/content-reel",
    category: "figmaPlugins",
    price: "free",
    featured: true,
    description: {
      uz: "Ism, manzil, avatar — maketni haqiqatga o'xshash ma'lumot bilan to'ldiradi.",
      ru: "Имена, адреса, аватары — заполняет макет правдоподобными данными.",
      en: "Names, addresses, avatars — fills the mock-up with believable data.",
    },
  },
  {
    name: "Autoflow",
    url: "https://www.figma.com/community/plugin/733902567457592893/autoflow",
    category: "figmaPlugins",
    price: "freemium",
    description: {
      uz: "Ekranlar orasiga oqim strelkalarini chizadi — user flow uchun.",
      ru: "Рисует стрелки между экранами — для user flow.",
      en: "Draws flow arrows between screens — for user flows.",
    },
  },
  {
    name: "Remove BG",
    url: "https://www.figma.com/community/plugin/738992712906748191/remove-bg",
    category: "figmaPlugins",
    price: "paid",
    description: {
      uz: "Rasm fonini Figma'dan chiqmasdan olib tashlaydi.",
      ru: "Убирает фон изображения, не выходя из Figma.",
      en: "Removes an image background without leaving Figma.",
    },
  },
  {
    name: "html.to.design",
    url: "https://www.figma.com/community/plugin/1159123024924461424/html-to-design-by-divriots-import-websites-to-figma-designs-web-html-css",
    category: "figmaPlugins",
    price: "freemium",
    description: {
      uz: "Mavjud saytni Figma qatlamlariga aylantiradi — redizayn uchun boshlanish nuqtasi.",
      ru: "Превращает существующий сайт в слои Figma — старт для редизайна.",
      en: "Turns a live site into Figma layers — a starting point for a redesign.",
    },
  },
  {
    name: "Figma to Code",
    url: "https://www.figma.com/community/plugin/842128343887142055/figma-to-code-html-tailwind-flutter-swiftui",
    category: "figmaPlugins",
    price: "free",
    description: {
      uz: "Qatlamdan Tailwind yoki HTML kodini beradi — tayyor kod emas, qoralama.",
      ru: "Отдаёт Tailwind или HTML из слоя — не готовый код, а черновик.",
      en: "Gives Tailwind or HTML from a layer — a draft, not finished code.",
    },
  },

  // ── Vositalar ───────────────────────────────────────────────────────────
  {
    name: "Eagle",
    url: "https://eagle.cool",
    category: "tools",
    price: "paid",
    featured: true,
    description: {
      uz: "Referens va rasmlar kutubxonasi — teg bo'yicha va rang bo'yicha qidiriladi.",
      ru: "Библиотека референсов и картинок — поиск по тегам и по цвету.",
      en: "A reference and image library — searchable by tag and by colour.",
    },
  },
  {
    name: "Squoosh",
    url: "https://squoosh.app",
    category: "tools",
    price: "free",
    featured: true,
    description: {
      uz: "Rasmni brauzerda siqadi va sifatini yonma-yon solishtiradi — fayl yuklanmaydi.",
      ru: "Сжимает картинку в браузере и показывает разницу рядом — без загрузки файла.",
      en: "Compresses images in the browser with a side-by-side diff — nothing is uploaded.",
    },
  },
  {
    name: "TinyPNG",
    url: "https://tinypng.com",
    category: "tools",
    price: "free",
    description: {
      uz: "PNG va JPG'ni tez siqish — bir vaqtda bir nechta fayl.",
      ru: "Быстрое сжатие PNG и JPG — сразу несколько файлов.",
      en: "Quick PNG and JPG compression, several files at a time.",
    },
  },
  {
    name: "Excalidraw",
    url: "https://excalidraw.com",
    category: "tools",
    price: "free",
    description: {
      uz: "Qo'lda chizilgandek sxemalar — tuzilishni tez tushuntirish uchun.",
      ru: "Схемы «от руки» — чтобы быстро объяснить структуру.",
      en: "Hand-drawn-looking diagrams — for explaining structure fast.",
    },
  },
  {
    name: "remove.bg",
    url: "https://www.remove.bg",
    category: "tools",
    price: "freemium",
    description: {
      uz: "Fonni bir bosishda olib tashlaydi — sochi bor portretda ham yaxshi ishlaydi.",
      ru: "Убирает фон в один клик — хорошо справляется даже с волосами.",
      en: "One-click background removal that even handles hair well.",
    },
  },
  {
    name: "Cleanup.pictures",
    url: "https://cleanup.pictures",
    category: "tools",
    price: "freemium",
    description: {
      uz: "Rasmdan ortiqcha narsani o'chiradi — chiziq tortasiz, o'sha joy to'ldiriladi.",
      ru: "Удаляет лишнее с фото — закрашиваешь, и место достраивается.",
      en: "Erases unwanted objects — brush over them and the gap is filled in.",
    },
  },
];
