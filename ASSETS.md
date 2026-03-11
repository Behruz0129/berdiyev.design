# Loyiha rasmlari va matnlarini joylashish

## Rasmlar (images)

Barcha loyiha rasmlari **`public/projects/`** papkasiga qo‘yiladi.

---

### Loyiha thumbnail (karta rasmi) — qayerga qo‘yish?

**Thumbnail** — loyihalar ro‘yxatida (/projects) va bosh sahifadagi “Projects” bo‘limida ko‘rinadigan **karta rasmi**, shuningdek loyiha sahifasining **yuqoridagi katta banner** rasmida ham shu fayl ishlatiladi.

| Qaysi loyiha | Fayl nomi (siz qo‘yasiz) | To‘liq joylashuv |
|--------------|--------------------------|-------------------|
| Modme Landing | `modme.png` yoki `modme.jpg` | **`public/projects/modme.png`** |
| Islamic Civilization Center | `icc.png` yoki `icc.jpg` | **`public/projects/icc.png`** |

**Qadamlar:**
1. Rasmni **`public/projects/`** papkasiga qo‘ying (masalan: `modme.png`).
2. **`src/data/projects.ts`** faylida shu loyiha uchun `heroImage` ni shu faylga moslashtiring, masalan:  
   `heroImage: "/projects/modme.png"`  
   (path har doim `/projects/` + fayl nomi, chunki papka nomi `public/projects`.)

Hozir Modme uchun placeholder `modme.svg` ishlatilgan. O‘z rasmingizni `public/projects/modme.png` qilib qo‘ysangiz, `projects.ts` da `heroImage: "/projects/modme.png"` qiling.

**O‘lcham (tavsiya):** **1920 × 823** px (21:9) yoki kamida **1200 × 514** px.

---

| Nima qo‘yasiz      | Papka / fayl              | Misol                          |
|-------------------|---------------------------|--------------------------------|
| **Profil rasmi (Men haqimda)** | `public/` | `public/profile.jpg` |
| **Loyiha thumbnail** (karta + banner) | `public/projects/` | `public/projects/modme.png` |
| Loyiha skrinshotlari | `public/projects/` | `public/projects/modme-landing-home.png` va hokazo |

- **Profil rasmi (Men haqimda):** `public/profile.jpg` qo‘ying (yoki `public/profile.png` — bo‘lsa `src/app/about/page.tsx` da `PROFILE_IMAGE` ni `/profile.png` qilib o‘zgartiring). Tavsiya o‘lcham: **400×400** yoki **512×512** px (kvadrat).
- **Loyiha rasmlari** nomi ixtiyoriy (masalan: `modme.png`, `modme-hero.jpg`, `islamic-center.webp`).
- Saytda ishlatish: path **`/projects/fayl-nomi.kengaytma`** (masalan: `/projects/modme.png`).
- `src/data/projects.ts` ichida har bir loyiha uchun `heroImage` shu path bilan beriladi:

```ts
{
  slug: "modme-landing",
  heroImage: "/projects/modme.png",  // public/projects/modme.png fayliga mos
  // ...
}
```

Hozir placeholder sifatida `modme.svg` va `icc.svg` ishlatilgan. O‘z rasmlaringizni (PNG, JPG, WebP) `public/projects/` ga qo‘yib, `projects.ts` dagi `heroImage` ni yangilang.

### Modme Landing — skrinshotlar (Screenshots)

`/projects/modme-landing` sahifasidagi galereya quyidagi fayllarni ko‘rsatadi. Har bir rasmni **aniq shu nom** bilan **`public/projects/`** papkasiga qo‘ying:

| Qaysi skrinshot       | Fayl nomi (aniq)                 | Joylashuv (to‘liq)                    |
|-----------------------|----------------------------------|----------------------------------------|
| Bosh sahifa (Home)    | `modme-landing-home.png`        | `public/projects/modme-landing-home.png` |
| Narxlar (Pricing)     | `modme-landing-pricing.png`     | `public/projects/modme-landing-pricing.png` |
| Gamification sahifa  | `modme-landing-gamification.png`| `public/projects/modme-landing-gamification.png` |
| Demo so‘rash formasi  | `modme-landing-demo.png`        | `public/projects/modme-landing-demo.png` |

- **Format:** PNG (loyihada hammasi `.png` deb sozlangan).
- **O‘lcham (tavsiya):** **1600 × 900** px yoki **1920 × 1080** px (16:9).
- Boshqa nom qo‘llasangiz, `src/data/projects.ts` da `screenshots[].image` path ni shu nomga moslashtiring.

### ICC (Islamic Civilization Center) — rasmlar

**Thumbnail (karta + loyiha sahifasi banner):**

| Nima        | Fayl nomi   | Joylashuv                   |
|-------------|-------------|-----------------------------|
| ICC thumbnail | `icc.png` | **`public/projects/icc.png`** |

Rasm qo‘ygach, `src/data/projects.ts` da ICC uchun `heroImage: "/projects/icc.png"` qiling (hozir placeholder `icc.svg`).

**Skrinshotlar (loyiha sahifasidagi galereya):**

| Qaysi skrinshot      | Fayl nomi (aniq)           | Joylashuv (to‘liq)                    |
|----------------------|----------------------------|----------------------------------------|
| Pre-Islamic period   | `icc-pre-islamic.png`      | `public/projects/icc-pre-islamic.png`  |
| First Renaissance    | `icc-first-renaissance.png` | `public/projects/icc-first-renaissance.png` |
| First Renaissance (2)| `icc-first-renaissance-2.png` | `public/projects/icc-first-renaissance-2.png` |
| Second Renaissance   | `icc-second-renaissance.png` | `public/projects/icc-second-renaissance.png` |

Format: PNG. O‘lcham tavsiyasi: 1600×900 yoki 1920×1080 (16:9).

---

## Rasm o‘lchamlari (qisqacha)

| Rasm turi | Tavsiya o‘lcham (px) | Nisbat |
|-----------|----------------------|--------|
| **Profil rasmi** (Men haqimda) | **400×400** yoki **512×512** | 1:1 (kvadrat) |
| **Loyiha thumbnail** (karta + banner) | **1920×823** yoki **1200×514** | 21:9 |
| **Skrinshotlar** (galereya) | **1600×900** yoki **1920×1080** | 16:9 |

---

## Matnlar (content)

### 1. Loyiha ma’lumotlari (sarlavha, tavsif, overview, problem/solution/results)

**Fayl:** `src/data/projects.ts`

Bu yerda:
- `slug`, `title`, `year`, `role`, `shortDescription`
- `heroImage` (yuqoridagi path)
- `overview`: `role`, `duration`, `tools[]`
- `problem[]`, `solution[]`, `results[]`

Yangi loyiha qo‘shish: massivga yangi obyekt qo‘shing va kerak bo‘lsa `public/projects/` ga rasm qo‘ying.

### 2. Ko‘p tilli matnlar (O‘ZB / РУС / ENG)

**Fayllar:**
- `src/messages/en.ts` — inglizcha
- `src/messages/uz.ts` — o‘zbekcha
- `src/messages/ru.ts` — ruscha

Bu fayllarda:
- **Bosh sahifa, nav, footer:** `nav`, `home`, `footer`
- **Men haqimda:** `about.*`
- **Loyihalar (karta va sahifa):** `projects.pageTitle`, `projects.pageSubtitle`, `projects.viewDetails`, `projects["modme-landing"]`, `projects["islamic-civilization-center-interactives"]`
- **Aloqa:** `contact.*`
- **404:** `notFound.*`
- **Hero vizual:** `heroVisual.*`

Loyiha sarlavha/tavsifini tilga qarab o‘zgartirish: har bir til faylida `projects["loyiha-slug"]` ichidagi `title`, `role`, `shortDescription` ni tahrirlang.

---

## Qisqacha

| Nima              | Qayerga                         |
|-------------------|----------------------------------|
| Loyiha rasmlari   | `public/projects/`              |
| Loyiha struktura va ma’lumotlar | `src/data/projects.ts`  |
| Sayt matnlari (3 til) | `src/messages/en.ts`, `uz.ts`, `ru.ts` |
