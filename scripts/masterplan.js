// masterplan.js — plano interactivo de naves.
// El estado de cada nave se lee de assets/data/lotes.json (disponible, apartada, vendida).
// Aquí solo vive la geometría: el centro de cada marcador sobre plano-base.jpg (2731 × 1380 px).

const LOT_POSITIONS = {
  A08: [2011, 725],
  A18: [2012, 818],
  A28: [2012, 916],
  A38: [2014, 1016],
  A48: [2014, 1116],
  B08: [1726, 681],
  B18: [1724, 781],
  B28: [1726, 875],
  B38: [1723, 968],
  B48: [1725, 1063],
  B58: [1725, 1157],
  C08: [1568, 646],
  C18: [1571, 742],
  C28: [1571, 839],
  C38: [1566, 934],
  C48: [1568, 1032],
  C58: [1568, 1130],
  D08: [1301, 623],
  D18: [1304, 723],
  D28: [1299, 812],
  D38: [1299, 902],
  D48: [1297, 993],
  D58: [1300, 1080],
  E08: [1152, 319],
  E18: [1152, 408],
  E28: [1151, 499],
  E38: [1150, 620],
  E48: [1151, 721],
  E58: [1154, 810],
  E68: [1154, 900],
  E78: [1156, 990],
  E88: [1156, 1080],
  F08: [896, 498],
  F18: [896, 607],
  F28: [896, 700],
  F38: [894, 795],
  F48: [895, 884],
  F58: [896, 979],
  F68: [895, 1069],
  F78: [896, 1159],
  G08: [782, 473],
  G18: [781, 610],
  G28: [781, 703],
  G38: [779, 798],
  G48: [780, 888],
  G58: [781, 983],
  G68: [781, 1073],
  G78: [781, 1163],
  H08: [536, 632],
  H18: [541, 736],
  H28: [542, 832],
  H38: [542, 927],
  H48: [541, 1026],
};

const PLAN_W = 2731;
const PLAN_H = 1380;
const STATUSES = ["disponible", "apartada", "vendida"];
const T = (key, es) => (window.HexaI18n ? window.HexaI18n.t(key) : es);
const statusLabel = (estado) => T(`st.${estado}`, estado);
const SVG_NS = "http://www.w3.org/2000/svg";

const fmtArea = (n) =>
  n == null ? null : `${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m²`;

const svgEl = (tag, attrs = {}) => {
  const el = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
};

document.addEventListener("DOMContentLoaded", async () => {
  const root = document.querySelector("[data-siteplan]");
  if (!root) return;

  const svg = root.querySelector(".siteplan__overlay");
  const tip = root.querySelector(".siteplan__tip");
  const legend = root.querySelector(".siteplan__legend");
  const table = root.querySelector(".siteplan__table tbody");
  const updated = root.querySelector(".siteplan__updated");
  const status = root.querySelector(".siteplan__status");

  let data;
  try {
    const res = await fetch(root.dataset.source, { cache: "no-cache" });
    if (!res.ok) throw new Error(res.status);
    data = await res.json();
  } catch (err) {
    const showError = () => {
      status.hidden = false;
      status.textContent = T(
        "plan.error",
        "No se pudo cargar la disponibilidad de naves. Abre el sitio desde un servidor (no con doble clic)."
      );
    };
    showError();
    document.addEventListener("hexa:lang", showError);
    return;
  }

  const lots = data.lotes.filter((l) => LOT_POSITIONS[l.id]);
  const stateOf = (lot) => (STATUSES.includes(lot.estado) ? lot.estado : "disponible");
  svg.setAttribute("viewBox", `0 0 ${PLAN_W} ${PLAN_H}`);

  // ----- tooltip -----
  const hideTip = () => {
    tip.hidden = true;
    svg.querySelectorAll(".lot_active").forEach((el) => el.classList.remove("lot_active"));
  };

  const showTip = (g) => {
    const lot = lots.find((l) => l.id === g.dataset.id);
    const estado = g.dataset.estado;
    const [x, y] = LOT_POSITIONS[lot.id];
    tip.innerHTML = "";
    const title = document.createElement("p");
    title.className = "siteplan__tip-title";
    title.textContent = `${T("lot", "Nave")} ${lot.id}`;
    const meta = document.createElement("p");
    meta.className = "siteplan__tip-meta";
    meta.textContent = fmtArea(lot.superficie) || T("area.tbd", "Superficie por confirmar");
    const st = document.createElement("p");
    st.className = `siteplan__tip-status siteplan__tip-status_${estado}`;
    st.textContent = statusLabel(estado);
    tip.append(title, meta, st);
    if (estado === "disponible") {
      const a = document.createElement("a");
      a.className = "siteplan__tip-cta";
      const subject = `${T("lot.mail", "Información nave")} ${lot.id}`;
      a.href = `mailto:sales@hexaparks.com?subject=${encodeURIComponent(subject)}`;
      a.textContent = T("lot.cta", "Solicitar información");
      tip.append(a);
    }
    tip.style.left = `${(x / PLAN_W) * 100}%`;
    tip.style.top = `${(y / PLAN_H) * 100}%`;
    // en la parte alta del plano el globo se abre hacia abajo para no recortarse
    tip.classList.toggle("siteplan__tip_below", y / PLAN_H < 0.4);
    tip.hidden = false;
    svg.querySelectorAll(".lot_active").forEach((el) => el.classList.remove("lot_active"));
    g.classList.add("lot_active");
  };

  svg.addEventListener("click", (e) => {
    const g = e.target.closest(".lot");
    if (g) showTip(g);
  });
  svg.addEventListener("pointerover", (e) => {
    const g = e.target.closest(".lot");
    if (g && e.pointerType === "mouse") showTip(g);
  });
  svg.addEventListener("keydown", (e) => {
    const g = e.target.closest(".lot");
    if (g && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      showTip(g);
    }
  });
  svg.addEventListener("focusin", (e) => {
    const g = e.target.closest(".lot");
    if (g) showTip(g);
  });
  document.addEventListener("click", (e) => {
    if (!root.contains(e.target) || (!e.target.closest(".lot") && !e.target.closest(".siteplan__tip"))) hideTip();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideTip();
  });

  // ----- dibuja todo (se repite al cambiar de idioma) -----
  const render = () => {
    hideTip();

    // marcadores
    svg.innerHTML = "";
    lots.forEach((lot) => {
      const [x, y] = LOT_POSITIONS[lot.id];
      const estado = stateOf(lot);
      const area = fmtArea(lot.superficie);
      const g = svgEl("g", {
        class: `lot lot_${estado}`,
        tabindex: "0",
        role: "button",
        "data-id": lot.id,
        "data-estado": estado,
        "aria-label": `${T("lot", "Nave")} ${lot.id}${area ? ", " + area : ""}, ${statusLabel(estado).toLowerCase()}`,
      });
      g.append(
        svgEl("circle", { class: "lot__ring", cx: x, cy: y, r: 34 }),
        svgEl("circle", { class: "lot__dot", cx: x, cy: y, r: 27 })
      );
      const id = svgEl("text", { class: "lot__id", x, y: y + 1 });
      id.textContent = lot.id;
      const label = svgEl("text", { class: "lot__label", x, y: y + 52 });
      label.textContent = estado === "disponible" ? area || "" : statusLabel(estado).toUpperCase();
      g.append(id, label);
      svg.append(g);
    });

    // leyenda con conteo y filtro
    const counts = { disponible: 0, apartada: 0, vendida: 0 };
    lots.forEach((l) => (counts[stateOf(l)] += 1));
    legend.innerHTML = "";
    STATUSES.forEach((estado) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `siteplan__chip siteplan__chip_${estado}`;
      btn.setAttribute("aria-pressed", String(root.dataset.filter === estado));
      btn.innerHTML = `<span class="siteplan__swatch" aria-hidden="true"></span><span class="siteplan__chip-label"></span><span class="siteplan__count"></span>`;
      btn.querySelector(".siteplan__chip-label").textContent = statusLabel(estado);
      btn.querySelector(".siteplan__count").textContent = counts[estado];
      btn.addEventListener("click", () => {
        const on = btn.getAttribute("aria-pressed") !== "true";
        legend.querySelectorAll(".siteplan__chip").forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", String(on));
        root.dataset.filter = on ? estado : "";
        hideTip();
      });
      legend.append(btn);
    });

    // fecha de actualización
    if (data.actualizado && updated) {
      const d = new Date(`${data.actualizado}T12:00:00`);
      const date = d.toLocaleDateString(T("date.locale", "es-MX"), { day: "numeric", month: "long", year: "numeric" });
      updated.textContent = `${T("updated", "Actualizado")}: ${date}`;
    }

    // lista accesible
    table.innerHTML = "";
    lots.forEach((lot) => {
      const estado = stateOf(lot);
      const tr = document.createElement("tr");
      tr.className = `siteplan__row_${estado}`;
      [lot.id, fmtArea(lot.superficie) || "—", statusLabel(estado)].forEach((txt) => {
        const td = document.createElement("td");
        td.textContent = txt;
        tr.append(td);
      });
      table.append(tr);
    });
  };

  render();
  document.addEventListener("hexa:lang", render);
});
