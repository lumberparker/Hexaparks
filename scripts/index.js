document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".features__toggle .toggle-item");
  
    items.forEach(item => {
      const btn     = item.querySelector(".toggle-btn");
      const icon    = btn.querySelector(".toggle-icon");
      const content = item.querySelector(".toggle-content");
  
      // ensure content is hidden initially (also hide via CSS)
      content.style.display = "none";
  
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") === "true";
  
        // close all items
        items.forEach(i => {
          const b    = i.querySelector(".toggle-btn");
          const img  = b.querySelector(".toggle-icon");
          const cont = i.querySelector(".toggle-content");
  
          b.setAttribute("aria-expanded", "false");
          img.src = "../images/plus.png";
          img.alt = "Expand section";
          cont.style.display = "none";
        });
  
        // now if *this* one was closed, open it
        if (!open) {
          btn.setAttribute("aria-expanded", "true");
          icon.src = "../images/close.png";
          icon.alt = "Close section";
          content.style.display = "block";
        }
      });
    });
  });
  