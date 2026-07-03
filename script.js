/* ============================================================
   REED SIGNATURE — Interactions
   ============================================================ */

/* ╔══════════════════════════════════════════════════════════╗
   ║  CONFIGURATION — MODIFIEZ ICI VOS COORDONNÉES              ║
   ║  • WHATSAPP : numéro au format international, sans + ni espaces
   ║    (RDC = indicatif 243). Ex : "243812345678"             ║
   ║  • Le champ « Numéro WhatsApp » de la page Contact permet  ║
   ║    aussi de le changer sans toucher au code.               ║
   ╚══════════════════════════════════════════════════════════╝ */
const CONFIG = {
  WHATSAPP: "243904941919",
  MESSAGE: "Bonjour REED SIGNATURE, je souhaite recevoir un devis pour des pailles personnalisées pour mon établissement.",
};

(function () {
  "use strict";

  /* ---------- Liens WhatsApp ---------- */
  function waLink(number) {
    const clean = String(number).replace(/[^0-9]/g, "");
    return "https://wa.me/" + clean + "?text=" + encodeURIComponent(CONFIG.MESSAGE);
  }
  function applyWhatsApp(number) {
    const url = waLink(number);
    document.querySelectorAll("[data-wa]").forEach((el) => {
      el.setAttribute("href", url);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
    // Téléphone affiché
    const phone = document.getElementById("contactPhone");
    if (phone) {
      const tel = "+" + String(number).replace(/[^0-9]/g, "");
      phone.setAttribute("href", "tel:" + tel);
      phone.textContent = tel.replace(/(\+\d{3})(\d{3})(\d{3})(\d+)/, "$1 $2 $3 $4");
    }
  }
  applyWhatsApp(CONFIG.WHATSAPP);

  /* ---------- Champ d'édition du numéro ---------- */
  const waInput = document.getElementById("waNumber");
  const waUpdate = document.getElementById("waUpdate");
  if (waInput) waInput.value = CONFIG.WHATSAPP;
  if (waUpdate && waInput) {
    const update = () => {
      const val = waInput.value.replace(/[^0-9]/g, "");
      if (val.length >= 8) {
        applyWhatsApp(val);
        waUpdate.textContent = "Mis à jour ✓";
        setTimeout(() => (waUpdate.textContent = "Mettre à jour"), 1800);
      } else {
        waInput.focus();
      }
    };
    waUpdate.addEventListener("click", update);
    waInput.addEventListener("keydown", (e) => { if (e.key === "Enter") update(); });
  }

  /* ---------- Header au scroll ---------- */
  const header = document.getElementById("header");
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");

    // Bouton WhatsApp flottant
    const float = document.querySelector(".wa-float");
    if (float) float.classList.toggle("show", window.scrollY > 600);
  };
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => { onScroll(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ---------- Navigation mobile ---------- */
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  const body = document.body;
  function closeNav() {
    body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Ouvrir le menu");
    if (mobileNav) mobileNav.setAttribute("aria-hidden", "true");
  }
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const open = body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      if (mobileNav) mobileNav.setAttribute("aria-hidden", String(!open));
    });
    document.querySelectorAll(".mobile-nav a").forEach((a) =>
      a.addEventListener("click", closeNav)
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && body.classList.contains("nav-open")) closeNav();
    });
  }

  /* ---------- Révélations au scroll ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            // léger décalage en cascade pour les éléments d'une même grille
            const delay = el.dataset.delay ? parseInt(el.dataset.delay, 10) : 0;
            setTimeout(() => el.classList.add("is-visible"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // Cascade douce dans les grilles
  document.querySelectorAll(".card-grid, .timeline, .info-bar-grid, .gallery-grid").forEach((grid) => {
    grid.querySelectorAll("[data-reveal]").forEach((el, i) => {
      el.dataset.delay = String(Math.min(i * 90, 450));
    });
  });

  /* ---------- FAQ : hauteur animée ---------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const summary = item.querySelector("summary");
    const answer = item.querySelector(".faq-answer");
    summary.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = item.hasAttribute("open");
      if (isOpen) {
        answer.style.maxHeight = answer.scrollHeight + "px";
        requestAnimationFrame(() => { answer.style.maxHeight = "0px"; });
        answer.addEventListener("transitionend", function handler() {
          item.removeAttribute("open");
          answer.removeEventListener("transitionend", handler);
        }, { once: true });
      } else {
        item.setAttribute("open", "");
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.addEventListener("transitionend", function handler() {
          if (item.hasAttribute("open")) answer.style.maxHeight = "none";
          answer.removeEventListener("transitionend", handler);
        }, { once: true });
      }
    });
  });

  /* ---------- Année du copyright ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
