/* ============================================================
   Jaelyn Denise — golden galactic portfolio
   Three-atmosphere toggle, cosmic starfield, scroll-spy, reveals.
   ============================================================ */

(function () {
  const root = document.documentElement;
  root.classList.add("js");

  /* ---------- three-atmosphere toggle: dark → twilight → light ---------- */
  const THEMES = ["dark", "twilight", "light"];
  const LABELS = {
    dark: "Galactic night — click for twilight",
    twilight: "Twilight — click for marble daylight",
    light: "Marble daylight — click for galactic night",
  };
  const toggle = document.getElementById("theme-toggle");

  const stored = localStorage.getItem("theme");
  if (THEMES.includes(stored)) root.setAttribute("data-theme", stored);

  function syncLabel() {
    const t = root.getAttribute("data-theme");
    toggle.setAttribute("aria-label", LABELS[t] || "Change theme");
    toggle.setAttribute("title", LABELS[t] || "Change atmosphere");
  }

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    syncLabel();
  });
  syncLabel();

  /* ---------- static starfield (gold / champagne) ----------
     Painted once. Deliberately no per-star animation: the field sits behind
     backdrop-filter glass, so animating it would re-blur every panel each
     frame and freeze the renderer. */
  const field = document.getElementById("starfield");
  if (field) {
    const STAR_COUNT = 110;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 2 + 0.5;
      star.style.width = size + "px";
      star.style.height = size + "px";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      frag.appendChild(star);
    }
    field.appendChild(frag);
  }

  /* ---------- reveal on scroll ---------- */
  const revealables = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px -8% 0px" }
  );
  revealables.forEach((el) => revealObserver.observe(el));

  /* ---------- scroll-spy nav highlighting ---------- */
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) =>
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          )
        );
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((section) => spyObserver.observe(section));
})();
