/**
 * HelpOne mobile nav for standalone static pages (no Next.js runtime),
 * e.g. /calculator and /partner-apply. Builds a drawer from the desktop nav
 * links and toggles it from #hamburger. Vanilla JS, no RSC edits.
 */
(function () {
  function init() {
    var btn = document.getElementById("hamburger");
    var nav = btn && btn.closest("nav");
    if (!nav || document.getElementById("h1nav-drawer")) return;
    var desk = nav.querySelector(".hidden.md\\:flex");
    if (!desk) return;

    var css = document.createElement("style");
    css.textContent =
      "#h1nav-drawer{display:none;position:absolute;left:0;right:0;top:100%;max-height:calc(100vh - 80px);overflow-y:auto;background:#0A1428;border-bottom:1px solid rgba(255,255,255,.1);padding:8px 24px 24px;z-index:60}" +
      "#h1nav-drawer.is-open{display:block}" +
      "#h1nav-drawer h3{font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;color:rgba(255,255,255,.5);margin:18px 0 6px}" +
      "#h1nav-drawer a{display:block;padding:9px 0;color:#fff;text-decoration:none;font-size:1rem}" +
      "#h1nav-drawer a:hover{color:#00E6C3}" +
      "#h1nav-drawer .h1nav-cta{margin-top:18px;text-align:center;background:#00E6C3;color:#0A1428;font-weight:600;border-radius:14px;padding:13px}" +
      "@media (min-width:768px){#h1nav-drawer{display:none!important}}";
    document.head.appendChild(css);

    var drawer = document.createElement("div");
    drawer.id = "h1nav-drawer";
    drawer.setAttribute("role", "navigation");
    drawer.setAttribute("aria-label", "Mobile menu");
    var seen = {};
    function addLink(parent, a) {
      var href = a.getAttribute("href");
      var txt = (a.textContent || "").replace(/\s+/g, " ").trim();
      if (!href || !txt || seen[href + txt]) return;
      seen[href + txt] = 1;
      var l = document.createElement("a");
      l.href = href;
      l.textContent = txt;
      if (a.target) { l.target = a.target; l.rel = "noopener"; }
      parent.appendChild(l);
    }
    Array.prototype.forEach.call(desk.children, function (item) {
      var b = item.querySelector("button");
      var links = item.querySelectorAll("a[href]");
      if (b && links.length) {
        var h = document.createElement("h3");
        h.textContent = (b.textContent || "").replace(/\s+/g, " ").trim();
        drawer.appendChild(h);
        Array.prototype.forEach.call(links, function (a) { addLink(drawer, a); });
      } else if (item.tagName === "A") {
        addLink(drawer, item);
      } else {
        Array.prototype.forEach.call(links, function (a) { addLink(drawer, a); });
      }
    });
    var cta = document.createElement("a");
    cta.href = "/contact-us";
    cta.className = "h1nav-cta";
    cta.textContent = "Book Free Demo";
    drawer.appendChild(cta);
    if (getComputedStyle(nav).position === "static") nav.style.position = "relative";
    nav.appendChild(drawer);

    btn.setAttribute("aria-controls", "h1nav-drawer");
    btn.setAttribute("aria-expanded", "false");
    function set(open) {
      drawer.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      set(!drawer.classList.contains("is-open"));
    });
    drawer.addEventListener("click", function (e) {
      if (e.target.closest("a")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) { set(false); btn.focus(); }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
