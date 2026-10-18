/* Footer links for the pages that still run Next.js (/contact-us, 404): "White label",
   "Start free trial", "Log in", and social icons (YouTube / LinkedIn / Instagram).
   The header on those pages comes from site-header.js.
   Static pages have all of this in their HTML already; this is a no-op there. Never edits self.__next_f. */
(function () {
  var TRIAL = "https://app.helponesoftware.com/demo", LOGIN = "https://app.helponesoftware.com";
  var SOCIAL =
    '<div class="mt-6 flex items-center gap-4">' +
    '<a href="https://www.youtube.com/@HelpOneSoftware" target="_blank" rel="noopener noreferrer" aria-label="HelpOne on YouTube" class="text-white/60 hover:text-[#00E6C3] transition-colors text-xl"><i class="fab fa-youtube" aria-hidden="true"></i></a>' +
    '<a href="https://www.linkedin.com/company/helpone-software" target="_blank" rel="noopener noreferrer" aria-label="HelpOne on LinkedIn" class="text-white/60 hover:text-[#00E6C3] transition-colors text-xl"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a>' +
    '<a href="https://www.instagram.com/helponesoftware/" target="_blank" rel="noopener noreferrer" aria-label="HelpOne on Instagram" class="text-white/60 hover:text-[#00E6C3] transition-colors text-xl">' +
    '<svg aria-hidden="true" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" style="display:inline-block;vertical-align:-0.125em">' +
    '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>' +
    '</svg></a></div>';
  function el(tag, cls, href, txt, style) {
    var a = document.createElement(tag); if (cls) a.className = cls; a.href = href; a.textContent = txt; if (style) a.setAttribute("style", style); return a;
  }
  function socials(foot) {
    if (foot.querySelector('a[aria-label="HelpOne on Instagram"]')) return;
    if (foot.querySelector('a[aria-label="HelpOne on YouTube"]') && !foot.querySelector('a[aria-label="HelpOne on Instagram"]')) {
      var yt = foot.querySelector('a[aria-label="HelpOne on YouTube"]');
      var row = yt && yt.parentNode;
      if (row) {
        row.insertAdjacentHTML("beforeend",
          '<a href="https://www.instagram.com/helponesoftware/" target="_blank" rel="noopener noreferrer" aria-label="HelpOne on Instagram" class="text-white/60 hover:text-[#00E6C3] transition-colors text-xl">' +
          '<svg aria-hidden="true" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" style="display:inline-block;vertical-align:-0.125em">' +
          '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>' +
          '</svg></a>');
        return;
      }
    }
    var trust = foot.querySelector(".h1f-trust");
    var tag = null;
    var ps = foot.querySelectorAll("p");
    for (var i = 0; i < ps.length; i++) {
      if (/All-in-one nonprofit software|operating system for world-changing/.test(ps[i].textContent)) { tag = ps[i]; break; }
    }
    var anchor = trust || tag;
    if (!anchor) return;
    var copy = null;
    var divs = foot.querySelectorAll("div");
    for (var j = 0; j < divs.length; j++) {
      if (/©/.test(divs[j].textContent) && divs[j].children.length === 0) { copy = divs[j]; break; }
    }
    if (copy && copy.parentNode === anchor.parentNode) {
      copy.insertAdjacentHTML("beforebegin", SOCIAL);
    } else {
      anchor.insertAdjacentHTML("afterend", SOCIAL);
    }
  }
  function apply() {
    var foot = document.querySelector("footer");
    if (!foot) return;
    socials(foot);
    if (!foot.querySelector('a[href="/white-label"]')) {
      var p = foot.querySelector('a[href="/partners"]');
      if (p) p.parentNode.insertBefore(el("a", p.className, "/white-label", "White label"), p.nextSibling);
    }
    if (!foot.querySelector('a[href="' + TRIAL + '"]')) {
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
