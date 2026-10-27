document.documentElement.classList.add("js");
const G = window.PROJECTS, root = document.documentElement;
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const st = { get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} } };
let played = st.get("played", []), cur = -1, opener = null;

function render() {
  G.forEach((g, i) => { g.n = String(i + 1).padStart(2, "0"); g.page = "pág. " + (i + 3); }); $("#pgIdx").textContent = "pág. 2"; $("#pgEnd").textContent = "pág. " + (G.length + 3);
  $("#sTotal").textContent = G.length; $("#sPlayed").textContent = played.length;
  $("#idx").innerHTML = G.map((g, i) => `<li><button type="button" data-play="${i}"><span>${g.n}.</span> ${g.name}<i></i><span class="m">${g.page}</span></button></li>`).join("") + `<li style="color:var(--muted)"><span>${String(G.length + 1).padStart(2, "0")}.</span> ???<i></i><span class="m">em breve</span></li>`;
  $("#capitulos").innerHTML = G.map((g, i) => `
  <div class="pg"><span>${g.page}</span></div><section class="ch reveal ${i % 2 ? "alt" : ""} ${played.includes(g.id) ? "done" : ""}" id="${g.id}"><div class="num" data-speed="-.08">${g.n}</div>
    <div class="chap">
      <div class="art" data-speed=".05"><div class="photo"><span class="tape"></span><span class="stamp">JOGADO ✓</span>
        <button class="cover" type="button" data-play="${i}" style="background:${g.bg}" aria-label="Jogar ${g.name}"><span class="em">${g.emoji}</span><iframe data-src="${g.url}" title="Prévia de ${g.name}" tabindex="-1" aria-hidden="true"></iframe></button>
        <h3 class="h">${g.name}<span>${g.page}</span></h3><p>${g.desc}</p>
        <div class="tags">${g.tags.map(t => `<b>${t}</b>`).join("")}</div>
        <div class="row"><button type="button" data-play="${i}">jogar aqui ▶</button><a href="${g.repo}" target="_blank" rel="noreferrer">código →</a></div></div></div>
      <div class="txt">
        <h4>Sobre o projeto</h4><p>${g.about}</p>
        <h4>Objetivo</h4><p>${g.goal}</p>
        <h4>Coisas legais</h4><div class="notes">${g.facts.map(f => `<div class="postit">${f}</div>`).join("")}</div>
        <p class="inv">${g.involvement}</p>
      </div></div></section>`).join("");
  observe(); tilt(); observePrev(); snap();
}
let io; function observe() { io && io.disconnect(); io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("in")), { threshold: .12 }); $$(".reveal,.hl").forEach(el => io.observe(el)); }
function tilt() { $$(".photo").forEach(p => { p.onmousemove = e => { const r = p.getBoundingClientRect(); p.style.transform = `rotateY(${((e.clientX - r.left) / r.width - .5) * 12}deg) rotateX(${-((e.clientY - r.top) / r.height - .5) * 12}deg) scale(1.02)`; }; p.onmouseleave = () => p.style.transform = ""; }); }

/* prévia ao vivo: o jogo roda em miniatura dentro da foto (só quando visível; desligada no celular) */
let ip; function observePrev() { ip && ip.disconnect(); if (matchMedia("(max-width:700px)").matches) return;
  ip = new IntersectionObserver(es => es.forEach(e => { const f = e.target, src = f.dataset.src;
    if (e.isIntersecting && cur < 0) { if (f.getAttribute("src") !== src) f.src = src; } else if (f.getAttribute("src") === src) f.src = "about:blank"; }), { rootMargin: "150px" });
  $$(".cover iframe").forEach(f => ip.observe(f)); }

/* parallax das camadas do DOM */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
(function par() { if (!reduce) $$("[data-speed]").forEach(el => { const r = el.getBoundingClientRect(), c = r.top + r.height / 2 - innerHeight / 2 - (+el.dataset.y || 0); el.dataset.y = -c * el.dataset.speed; el.style.translate = `0 ${el.dataset.y}px`; }); requestAnimationFrame(par); })();

/* jogador */
const P = $("#player"), F = $("#frame");
function open(i) { opener = document.activeElement; $$(".cover iframe").forEach(f => f.src = "about:blank"); cur = (i + G.length) % G.length; const g = G[cur];
  $("#pTitle").textContent = "✎ " + g.name; $("#pTab").href = g.url; F.src = g.url; P.classList.add("on"); document.body.style.overflow = "hidden"; Scene.pause(true); $("#pClose").focus();
  if (!played.includes(g.id)) { played.push(g.id); st.set("played", played); render(); } }
function close() { if (cur < 0) return; P.classList.remove("on"); F.src = "about:blank"; cur = -1; observePrev(); document.body.style.overflow = ""; Scene.pause(false); opener && opener.focus && opener.focus(); }
document.addEventListener("click", e => {
  const p = e.target.closest("[data-play]"); if (p) return open(+p.dataset.play);
});
$("#pClose").onclick = close; $("#pPrev").onclick = () => open(cur - 1); $("#pNext").onclick = () => open(cur + 1);
$("#pFull").onclick = () => { const s = $(".stage"); (s.requestFullscreen || s.webkitRequestFullscreen || (() => {})).call(s); };
addEventListener("keydown", e => { if (e.key === "Escape") close(); if (cur >= 0 && e.altKey && e.key === "ArrowRight") open(cur + 1); if (cur >= 0 && e.altKey && e.key === "ArrowLeft") open(cur - 1); });


/* tema */
const mq = matchMedia("(prefers-color-scheme: dark)"), t0 = st.get("theme", null); if (t0) root.dataset.theme = t0;
const isDark = () => (root.dataset.theme || (mq.matches ? "dark" : "light")) === "dark";
const applyTheme = () => { $("#theme").textContent = isDark() ? "☀️ de dia" : "🌙 à noite"; Scene.setDark(isDark()); };
$("#theme").onclick = () => { const n = isDark() ? "light" : "dark"; root.dataset.theme = n; st.set("theme", n); applyTheme(); }; applyTheme();

/* relógio (Brasília) */
const df = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Sao_Paulo" });
const tick = () => $("#clock").textContent = df.format(new Date()).replace(",", " ·"); tick(); setInterval(tick, 15000);

addEventListener("scroll", () => { $("#ink").style.height = (scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight) * 100) + "%"; }, { passive: true });

/* a folha inclina de leve com o mouse (profundidade) */
if (!reduce && matchMedia("(hover:hover)").matches) addEventListener("pointermove", e => { const b = $(".book"); b.style.setProperty("--ry", ((e.clientX / innerWidth - .5) * 2.2) + "deg"); b.style.setProperty("--rx", (-(e.clientY / innerHeight - .5) * 1.4) + "deg"); });
/* cada capítulo ocupa um número inteiro de linhas da pauta */
function snap() { const L = parseFloat(getComputedStyle(root).fontSize) * 2.25; $$(".notes").forEach(n => { n.style.minHeight = ""; n.style.minHeight = Math.ceil(n.offsetHeight / L - .001) * L + "px"; }); $$(".chap").forEach(c => { c.style.minHeight = ""; c.style.minHeight = Math.ceil(c.offsetHeight / L - .001) * L + "px"; }); }
addEventListener("resize", snap); document.fonts && document.fonts.ready.then(snap);
render();
const hi = G.findIndex(g => g.id === location.hash.slice(1)); if (hi >= 0) open(hi);
