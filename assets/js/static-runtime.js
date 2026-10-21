/* HelpOne static-page runtime: replaces the few interactive bits React used to
   provide on pages served as plain HTML (no Next.js runtime, no RSC payload).
   Video modal, FAQ accordion, volunteer portal tabs, "HelpOne replaces" calculator. */
(function () {
  var VIDEOS = { header: "E4edyISWMpY", "event-management": "yQnNMijYgdg", "getting-started": "QH8OtYKa_sw", "volunteer-management": "cPIaTTqqDm0", fundraising: "beMQOK1IQqY" };
  var page = location.pathname.replace(/^\/|\.html$|\/$/g, "") || "index";
  var modal, lastFocus;
  function openVideo(id) {
    lastFocus = document.activeElement;
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "h1v"; modal.setAttribute("role", "dialog"); modal.setAttribute("aria-modal", "true"); modal.setAttribute("aria-label", "Product video");
      modal.innerHTML = '<button type="button" class="h1v-x" aria-label="Close video">&times;</button><div class="h1v-in"></div>';
      document.body.appendChild(modal);
      modal.addEventListener("click", function (e) { if (e.target === modal || e.target.closest(".h1v-x")) closeVideo(); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && modal && !modal.hidden) closeVideo(); });
    }
    modal.querySelector(".h1v-in").innerHTML = '<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0" title="HelpOne video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    modal.hidden = false;
    modal.querySelector(".h1v-x").focus();
  }
  function closeVideo() { modal.hidden = true; modal.querySelector(".h1v-in").innerHTML = ""; if (lastFocus) lastFocus.focus(); }
  document.addEventListener("click", function (e) {
    var el = e.target.closest("button, a");
    if (!el) return;
    var t = (el.textContent || "").replace(/\s+/g, " ").trim();
    var href = el.tagName === "A" ? el.getAttribute("href") || "" : "";
    var isVid = (el.tagName === "BUTTON" && /^Watch .*(video|Overview)/i.test(t)) || href === "/#video" || href === "#video";
    if (!isVid) return;
    e.preventDefault();
    var inNav = !!el.closest("nav, #h1nav-drawer, #mobile-menu");
    openVideo(!inNav && el.tagName === "BUTTON" && VIDEOS[page] ? VIDEOS[page] : VIDEOS.header);
  });

  function faq() {
    var items = document.querySelectorAll("main .max-h-0");
    Array.prototype.forEach.call(items, function (ans, i) {
      var btn = ans.previousElementSibling;
      if (!btn || btn.tagName !== "BUTTON" || btn.dataset.h1faq) return;
      btn.dataset.h1faq = "1";
      ans.id = ans.id || "h1faq-a" + i;
      btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", ans.id);
      ans.style.transition = "max-height .3s ease, opacity .25s ease";
      var icon = btn.querySelector("svg");
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        ans.style.maxHeight = open ? ans.scrollHeight + 40 + "px" : "";
        ans.style.opacity = open ? "1" : "";
        if (icon) { icon.style.transition = "transform .2s"; icon.style.transform = open ? "rotate(45deg)" : ""; }
        var card = btn.parentNode; if (card) card.style.borderColor = open ? "rgba(0,230,195,.45)" : "";
      });
    });
  }

  function tabs() {
    var data = window.H1_PORTAL_TABS;
    if (!data) return;
    var bar = document.querySelector("[data-h1tabs]");
    var pane = document.querySelector("[data-h1pane]");
    if (!bar || !pane) return;
    var btns = bar.querySelectorAll("button");
    var on = "shrink-0 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all bg-[#00E6C3]/20 border-[#00E6C3] text-[#00E6C3] shadow-lg shadow-[#00E6C3]/20";
    var off = "shrink-0 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all border-white/10 text-white/70 hover:bg-white/5 hover:text-white";
    bar.setAttribute("role", "tablist");
    Array.prototype.forEach.call(btns, function (b, i) {
      b.setAttribute("role", "tab"); b.setAttribute("aria-selected", i === 0 ? "true" : "false");
      b.addEventListener("click", function () {
        var d = data[i]; if (!d) return;
        Array.prototype.forEach.call(btns, function (x, j) { x.className = j === i ? on : off; x.setAttribute("aria-selected", j === i ? "true" : "false"); });
        pane.querySelector("[data-h1pane-title]").textContent = d.title;
        pane.querySelector("[data-h1pane-media]").innerHTML = d.media;
        pane.querySelector("[data-h1pane-desc]").textContent = d.description;
        pane.querySelector("[data-h1pane-out]").textContent = d.outcome;
        var lbl = document.querySelector("[data-h1pane-label]"); if (lbl) lbl.textContent = "Volunteer Portal — " + d.title;
      });
    });
  }

  function replacesCalc() {
    var el = document.getElementById("h1rcalc");
    if (!el || el.dataset.ready) return;
    el.dataset.ready = "1";
    var rows = [["Volunteer management", 175], ["Donor CRM & online donations", 250], ["Events & registration", 115], ["HR & onboarding", 175], ["E-signatures", 60], ["Scheduling & calendar", 30], ["Timesheets", 60], ["IT asset tracking", 60], ["Background-check ordering", 25], ["Email & text outreach", 90]];
    var list = el.querySelector(".h1r-rows");
    list.innerHTML = rows.map(function (r, i) {
      return '<label class="h1r-row"><input type="checkbox" data-i="' + i + '" checked> <span class="h1r-lbl">' + r[0].replace("&", "&amp;") + '</span><span class="h1r-dollar">$<input type="number" min="0" step="1" inputmode="numeric" value="' + r[1] + '" data-v="' + i + '" aria-label="' + r[0].replace("&", "&amp;") + ' monthly cost"></span></label>';
    }).join("");
    function fmt(n) { return "$" + Math.round(n).toLocaleString("en-US"); }
    function calc() {
      var t = 0;
      rows.forEach(function (r, i) {
        if (el.querySelector('[data-i="' + i + '"]').checked) t += Math.max(0, Number(el.querySelector('[data-v="' + i + '"]').value) || 0);
      });
      var s = Math.max(0, t - 299);
      el.querySelector("[data-o=now]").textContent = fmt(t) + " a month";
      el.querySelector("[data-o=save]").textContent = fmt(s) + " a month, " + fmt(s * 12) + " a year";
    }
    el.addEventListener("input", calc); el.addEventListener("change", calc);
    calc();
  }

  function faqSearch() {
    var input = document.querySelector('main input[placeholder^="Search questions"]');
    if (!input) return;
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      var cards = document.querySelectorAll("main .max-h-0");
      Array.prototype.forEach.call(cards, function (ans) {
        var card = ans.parentNode;
        card.style.display = !q || card.textContent.toLowerCase().indexOf(q) > -1 ? "" : "none";
      });
      Array.prototype.forEach.call(document.querySelectorAll("main h2"), function (h) {
        var list = h.nextElementSibling;
        if (!list || !list.querySelector(".max-h-0")) return;
        var any = Array.prototype.some.call(list.children, function (c) { return c.style.display !== "none"; });
        (h.parentNode.children.length <= 3 ? h.parentNode : h).style.display = any ? "" : "none";
        list.style.display = any ? "" : "none";
      });
    });
  }

  function priceToggles() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-h1price]"), function (box) {
      if (box.dataset.ready) return; box.dataset.ready = "1";
      var amt = box.querySelector("[data-h1amt]"), alt = box.querySelector("[data-h1alt]");
      var small = amt.firstElementChild ? amt.firstElementChild.tagName.toLowerCase() : "small";
      var btns = box.querySelectorAll(".h1b-toggle button");
      Array.prototype.forEach.call(btns, function (b) {
        b.addEventListener("click", function () {
          var yearly = b.getAttribute("data-period") === "yearly";
          Array.prototype.forEach.call(btns, function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
          amt.innerHTML = yearly ? "$2,990<" + small + ">/year</" + small + ">" : "$299<" + small + ">/month</" + small + ">";
          alt.textContent = yearly ? "Two months free: that's $249.17 a month." : "or $2,990/year (two months free)";
        });
      });
    });
  }

  function init() { faq(); faqSearch(); tabs(); replacesCalc(); priceToggles(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
