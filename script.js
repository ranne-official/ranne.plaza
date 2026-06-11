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
