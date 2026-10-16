// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle (remembers choice)
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
function setTheme(t) {
  root.setAttribute("data-theme", t);
  themeBtn.innerHTML = t === "dark" ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
  try { localStorage.setItem("theme", t); } catch (e) {}
}
let saved = "dark";
try { saved = localStorage.getItem("theme") || "dark"; } catch (e) {}
setTheme(saved);
themeBtn.addEventListener("click", () => setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark"));

// Mobile menu
const menu = document.getElementById("menu");
const burger = document.getElementById("burger");
burger.addEventListener("click", () => menu.classList.toggle("open"));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));

// Nav shadow on scroll
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 20));

// Typing effect
const words = ["insights", "dashboards", "decisions", "stories"];
const typed = document.getElementById("typed");
let w = 0, c = 0, del = false;
function type() {
  const word = words[w];
  typed.textContent = word.slice(0, c);
  if (!del && c < word.length) { c++; setTimeout(type, 110); }
  else if (!del) { del = true; setTimeout(type, 1400); }
  else if (c > 0) { c--; setTimeout(type, 60); }
  else { del = false; w = (w + 1) % words.length; setTimeout(type, 300); }
}
type();

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Count-up stats
const counters = document.querySelectorAll("[data-count]");
const co = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count;
    const start = performance.now(), dur = 1200;
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor(p * target);
      if (p < 1) requestAnimationFrame(tick);
    })(start);
    co.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(el => co.observe(el));

// Active nav link
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".menu a");
const so = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => so.observe(s));

// Contact form -> opens the visitor's email app addressed to Hariharan
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("cName").value.trim();
  const email = document.getElementById("cEmail").value.trim();
  const msg = document.getElementById("cMsg").value.trim();
  const subject = encodeURIComponent("Portfolio enquiry from " + name);
  const body = encodeURIComponent(msg + "\n\nFrom: " + name + " (" + email + ")");
  window.location.href = "mailto:hariharan936354@gmail.com?subject=" + subject + "&body=" + body;
});

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const cursorDot = document.createElement("div");
  const cursorRing = document.createElement("div");
  cursorDot.className = "custom-cursor-dot";
  cursorRing.className = "custom-cursor-ring";
  document.body.append(cursorRing, cursorDot);

  let targetX = 0, targetY = 0, ringX = 0, ringY = 0;
  let cursorFrame;
  function moveCursor() {
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;
    cursorDot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

    if (Math.abs(targetX - ringX) > 0.1 || Math.abs(targetY - ringY) > 0.1) {
      cursorFrame = requestAnimationFrame(moveCursor);
    } else {
      cursorFrame = undefined;
    }
  }

  document.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    cursorDot.classList.add("visible");
    cursorRing.classList.add("visible");
    if (cursorFrame === undefined) cursorFrame = requestAnimationFrame(moveCursor);
  });

  document.documentElement.addEventListener("mouseleave", () => {
    cursorDot.classList.remove("visible");
    cursorRing.classList.remove("visible");
  });
}
