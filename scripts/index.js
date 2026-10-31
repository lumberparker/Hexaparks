// index.js — acordeón de "Características importantes"

document.addEventListener("DOMContentLoaded", () => {
  // video de portada: respeta "reducir movimiento" (se queda en el póster)
  const heroVideo = document.querySelector("video.hero__image");
  if (heroVideo && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroVideo.removeAttribute("autoplay");
    heroVideo.pause();
  }

  // botón de sonido: aparece solo cuando el video carga y tiene audio
  const soundBtn = document.querySelector(".sound-toggle");
  if (heroVideo && soundBtn) {
    const state = soundBtn.querySelector(".sound-toggle__state");

    const hasAudio = () =>
      heroVideo.mozHasAudio ||
      Boolean(heroVideo.webkitAudioDecodedByteCount) ||
      Boolean(heroVideo.audioTracks && heroVideo.audioTracks.length);

    const render = () => {
      const on = !heroVideo.muted;
      soundBtn.setAttribute("aria-pressed", String(on));
      const t = (k, es) => (window.HexaI18n ? window.HexaI18n.t(k) : es);
      soundBtn.setAttribute("aria-label", on ? t("sound.on", "Silenciar video") : t("sound.off", "Activar sonido del video"));
      state.textContent = on ? "On" : "Off";
    };

    const reveal = () => {
      // algunos navegadores no informan si hay audio: en ese caso se muestra igual
      const unknown =
        heroVideo.mozHasAudio === undefined &&
        heroVideo.webkitAudioDecodedByteCount === undefined &&
        !heroVideo.audioTracks;
      if (unknown || hasAudio()) soundBtn.hidden = false;
    };

    heroVideo.addEventListener("loadeddata", reveal);
    heroVideo.addEventListener("playing", () => setTimeout(reveal, 400));
    if (heroVideo.readyState >= 2) reveal();

    soundBtn.addEventListener("click", () => {
      heroVideo.muted = !heroVideo.muted;
      if (!heroVideo.muted && heroVideo.paused) heroVideo.play().catch(() => {});
      render();
    });

    heroVideo.addEventListener("volumechange", render);
    document.addEventListener("hexa:lang", render);
    render();
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
