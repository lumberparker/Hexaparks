// amenidades.js — ventanas de detalle de cada amenidad

document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll("[data-popup]");
  const popups = document.querySelectorAll(".popup");
  let lastTrigger = null;

  const hideAll = () => {
    popups.forEach((p) => {
      p.style.display = "none";
    });
    document.body.style.overflow = "";
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  };

  // abrir la ventana correspondiente
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const popup = document.querySelector(`.popup.${trigger.dataset.popup}`);
      if (!popup) return;
      hideAll();
      lastTrigger = trigger;
      popup.style.display = "flex";
      document.body.style.overflow = "hidden";
      popup.querySelector(".popup__close")?.focus();
    });
  });

  // cerrar con el botón, al hacer clic fuera o con Escape
  document.querySelectorAll(".popup__close").forEach((btn) => {
    btn.addEventListener("click", hideAll);
  });

  popups.forEach((popup) => {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) hideAll();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideAll();
  });
});
