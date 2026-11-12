(function () {
  "use strict";

  // Contact email shown on the Contact tab. Leave empty to show a placeholder.
  const CONTACT_EMAIL = "";

  const PLATFORMS = { windows: "Windows", linux: "Linux", android: "Android", apple: "Apple" };
  const BROWSERS = { firefox: "Firefox", chrome: "Chrome" };
  const BADGE_LABELS = { ...PLATFORMS, ...BROWSERS };
  const TYPES = { applications: "application", games: "game" };
  const LINK_LABELS = { learnMore: "Learn More", store: "View in Store", download: "Download", source: "View on GitHub" };

  const ROUTES = {
    about: {
      title: "Pocket Studios LLC",
      description: "Pocket Studios LLC is a software development studio that builds applications and games for PC and mobile platforms."
    },
    applications: {
      title: "Applications | Pocket Studios LLC",
      description: "Browse applications and games from Pocket Studios LLC for Windows, Linux, Android, and Apple platforms."
    },
    extensions: {
      title: "Extensions | Pocket Studios LLC",
      description: "Browse web browser extensions from Pocket Studios LLC for Firefox and Chrome."
    },
    contact: {
      title: "Contact | Pocket Studios LLC",
      description: "Contact Pocket Studios LLC regarding our applications, games, and business opportunities."
    }
  };

  const products = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
  const filters = { types: new Set(), platforms: new Set() };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- Routing ----------

  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, "");
    const [path, query = ""] = raw.split("?");
    return {
      route: ROUTES[path] ? path : "about",
      params: new URLSearchParams(query)
    };
  }

  function showRoute() {
    const { route, params } = parseHash();

    $$(".view").forEach((view) => { view.hidden = view.dataset.route !== route; });
    $$("[data-nav]").forEach((link) => {
      if (link.dataset.nav === route) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    document.title = ROUTES[route].title;
    $('meta[name="description"]').setAttribute("content", ROUTES[route].description);

    closeMenu();
    closeFilter();

    if (route === "applications") {
      readFilters(params);
      renderProducts();
    }
    if (route === "extensions") renderExtensions();

    window.scrollTo(0, 0);
  }

  // ---------- Mobile menu ----------

  const navToggle = $(".nav-toggle");
  const nav = $("#site-nav");

  function closeMenu() {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // ---------- Filters ----------

  const filterButton = $(".filter-button");
  const filterPanel = $("#filter-panel");
  const filterCount = $(".filter-count");

  function openFilter() {
    filterPanel.hidden = false;
    filterButton.setAttribute("aria-expanded", "true");
    $("input", filterPanel).focus();
  }

  function closeFilter() {
    filterPanel.hidden = true;
    filterButton.setAttribute("aria-expanded", "false");
  }

  filterButton.addEventListener("click", () => {
    if (filterPanel.hidden) openFilter();
    else closeFilter();
  });

  document.addEventListener("click", (event) => {
    if (!filterPanel.hidden && !event.target.closest(".filter")) closeFilter();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!filterPanel.hidden) {
      closeFilter();
      filterButton.focus();
    }
    closeMenu();
  });

  filterPanel.addEventListener("change", (event) => {
    const input = event.target;
    const set = input.name === "type" ? filters.types : filters.platforms;
    if (input.checked) set.add(input.value);
    else set.delete(input.value);
    writeFilters();
    renderProducts();
  });

  $(".filter-clear").addEventListener("click", () => {
    filters.types.clear();
    filters.platforms.clear();
    writeFilters();
    renderProducts();
  });

  function readFilters(params) {
    const pick = (key, allowed) =>
      (params.get(key) || "").split(",").filter((value) => value in allowed);

    filters.types = new Set(pick("type", TYPES));
    filters.platforms = new Set(pick("platform", PLATFORMS));
  }

  function writeFilters() {
    const parts = [];
    if (filters.types.size) parts.push("type=" + [...filters.types].join(","));
    if (filters.platforms.size) parts.push("platform=" + [...filters.platforms].join(","));
    const hash = "#/applications" + (parts.length ? "?" + parts.join("&") : "");
    history.replaceState(null, "", hash);
  }

  function syncFilterControls() {
    $$("input", filterPanel).forEach((input) => {
      const set = input.name === "type" ? filters.types : filters.platforms;
      input.checked = set.has(input.value);
    });

    const count = filters.types.size + filters.platforms.size;
    filterCount.hidden = count === 0;
    filterCount.textContent = String(count);
    filterButton.setAttribute("aria-label", count ? `Filter, ${count} active` : "Filter");
  }

  // ---------- Products ----------

  function matchesPlatform(product) {
    if (!filters.platforms.size) return true;
    return (product.platforms || []).some((platform) => filters.platforms.has(platform));
  }

  function renderProducts() {
    syncFilterControls();

    const showAll = filters.types.size === 0 || filters.types.size === Object.keys(TYPES).length;
    const split = $(".split");
    split.classList.toggle("is-single", !showAll);

    for (const [key, type] of Object.entries(TYPES)) {
      const col = $(`[data-col="${type}"]`);
      col.hidden = !showAll && !filters.types.has(key);

      const all = products.filter((product) => product.type === type);
      const visible = all.filter(matchesPlatform);

      const list = $(".card-list", col);
      list.replaceChildren(...visible.map(buildCard));

      const empty = $(".empty", col);
      empty.hidden = visible.length > 0;
      empty.textContent = all.length === 0
        ? "New releases are coming soon."
        : "No items match the selected filters.";
    }
  }

  function renderExtensions() {
    const visible = products.filter((product) => product.type === "extension");
    $("#extension-list").replaceChildren(...visible.map(buildCard));
    $("#extension-empty").hidden = visible.length > 0;
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function buildCard(product) {
    const card = el("article", "product-card");

    let thumb;
    if (product.image) {
      thumb = el("img", "product-thumb");
      thumb.src = product.image;
      thumb.alt = "";
      thumb.loading = "lazy";
    } else {
      thumb = el("div", "product-thumb", (product.name || "?").charAt(0).toUpperCase());
      thumb.setAttribute("aria-hidden", "true");
    }
    card.append(thumb);

    const body = el("div", "product-body");
    body.append(el("h3", null, product.name));
    if (product.description) body.append(el("p", null, product.description));

    const platforms = (product.platforms || []).filter((p) => p in BADGE_LABELS);
    if (platforms.length) {
      const badges = el("ul", "badges");
      badges.setAttribute("aria-label", "Platforms");
      platforms.forEach((p) => badges.append(el("li", "badge", BADGE_LABELS[p])));
      body.append(badges);
    }

    const links = Object.entries(product.links || {}).filter(([key, url]) => url && key in LINK_LABELS);
    if (links.length) {
      const wrap = el("div", "product-links");
      links.forEach(([key, url]) => {
        const a = el("a", null, LINK_LABELS[key]);
        a.href = url;
        if (/^https?:/.test(url)) {
          a.target = "_blank";
          a.rel = "noopener";
        }
        wrap.append(a);
      });
      body.append(wrap);
    }

    card.append(body);
    return card;
  }

  // ---------- Contact ----------

  function renderContact() {
    const target = $("#contact-email");
    if (CONTACT_EMAIL) {
      const a = el("a", null, CONTACT_EMAIL);
      a.href = "mailto:" + CONTACT_EMAIL;
      target.replaceChildren(a);
    } else {
      target.replaceChildren(el("span", "placeholder", "Email address coming soon."));
    }
  }

  // ---------- Init ----------

  $("#year").textContent = String(new Date().getFullYear());
  renderContact();
  window.addEventListener("hashchange", showRoute);
  showRoute();
})();
