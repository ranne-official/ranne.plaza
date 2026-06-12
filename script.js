// ===== Skills data =====
const technicalSkills = [
  "Microsoft Office Suite", "GoHighLevel", "Graphic Design", "Video Editing",
  "CRM Management", "Computer Programming", "Cold Calling", "Customer Support"
];

const softSkills = [
  "Communication", "Customer Service Orientation", "Active Listening", "Problem-Solving",
  "Time Management", "Adaptability", "Attention to Detail", "Organization & Planning",
  "Team Collaboration", "Critical Thinking", "Creativity", "Multitasking",
  "Client Relationship Management", "Decision-Making", "Self-Motivation", "Professionalism",
  "Leadership", "Conflict Resolution", "Patience & Empathy", "Works Independently"
];

function renderChips(id, items, cls) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = items.map(s => `<span class="chip ${cls}">${s}</span>`).join("");
}

renderChips("techSkills", technicalSkills, "chip--tech");
renderChips("softSkills", softSkills, "chip--soft");

// ===== Theme toggle =====
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}

// ===== Year =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = "2026";

// ===== Nav scroll shadow =====
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ===== Mobile menu =====
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => links.classList.toggle("open"));
links.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => links.classList.remove("open"))
);

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll(
  ".section__title, .about__text, .about__stats, .timeline__item, .skills__col, .project, .edu__card, .contact__cards, .contact__lead"
);
revealEls.forEach(el => el.classList.add("reveal"));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// ===== Scroll progress bar =====
const scrollBar = document.getElementById("scrollBar");
if (scrollBar) {
  const updateBar = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    scrollBar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  };
  updateBar();
  window.addEventListener("scroll", updateBar, { passive: true });
}

// ===== Hero mouse spotlight =====
const hero = document.getElementById("home");
const heroSpot = document.getElementById("heroSpot");
if (hero && heroSpot && window.matchMedia("(pointer: fine)").matches) {
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    heroSpot.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
    heroSpot.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
  });
}

// ===== Typing role effect =====
const roleEl = document.getElementById("roleType");
if (roleEl) {
  const roles = [
    "Information Systems Graduate",
    "CRM & Funnel Builder",
    "Graphic Designer",
    "Customer Support Specialist",
    "Video Editor"
  ];
  let ri = 0, ci = 0, deleting = false;
  const tick = () => {
    const word = roles[ri];
    ci += deleting ? -1 : 1;
    roleEl.textContent = word.slice(0, ci);
    let delay = deleting ? 45 : 90;
    if (!deleting && ci === word.length) { delay = 1600; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 350; }
    setTimeout(tick, delay);
  };
  tick();
}

// ===== Count-up stats =====
const counters = document.querySelectorAll(".stat__num[data-count]");
const countIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || "";
    const dur = 1200;
    let start = null;
    const step = (t) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    countIO.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => countIO.observe(c));
