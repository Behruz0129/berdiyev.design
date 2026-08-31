/**
 * Fondagi ikkita ulkan, kuchli xiralashtirilgan dog'. Devorga tushgan
 * chiroq nuri kabi — bor-yo'qligi bilinmaydi, lekin fon endi tekis oq
 * emas.
 *
 * Uchta narsa ataylab:
 *
 * 1. `fixed` — dog'lar scroll bilan siljimaydi, shuning uchun uzun
 *    sahifada ham bir tekis yorug'lik bo'lib qoladi va har bo'limda
 *    qaytadan paydo bo'lmaydi.
 *
 * 2. Ikki xil rang: iliq apelsin va sovuq siyohrang. Bitta rang bo'lsa
 *    bu shunchaki soya bo'lardi; ikkitasi orasidagi o'tish esa "mesh"
 *    tuyg'usini beradi.
 *
 * 3. `pointer-events-none` va `aria-hidden` — bu qatlam bezak, u bosishga
 *    ham, o'qishga ham aralashmasligi kerak.
 *
 * Ranglar va shaffoflik `globals.css` dagi `.bg-glow` da: qorong'i temada
 * dog'lar kuchliroq bo'lishi kerak, aks holda qora fonda umuman
 * ko'rinmaydi.
 */
export function BackgroundGlow() {
  return (
    <div className="bg-glow pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <span className="bg-glow-a" />
      <span className="bg-glow-b" />
    </div>
  );
}
