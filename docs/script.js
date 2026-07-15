/* ============================================================
   Jaelyn Denise — galaxy glass
   Theme toggle, starfield, scroll-spy, reveal animations.
   ============================================================ */

(function () {
  const root = document.documentElement;
  root.classList.add("js");

  /* ---------- theme toggle (sun / crescent moon) ---------- */
  const toggle = document.getElementById("theme-toggle");
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    root.setAttribute("data-theme", stored);
  }

  function syncToggleLabel() {
    const dark = root.getAttribute("data-theme") === "dark";
    toggle.setAttribute(
      "aria-label",
      dark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    syncToggleLabel();
  });
  syncToggleLabel();

  /* ---------- starfield ---------- */
  const field = document.getElementById("starfield");
  const STAR_COUNT = 140;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement("div");
    star.className = "star";
    const size = Math.random() * 2.2 + 0.6;
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.setProperty("--tw-dur", (Math.random() * 5 + 2.5).toFixed(2) + "s");
    star.style.setProperty("--tw-delay", (Math.random() * 6).toFixed(2) + "s");
    frag.appendChild(star);
  }
  field.appendChild(frag);

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
