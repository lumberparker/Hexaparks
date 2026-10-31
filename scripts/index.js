// index.js — acordeón de "Características importantes"

document.addEventListener("DOMContentLoaded", () => {
  // video de portada: respeta "reducir movimiento" (se queda en el póster)
  const heroVideo = document.querySelector("video.hero__image");
  if (heroVideo && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroVideo.removeAttribute("autoplay");
    heroVideo.pause();
  }

  const items = document.querySelectorAll(".features__toggle .toggle-item");

  const setOpen = (item, open) => {
    const btn = item.querySelector(".toggle-btn");
    const content = item.querySelector(".toggle-content");
    btn.setAttribute("aria-expanded", String(open));
    content.hidden = !open;
  };

  items.forEach((item, i) => {
    const btn = item.querySelector(".toggle-btn");
    const content = item.querySelector(".toggle-content");

    // enlaza botón y contenido para lectores de pantalla
    content.id = content.id || `feature-${i + 1}`;
    btn.setAttribute("aria-controls", content.id);
    setOpen(item, false);

    btn.addEventListener("click", () => {
      const wasOpen = btn.getAttribute("aria-expanded") === "true";
      // solo un elemento abierto a la vez
      items.forEach((other) => setOpen(other, false));
      if (!wasOpen) setOpen(item, true);
    });
  });
});
