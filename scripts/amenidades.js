// amenidades.js

document.addEventListener('DOMContentLoaded', () => {
    // 1) Todos los items que abren popup
    const items = document.querySelectorAll('[data-popup]');
    // 2) Todos los botones de cerrar (dentro de los popups)
    const closeBtns = document.querySelectorAll('.popup__close');
  
    // Función para ocultar TODOS los popups
    const hideAll = () => {
      document.querySelectorAll('.popup').forEach(p => {
        p.style.display = 'none';
      });
    };
  
    // 3) Mostrar el popup correspondiente al hacer click en el grid
    items.forEach(item => {
      item.addEventListener('click', () => {
        const popupClass = item.getAttribute('data-popup');
        const popup = document.querySelector(`.popup.${popupClass}`);
        if (!popup) return;
        hideAll();
        popup.style.display = 'flex';  // Usamos flex para centrar en CSS
      });
    });
  
    // 4) Cerrar popup al hacer click en su botón de close
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const popup = btn.closest('.popup');
        if (popup) popup.style.display = 'none';
      });
    });
  
    // 5) (Opcional) Cerrar popup si el usuario hace click fuera del contenedor
    document.querySelectorAll('.popup').forEach(popup => {
      popup.addEventListener('click', e => {
        if (e.target === popup) popup.style.display = 'none';
      });
    });
  });
  