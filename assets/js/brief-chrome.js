/* Footer links for the pages that still run Next.js (/contact-us, 404): "White label",
   "Start free trial" and "Log in". The header on those pages comes from site-header.js.
   Static pages have all of this in their HTML already; this is a no-op there. Never edits self.__next_f. */
(function () {
  var TRIAL = "https://app.helponesoftware.com/demo", LOGIN = "https://app.helponesoftware.com";
  function el(tag, cls, href, txt, style) {
    var a = document.createElement(tag); if (cls) a.className = cls; a.href = href; a.textContent = txt; if (style) a.setAttribute("style", style); return a;
  }
  function apply() {
    var foot = document.querySelector("footer");
    if (foot && !foot.querySelector('a[href="/white-label"]')) {
      var p = foot.querySelector('a[href="/partners"]');
      if (p) p.parentNode.insertBefore(el("a", p.className, "/white-label", "White label"), p.nextSibling);
    }
    if (foot && !foot.querySelector('a[href="' + TRIAL + '"]')) {
      var bd = Array.prototype.filter.call(foot.querySelectorAll('a[href="/contact-us"]'), function (a) { return /Book a Free Demo/.test(a.textContent); })[0];
      if (bd) {
        var t = el("a", bd.className, TRIAL, "Start free trial", "margin-top:12px;background:#00E6C3;color:#0A1428;border-color:#00E6C3");
        var l = el("a", "text-sm text-white/70", LOGIN, "Log in", "display:block;margin-top:14px;text-align:center");
        bd.parentNode.insertBefore(l, bd.nextSibling); bd.parentNode.insertBefore(t, bd.nextSibling);
      }
    }
  }
  var q = false;
  function queue() { if (!q) { q = true; setTimeout(function () { q = false; apply(); }, 60); } }
  function start() { apply(); new MutationObserver(queue).observe(document.body, { childList: true, subtree: true }); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
