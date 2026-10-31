// i18n.js — español / English.
// El español vive en el HTML; aquí está la traducción al inglés.
// Cada elemento traducible lleva data-i18n="clave" (contenido) o data-i18n-alt / data-i18n-aria-label (atributos).
// Para editar un texto en inglés, cambia su valor en EN. Para un texto nuevo: añade data-i18n="clave" en el HTML y la clave aquí.

(function () {
  const EN = {
    "nav.amenities": "Amenities",
    "nav.location": "Location",
    "nav.masterplan": "Site plan",
    "nav.contact": "Contact",
    "hero.note": "Where everything<br />is designed<br />to work.",
    "place": "Guadalajara<br />Mexico",
    "sound.label": "Sound",
    "intro.label": "Decisions<br />well<br />built.",
    "intro.title": "An industrial environment ready to operate, designed for the efficiency, security and comfort of companies and their people.",
    "stats.area": "Area",
    "stats.hectares": "Hectares.",
    "stats.naves": "Warehouses",
    "stats.naves_text": "Industrial<br />warehouses.",
    "stats.from": "From",
    "stats.upto": "Up to <strong>3,000 m²</strong>.",
    "stats.claim": "Strategic connectivity<br />to move your operation<br />without limits.",
    "am.title": "Amenities.<br />An operation<br />that works.",
    "am.note": "Eight reasons working together.<br />A space that responds every day.",
    "am.1.title": "Functional industrial warehouses",
    "am.1.text": "Fully built, modular and flexible warehouses, from 900 m² to 3,000 m².",
    "am.more": "View details",
    "am.2.title": "Comprehensive security",
    "am.2.text": "24/7 controlled access, CCTV at strategic points and perimeter lighting.",
    "am.3.title": "Robust infrastructure",
    "am.3.text": "Hydraulic concrete roads for heavy traffic, a storm channel and a private water well.",
    "am.4.title": "Logistics operation",
    "am.4.text": "Driver rest area, container storage and 16.9 m internal roads.",
    "am.5.title": "Services &amp; technology",
    "am.5.text": "Medium and high voltage power, drinking water, drainage and fiber-optic connectivity.",
    "am.6.title": "Business center",
    "am.6.text": "Reception, coworking, meeting rooms and an industrial dining hall with terrace.",
    "am.7.title": "Sustainability &amp; well-being",
    "am.7.text": "Green buffer zones, responsible waste management and clean energy.",
    "am.8.title": "Strategic location",
    "am.8.text": "On a key industrial and logistics corridor, less than 1 km from the Macrolibramiento.",
    "pop.1.title": "Functional industrial warehouses.",
    "pop.1.a": "Fully built warehouses.",
    "pop.1.b": "Modular, flexible design.",
    "pop.1.c": "Large areas for storage, manufacturing or production floor.",
    "pop.1.d": "Integrated administrative offices.",
    "pop.1.e": "Equipped restrooms.",
    "pop.1.f": "Loading docks for 53-foot trailers.",
    "pop.1.g": "Semi-covered parking.",
    "pop.1.h": "Exclusive and visitor parking spaces.",
    "pop.1.i": "Central fire protection network.",
    "pop.1.j": "Warehouses available in 900 m², 1,200 m², 1,300 m², 2,000 m² and 3,000 m².",
    "pop.2.title": "Comprehensive security.",
    "pop.2.a": "24/7 controlled access.",
    "pop.2.b": "CCTV surveillance at strategic points.",
    "pop.2.c": "Lighting on roads and perimeter.",
    "pop.3.title": "Robust infrastructure.",
    "pop.3.a": "Roads and walkways in 20 cm reinforced HOLCIM MR 45 hydraulic concrete, built for heavy traffic.",
    "pop.3.b": "A dedicated reinforced-concrete channel carries storm runoff from the surrounding hills.",
    "pop.3.c": "Steel structure ready to carry rooftop solar panels.",
    "pop.3.d": "Campus-level machine and electrical rooms.",
    "pop.3.e": "Private water well.",
    "pop.4.title": "Logistics operation and transport services.",
    "pop.4.a": "Driver rest area with showers and kitchenette.",
    "pop.4.b": "Dedicated container storage, with reservations available.",
    "pop.4.c": "Wide internal roads with 16.9 m clearance.",
    "pop.5.title": "Services &amp; technology.",
    "pop.5.a": "Medium and high voltage power grid.",
    "pop.5.b": "Drinking water and sanitary drainage.",
    "pop.5.c": "Fiber-optic connectivity.",
    "pop.5.d": "Prepared for video surveillance and access control systems.",
    "pop.6.title": "Business center.",
    "pop.6.a": "Main reception and visitor service.",
    "pop.6.b": "Coworking area for tenants and administrative staff.",
    "pop.6.c": "Equipped meeting rooms.",
    "pop.6.d": "Industrial dining hall.",
    "pop.6.e": "Dining area with microwaves, refrigerator and a terrace with green areas, open to all park tenants.",
    "pop.6.f": "Parking spaces for tenants and visitors.",
    "pop.6.g": "Bike racks.",
    "pop.7.title": "Sustainability &amp; well-being.",
    "pop.7.a": "Green buffer zones.",
    "pop.7.b": "Responsible waste management.",
    "pop.7.c": "Prepared for clean energy.",
    "pop.8.title": "Strategic location.",
    "pop.8.a": "On a key industrial and logistics corridor, less than 1 km from the Macrolibramiento.",
    "pop.8.b": "Connected to industry in the area; our neighbors include PISA FARMACÉUTICA, MUEBLES DICO, TAJÍN, ESTRUBLOCK, DUCOR, ACESTA, SIMSA, CERCASEL, HEAVYBOX, ECONS, CEDIS INLAB MUEBLES, TRACSA, DIMESA, AISLANTES Y EMPAQUES and more.",
    "roads": "Quick access to primary roads.",
    "split.note": "Where everything<br />is designed<br />to work.",
    "deeds.sub": "Financing<br />available.",
    "deeds.title": "Immediate<br />deeds.",
    "gallery": "Gallery",
    "gallery.lead": "Clean design with smart infrastructure.",
    "loc.p1": "Hexaparks stands for a structured, efficient and modern approach to industrial development, combining innovation with functionality.",
    "loc.p2": "We firmly believe we are paving the way for industrial progress.",
    "loc.title": "Location",
    "loc.address": "Circuito Metropolitano Sur km 21<br />Tala, Jalisco, Mexico",
    "loc.corridors": "Connected to key industrial and logistics corridors.",
    "mp.note": "Infrastructure<br />to spare for high-performance<br />operations.",
    "mp.title": "Site<br />plan",
    "sp.eyebrow": "Warehouse availability",
    "sp.total": "95,000.53 m² total area",
    "sp.hint": "Swipe to see the full plan · tap a warehouse for details",
    "sp.list": "View warehouse list",
    "sp.th.nave": "Warehouse",
    "sp.th.area": "Area",
    "sp.th.status": "Status",
    "contact.cta": "Contact us",
    "cam.sub": "Ask your sales advisor<br />for the access code.",
    "cam.title": "Live cameras<br />24/7.",
    "cam.button": "View construction progress",
    "feat.eyebrow": "Nine key points",
    "feat.title": "Key<br />features.",
    "feat.1.t": "Modular, flexible design",
    "feat.1.d": "Spaces that adapt to different types of industrial operations (storage, production, manufacturing).",
    "feat.2.t": "11-meter interior clear height",
    "feat.2.d": "Allows high racking, machinery and unobstructed movement of heavy equipment.",
    "feat.3.t": "Accessibility &amp; connectivity",
    "feat.3.d": "Strategic location near major roads and transport routes (highways, ports, etc.).",
    "feat.4.t": "Security",
    "feat.4.d": "24/7 surveillance, access control, fire alarm and protection zones.",
    "feat.5.t": "Efficient use of space",
    "feat.5.d": "Maximized use of the site, laid out with production areas, offices, rest areas and restrooms.",
    "feat.6.t": "Environmental conditions",
    "feat.6.d": "Gravity extractor ventilation.",
    "feat.7.t": "Sustainability",
    "feat.7.d": "Eco-friendly materials, rainwater recycling, carbon-footprint reduction and energy efficiency (solar panels, etc.).",
    "feat.8.t": "Architectural style",
    "feat.8.d": "Modern, functional aesthetics that give your company a professional, solid image.",
    "feat.9.t": "Access to shared services",
    "feat.9.d": "Shared areas such as the industrial dining hall, parking and driver rest area.",
    "contact.title": "Contact us.",
    "contact.agenda": "Schedule a visit to tour the facilities.",
    "contact.address": "Circuito Metropolitano Sur km&nbsp;21,<br />45333 Tala, Jal., Mexico",
    "contact.send": "Send email",
    "footer.by": "A development by",
    "a.home": "Hexaparks, home",
    "a.nav": "Main",
    "a.tagline": "Industry in motion",
    "a.stats": "Hexaparks in figures",
    "a.close": "Close",
    "a.tower": "Hexaparks entrance tower",
    "a.gallery": "Gallery",
    "a.render": "Hexaparks rendering",
    "a.map": "Map showing Hexaparks on Circuito Metropolitano Sur, Tala, Jalisco",
    "a.filter": "Filter by status",
    "a.plan": "Hexaparks site plan showing every warehouse",
    "a.lots": "Park warehouses",
    "a.bc": "Hexaparks business center",
    "a.haarq": "HAARQ logo"
  };

  // textos que genera JavaScript (plano, botón de sonido, etc.)
  const UI = {
    es: {
      "meta.description": "Un entorno industrial listo para operar, pensado para la eficiencia, seguridad y comodidad de las empresas y su personal.",
      "badge": "HEXAPARKS® · INDUSTRIA EN MOVIMIENTO ·",
      "sound.on": "Silenciar video",
      "sound.off": "Activar sonido del video",
      "st.disponible": "Disponible",
      "st.apartada": "Apartada",
      "st.vendida": "Vendida",
      "lot": "Nave",
      "area.tbd": "Superficie por confirmar",
      "lot.cta": "Solicitar información",
      "lot.mail": "Información nave",
      "updated": "Actualizado",
      "date.locale": "es-MX",
      "plan.error": "No se pudo cargar la disponibilidad de naves. Abre el sitio desde un servidor (no con doble clic)."
    },
    en: {
      "meta.description": "An industrial environment ready to operate, designed for the efficiency, security and comfort of companies and their people.",
      "badge": "HEXAPARKS® · INDUSTRY IN MOTION ·",
      "sound.on": "Mute video",
      "sound.off": "Turn on video sound",
      "st.disponible": "Available",
      "st.apartada": "Reserved",
      "st.vendida": "Sold",
      "lot": "Warehouse",
      "area.tbd": "Area to be confirmed",
      "lot.cta": "Request information",
      "lot.mail": "Information about warehouse",
      "updated": "Updated",
      "date.locale": "en-US",
      "plan.error": "Warehouse availability could not be loaded. Open the site from a server (not by double-clicking the file)."
    },
  };

  const STORAGE_KEY = "hexaparks-lang";
  const ATTRS = ["alt", "aria-label"];
  const original = new Map(); // guarda el español para poder volver

  const getLang = () => {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (fromUrl === "en" || fromUrl === "es") return fromUrl;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "es") return saved;
    } catch (e) {}
    return "es";
  };

  let current = getLang();

  const t = (key) => (UI[current] && UI[current][key]) || UI.es[key] || key;

  const apply = (lang) => {
    current = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      if (!original.has(el)) original.set(el, el.innerHTML);
      const en = EN[el.dataset.i18n];
      el.innerHTML = lang === "en" && en ? en : original.get(el);
    });

    ATTRS.forEach((attr) => {
      document.querySelectorAll(`[data-i18n-${attr}]`).forEach((el) => {
        const store = `__i18n_${attr}`;
        if (el[store] === undefined) el[store] = el.getAttribute(attr);
        const en = EN[el.getAttribute(`data-i18n-${attr}`)];
        el.setAttribute(attr, lang === "en" && en ? en : el[store]);
      });
    });

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("meta.description"));
    const badge = document.getElementById("badge-text");
    if (badge) badge.textContent = t("badge");

    document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });

    document.dispatchEvent(new CustomEvent("hexa:lang", { detail: { lang } }));
  };

  window.HexaI18n = {
    t,
    get lang() {
      return current;
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        try {
          localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {}
        // mantiene ?lang=en en la URL para poder compartir el enlace en inglés
        const url = new URL(location.href);
        if (lang === "en") url.searchParams.set("lang", "en");
        else url.searchParams.delete("lang");
        history.replaceState(null, "", url);
        apply(lang);
      });
    });
    apply(current);
  });
})();
