// masterplan.js — plano interactivo de naves.
//
// Todo el contenido sale de assets/data/masterplan.json:
//   lots[]       → id, block, area, status ("available" | "reserved" | "sold"), x, y
//   amenities[]  → id, label, label_en (opcional), area, x, y
//   totalArea, unit
// x / y son porcentajes (0–100) sobre assets/images/masterplan/plano-base.jpg.

const PLAN_W = 1808;
const PLAN_H = 1358;
const SVG_NS = "http://www.w3.org/2000/svg";

// estados del JSON (inglés) → claves internas; también acepta español
const STATUS_MAP = {
  available: "disponible",
  reserved: "apartada",
  sold: "vendida",
  disponible: "disponible",
  apartada: "apartada",
  vendida: "vendida",
};
const STATUSES = ["disponible", "apartada", "vendida"];

const T = (key, es) => (window.HexaI18n ? window.HexaI18n.t(key) : es);
const isEn = () => window.HexaI18n && window.HexaI18n.lang === "en";
const statusLabel = (estado) => T(`st.${estado}`, estado);

const fmtNum = (n) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtArea = (n, unit = "m²") => (n == null ? null : `${fmtNum(n)} ${unit}`);

const px = (pct, size) => (Number(pct) / 100) * size;

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
  const total = root.querySelector(".siteplan__total");
  const amenityList = root.querySelector(".siteplan__amenities");
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

  const unit = data.unit || "m²";
  const lots = (data.lots || []).filter((l) => l.x != null && l.y != null);
  const amenities = (data.amenities || []).filter((a) => a.x != null && a.y != null);
  const stateOf = (lot) => STATUS_MAP[String(lot.status).toLowerCase()] || "disponible";
  const amenityLabel = (a) => (isEn() && a.label_en ? a.label_en : a.label);

  svg.setAttribute("viewBox", `0 0 ${PLAN_W} ${PLAN_H}`);

  // ----- tooltip -----
  const hideTip = () => {
    tip.hidden = true;
    svg.querySelectorAll(".lot_active").forEach((el) => el.classList.remove("lot_active"));
  };

  const placeTip = (x, y) => {
    tip.style.left = `${x}%`;
    tip.style.top = `${y}%`;
    // en la parte alta del plano el globo se abre hacia abajo para no recortarse
    tip.classList.toggle("siteplan__tip_below", y < 40);
    tip.hidden = false;
  };

  const tipLine = (cls, text) => {
    const p = document.createElement("p");
    p.className = cls;
    p.textContent = text;
    return p;
  };

  const showTip = (g) => {
    svg.querySelectorAll(".lot_active").forEach((el) => el.classList.remove("lot_active"));
    g.classList.add("lot_active");
    tip.innerHTML = "";

    if (g.dataset.kind === "amenity") {
      const a = amenities.find((item) => item.id === g.dataset.id);
      tip.append(tipLine("siteplan__tip-title", amenityLabel(a)));
      if (a.area != null) tip.append(tipLine("siteplan__tip-meta", fmtArea(a.area, unit)));
      placeTip(a.x, a.y);
      return;
    }

    const lot = lots.find((l) => l.id === g.dataset.id);
    const estado = g.dataset.estado;
    tip.append(
      tipLine("siteplan__tip-title", `${T("lot", "Nave")} ${lot.id}`),
      tipLine("siteplan__tip-meta", fmtArea(lot.area, unit) || T("area.tbd", "Superficie por confirmar")),
      tipLine(`siteplan__tip-status siteplan__tip-status_${estado}`, statusLabel(estado))
    );
    if (estado === "disponible") {
      const a = document.createElement("a");
      a.className = "siteplan__tip-cta";
      const subject = `${T("lot.mail", "Información nave")} ${lot.id}`;
      a.href = `mailto:sales@hexaparks.com?subject=${encodeURIComponent(subject)}`;
      a.textContent = T("lot.cta", "Solicitar información");
      tip.append(a);
    }
    placeTip(lot.x, lot.y);
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
    svg.innerHTML = "";

    // naves
    lots.forEach((lot) => {
      const x = px(lot.x, PLAN_W);
      const y = px(lot.y, PLAN_H);
      const estado = stateOf(lot);
      const area = fmtArea(lot.area, unit);
      const g = svgEl("g", {
        class: `lot lot_${estado}`,
        tabindex: "0",
        role: "button",
        "data-kind": "lot",
        "data-id": lot.id,
        "data-estado": estado,
        "aria-label": `${T("lot", "Nave")} ${lot.id}${area ? ", " + area : ""}, ${statusLabel(estado).toLowerCase()}`,
      });
      g.append(
        svgEl("circle", { class: "lot__ring", cx: x, cy: y, r: 26 }),
        svgEl("circle", { class: "lot__dot", cx: x, cy: y, r: 21 })
      );
      const id = svgEl("text", { class: "lot__id", x, y: y + 1 });
      id.textContent = lot.id;
      const label = svgEl("text", { class: "lot__label", x, y: y + 40 });
      label.textContent = estado === "disponible" ? area || "" : statusLabel(estado).toUpperCase();
      g.append(id, label);
      svg.append(g);
    });

    // amenidades (marcadores numerados)
    amenities.forEach((a, i) => {
      const x = px(a.x, PLAN_W);
      const y = px(a.y, PLAN_H);
      const g = svgEl("g", {
        class: "lot amenity-pin",
        tabindex: "0",
        role: "button",
        "data-kind": "amenity",
        "data-id": a.id,
        "aria-label": `${amenityLabel(a)}${a.area != null ? ", " + fmtArea(a.area, unit) : ""}`,
      });
      g.append(
        svgEl("circle", { class: "lot__ring", cx: x, cy: y, r: 21 }),
        svgEl("circle", { class: "amenity-pin__dot", cx: x, cy: y, r: 16 })
      );
      const n = svgEl("text", { class: "lot__id", x, y: y + 1 });
      n.textContent = String(i + 1);
      g.append(n);
      svg.append(g);
    });

    // superficie total
    if (total && data.totalArea != null) {
      total.textContent = isEn()
        ? `${fmtNum(data.totalArea)} ${unit} total area`
        : `${fmtNum(data.totalArea)} ${unit} de superficie total`;
    }

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

    // leyenda de amenidades
    if (amenityList) {
      amenityList.innerHTML = "";
      amenities.forEach((a, i) => {
        const li = document.createElement("li");
        const num = document.createElement("span");
        num.className = "siteplan__amenity-num";
        num.textContent = String(i + 1);
        li.append(num, ` ${amenityLabel(a)}${a.area != null ? " · " + fmtArea(a.area, unit) : ""}`);
        amenityList.append(li);
      });
    }

    // lista accesible
    table.innerHTML = "";
    lots.forEach((lot) => {
      const estado = stateOf(lot);
      const tr = document.createElement("tr");
      tr.className = `siteplan__row_${estado}`;
      [lot.id, fmtArea(lot.area, unit) || "—", statusLabel(estado)].forEach((txt) => {
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
