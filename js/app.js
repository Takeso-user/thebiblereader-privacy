/**
 * TheBibleReader — Interactive Showcase & Legal Portal Controller
 */
(function () {
  const SUPPORTED_LANGS = ["ru", "en", "pl", "uk"];
  let currentLang = detectInitialLang();
  let currentTheme = localStorage.getItem("br_web_theme") || "dark";
  let currentScreenIndex = 0;
  let currentLegalTab = "privacy";

  const ICONS = {
    calendar: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    headphones: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>`,
    "book-open": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    cloud: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
    palette: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
    "wifi-off": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.58 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`,
    "shield-check": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
    lock: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    "user-check": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`,
    "trash-2": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`
  };

  function detectInitialLang() {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (urlLang && SUPPORTED_LANGS.includes(urlLang)) return urlLang;

    const saved = localStorage.getItem("br_web_lang");
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;

    const navLang = (navigator.language || "ru").slice(0, 2).toLowerCase();
    if (SUPPORTED_LANGS.includes(navLang)) return navLang;
    return "ru";
  }

  function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem("br_web_theme", theme);
    if (theme === "sepia") {
      document.documentElement.setAttribute("data-theme", "sepia");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    updateThemeButtonText();
  }

  function updateThemeButtonText() {
    const t = window.BIBLE_READER_TRANSLATIONS[currentLang];
    const btn = document.getElementById("theme-toggle-btn");
    if (!btn || !t) return;
    if (currentTheme === "sepia") {
      btn.innerHTML = `<span>🌙</span> <span>${t.nav.themeDark}</span>`;
    } else {
      btn.innerHTML = `<span>📜</span> <span>${t.nav.themeLight}</span>`;
    }
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined) {
      el.textContent = value;
    }
  }

  function renderFeatures(t) {
    const grid = document.getElementById("features-grid");
    if (!grid) return;
    grid.innerHTML = t.features.items
      .map(
        (item) => `
      <div class="feature-card">
        <div class="feature-icon-wrap">${ICONS[item.icon] || ICONS["book-open"]}</div>
        <h3 class="feature-title">${item.title}</h3>
        <p class="feature-desc">${item.desc}</p>
      </div>
    `
      )
      .join("");
  }

  function renderShowcase(t) {
    const screens = t.showcase.screens;
    if (!screens || !screens.length) return;
    const active = screens[currentScreenIndex] || screens[0];

    // Tabs
    const tabsWrap = document.getElementById("showcase-tabs");
    if (tabsWrap) {
      tabsWrap.innerHTML = screens
        .map(
          (scr, idx) => `
        <button class="showcase-tab-btn ${idx === currentScreenIndex ? "active" : ""}" data-screen-idx="${idx}">
          ${scr.tab}
        </button>
      `
        )
        .join("");

      tabsWrap.querySelectorAll(".showcase-tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          currentScreenIndex = parseInt(btn.getAttribute("data-screen-idx"), 10);
          renderShowcase(window.BIBLE_READER_TRANSLATIONS[currentLang]);
        });
      });
    }

    // Phone image
    const screenImg = document.getElementById("showcase-screen-img");
    if (screenImg && screenImg.getAttribute("src") !== active.image) {
      screenImg.style.opacity = "0.3";
      setTimeout(() => {
        screenImg.setAttribute("src", active.image);
        screenImg.setAttribute("alt", active.title);
        screenImg.style.opacity = "1";
      }, 120);
    }

    // Details
    setText("showcase-panel-tag", active.tag);
    setText("showcase-panel-title", active.title);
    setText("showcase-panel-desc", active.desc);

    const bulletsEl = document.getElementById("showcase-bullets");
    if (bulletsEl) {
      bulletsEl.innerHTML = active.bullets
        .map((b) => `<li><span class="bullet-check">✓</span><span>${b}</span></li>`)
        .join("");
    }

    // Thumbnails
    const thumbsEl = document.getElementById("showcase-thumbs");
    if (thumbsEl) {
      thumbsEl.innerHTML = screens
        .map(
          (scr, idx) => `
        <button class="thumb-btn ${idx === currentScreenIndex ? "active" : ""}" data-thumb-idx="${idx}" title="${scr.title}">
          <img src="${scr.image}" alt="${scr.tab}" loading="lazy" />
        </button>
      `
        )
        .join("");

      thumbsEl.querySelectorAll(".thumb-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          currentScreenIndex = parseInt(btn.getAttribute("data-thumb-idx"), 10);
          renderShowcase(window.BIBLE_READER_TRANSLATIONS[currentLang]);
        });
      });
    }
  }

  function renderSafety(t) {
    const grid = document.getElementById("safety-grid");
    if (!grid) return;
    grid.innerHTML = t.safety.cards
      .map(
        (card) => `
      <div class="safety-card">
        <div class="safety-icon">${ICONS[card.icon] || ICONS["shield-check"]}</div>
        <div>
          <h3 class="safety-title">${card.title}</h3>
          <p class="safety-desc">${card.desc}</p>
        </div>
      </div>
    `
      )
      .join("");
  }

  function linkifyText(text) {
    return text
      .replace(
        /(https:\/\/[^\s)]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
      )
      .replace(
        /(sergiusz\.malec@thescripturereader\.app)/g,
        '<a href="mailto:$1?subject=Account%20Deletion%20Request">$1</a>'
      );
  }

  function renderLegal(t) {
    // Update tab labels
    document.querySelectorAll(".legal-tab-btn").forEach((btn) => {
      const tabKey = btn.getAttribute("data-legal-tab");
      if (t.legal.tabs[tabKey]) {
        btn.textContent = t.legal.tabs[tabKey];
      }
      btn.classList.toggle("active", tabKey === currentLegalTab);
    });

    const contentMap = {
      privacy: t.legal.privacyContent,
      disclaimer: t.legal.disclaimerContent,
      deletion: t.legal.deletionContent
    };

    const data = contentMap[currentLegalTab] || contentMap.privacy;
    const box = document.getElementById("legal-content-box");
    if (!box || !data) return;

    const sectionsHtml = data.sections
      .map((sec) => {
        const listHtml = sec.list
          ? `<ul>${sec.list.map((li) => `<li>${linkifyText(li)}</li>`).join("")}</ul>`
          : "";
        return `
        <div class="legal-block">
          <h3>${sec.h}</h3>
          <p>${sec.p}</p>
          ${listHtml}
        </div>
      `;
      })
      .join("");

    box.innerHTML = `
      <div class="legal-meta">${data.updated}</div>
      ${sectionsHtml}
    `;
  }

  function applyLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = "ru";
    currentLang = lang;
    localStorage.setItem("br_web_lang", lang);
    document.documentElement.setAttribute("lang", lang);

    const t = window.BIBLE_READER_TRANSLATIONS[lang];
    if (!t) return;

    document.title = t.meta.title;

    // Update active state on language buttons
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    // Navbar
    setText("nav-features", t.nav.features);
    setText("nav-screenshots", t.nav.screenshots);
    setText("nav-safety", t.nav.safety);
    setText("nav-legal", t.nav.legal);
    updateThemeButtonText();

    // Hero
    setText("hero-badge-text", t.hero.badge);
    setText("hero-title-start", t.hero.titleStart);
    setText("hero-title-highlight", t.hero.titleHighlight);
    setText("hero-title-end", t.hero.titleEnd);
    setText("hero-subtitle", t.hero.subtitle);

    setText("gp-sub-1", t.hero.googlePlaySub);
    setText("gp-main-1", t.hero.googlePlayMain);
    setText("as-sub-1", t.hero.appStoreSub);
    setText("as-main-1", t.hero.appStoreMain);
    setText("as-badge-1", t.hero.appStoreBadge);

    setText("gp-sub-2", t.hero.googlePlaySub);
    setText("gp-main-2", t.hero.googlePlayMain);
    setText("as-sub-2", t.hero.appStoreSub);
    setText("as-main-2", t.hero.appStoreMain);
    setText("as-badge-2", t.hero.appStoreBadge);

    setText("pill-audio", t.hero.pillAudio);
    setText("pill-schedule", t.hero.pillSchedule);
    setText("pill-sync", t.hero.pillSync);
    setText("pill-privacy", t.hero.pillPrivacy);

    // Stats
    setText("stat-books-val", t.stats.booksValue);
    setText("stat-books-lbl", t.stats.booksLabel);
    setText("stat-chapters-val", t.stats.chaptersValue);
    setText("stat-chapters-lbl", t.stats.chaptersLabel);
    setText("stat-langs-val", t.stats.langsValue);
    setText("stat-langs-lbl", t.stats.langsLabel);
    setText("stat-ads-val", t.stats.adsValue);
    setText("stat-ads-lbl", t.stats.adsLabel);

    // Features
    setText("features-badge", t.features.badge);
    setText("features-title", t.features.title);
    setText("features-subtitle", t.features.subtitle);
    renderFeatures(t);

    // Showcase
    setText("showcase-badge", t.showcase.badge);
    setText("showcase-title", t.showcase.title);
    setText("showcase-subtitle", t.showcase.subtitle);
    renderShowcase(t);

    // Data Safety
    setText("safety-badge", t.safety.badge);
    setText("safety-title", t.safety.title);
    setText("safety-subtitle", t.safety.subtitle);
    renderSafety(t);

    // Legal
    setText("legal-badge", t.legal.badge);
    setText("legal-title", t.legal.title);
    setText("legal-subtitle", t.legal.subtitle);
    renderLegal(t);

    // Bottom CTA & Footer
    setText("cta-title", t.cta.title);
    setText("cta-subtitle", t.cta.subtitle);
    setText("cta-standalone-privacy", t.cta.standalonePrivacy);

    setText("footer-desc", t.footer.description);
    setText("footer-links-title", t.footer.linksTitle);
    setText("footer-legal-title", t.footer.legalTitle);
    setText("footer-contact-title", t.footer.contactTitle);
    setText("footer-nav-features", t.nav.features);
    setText("footer-nav-screenshots", t.nav.screenshots);
    setText("footer-nav-safety", t.nav.safety);
    setText("footer-link-privacy", t.footer.privacyLink);
    setText("footer-link-disclaimer", t.footer.disclaimerLink);
    setText("footer-link-deletion", t.footer.deletionLink);
    setText("footer-link-standalone", t.footer.StandalonePrivacyLink);
    setText("footer-contact-issues", t.footer.issuesLink);
    setText("footer-contact-delete", t.footer.deleteRequestLink);
    setText("footer-copyright", t.footer.copyright);
    setText("footer-non-affiliation", t.footer.nonAffiliation);
  }

  function handleHashNavigation() {
    const hash = window.location.hash.replace("#", "");
    if (hash === "privacy" || hash === "disclaimer" || hash === "deletion" || hash === "delete-account") {
      currentLegalTab = hash === "delete-account" ? "deletion" : hash;
      const t = window.BIBLE_READER_TRANSLATIONS[currentLang];
      if (t) renderLegal(t);
      const legalSec = document.getElementById("legal");
      if (legalSec) legalSec.scrollIntoView({ behavior: "smooth" });
    }
  }

  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Bind language buttons
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        applyLanguage(lang);
      });
    });

    // Bind theme toggle
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        applyTheme(currentTheme === "dark" ? "sepia" : "dark");
      });
    }

    // Bind legal tab buttons
    document.querySelectorAll(".legal-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentLegalTab = btn.getAttribute("data-legal-tab");
        renderLegal(window.BIBLE_READER_TRANSLATIONS[currentLang]);
      });
    });

    // Bind footer legal quick links
    document.querySelectorAll("[data-open-legal]").forEach((link) => {
      link.addEventListener("click", (e) => {
        const tab = link.getAttribute("data-open-legal");
        if (tab) {
          currentLegalTab = tab;
          renderLegal(window.BIBLE_READER_TRANSLATIONS[currentLang]);
        }
      });
    });

    applyTheme(currentTheme);
    applyLanguage(currentLang);
    handleHashNavigation();
    window.addEventListener("hashchange", handleHashNavigation);
    initScrollReveal();
  });
})();

