/**
 * HelpOne marketing trust/conversion fixes (post-hydration DOM only).
 * Never edits self.__next_f / RSC flight. Survives React #418 reverts via delayed re-apply.
 */
(function () {
  var HERO_LOCAL = "/assets/images/hero-bg.webp";
  var HERO_FALLBACK = "/assets/images/hero-bg.jpg";
  var YT = "https://www.youtube.com/@HelpOneSoftware";
  var FOREVER_RE = /Claim Founders Rate\s*[–—-]\s*\$499\/mo forever/i;
  var FOREVER_NEW = "Claim Founders Rate – $499/mo for 12 months";
  var SOC_BUILT = /HelpOne is built to meet SOC 2 Type II and PCI Level 1 standards\. Compliance documentation is available upon request\./i;
  var SOC_NEW =
    "HelpOne is SOC 2 Type II certified and built to meet PCI Level 1 standards. Compliance documentation is available upon request.";
  var TIER_OLD =
    /All plans include the full unlimited feature set\. Tiers differ only in support level: Founders gets standard support, Growth adds guided onboarding and priority email, Scale adds a dedicated account manager, phone\/video support, and full white-label branding\./i;
  var TIER_NEW =
    "All plans include the full unlimited feature set. Founders ($499/mo locked for 12 months) includes 1-on-1 onboarding, priority support, and free migration. Growth ($599/mo after Founders) includes guided onboarding (2–3 hours) and standard support. Scale (custom quote) adds dedicated priority phone & video support, full white-label branding, and custom development.";

  function textNodesUnder(el) {
    var out = [];
    if (!el) return out;
    var walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = walk.nextNode())) out.push(n);
    return out;
  }

  function replaceInTextNodes(root, re, replacement) {
    var nodes = textNodesUnder(root || document.body);
    for (var i = 0; i < nodes.length; i++) {
      var t = nodes[i].nodeValue;
      if (!t || !re.test(t)) continue;
      nodes[i].nodeValue = t.replace(re, replacement);
    }
  }

  function patchForeverCtas() {
    var links = document.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var tx = (a.textContent || "").replace(/\s+/g, " ").trim();
      if (FOREVER_RE.test(tx)) {
        a.textContent = FOREVER_NEW;
      } else if (/\$499\/mo forever/i.test(tx)) {
        a.textContent = tx.replace(/\$499\/mo forever/gi, "$499/mo for 12 months");
      }
    }
    replaceInTextNodes(document.body, /\$499\/mo forever/gi, "$499/mo for 12 months");
  }

  function patchSocCopy() {
    replaceInTextNodes(document.body, SOC_BUILT, SOC_NEW);
    replaceInTextNodes(document.body, /\bSOC II\b/g, "SOC 2");
    // JSON-LD FAQ in head
    var scripts = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < scripts.length; i++) {
      var raw = scripts[i].textContent || "";
      if (!raw) continue;
      var next = raw;
      if (SOC_BUILT.test(next)) next = next.replace(SOC_BUILT, SOC_NEW);
      if (TIER_OLD.test(next)) next = next.replace(TIER_OLD, TIER_NEW);
      if (/\bSOC II\b/.test(next)) next = next.replace(/\bSOC II\b/g, "SOC 2");
      if (/9 modules/i.test(next)) next = next.replace(/9 modules/gi, "10 modules");
      if (next !== raw) scripts[i].textContent = next;
    }
  }

  function patchFaqTierAndModules() {
    replaceInTextNodes(document.body, TIER_OLD, TIER_NEW);
    replaceInTextNodes(
      document.body,
      /9 modules in one login/gi,
      "10 modules in one login"
    );
    replaceInTextNodes(document.body, /All 9 modules included/gi, "All 10 modules included");
    replaceInTextNodes(document.body, /All 9 core modules included/gi, "All 10 core modules included");
    replaceInTextNodes(document.body, /\b9 core modules\b/gi, "10 core modules");
  }

  function patchHeroBackground() {
    var nodes = document.querySelectorAll("[style*='picsum'], [style*='background']");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var st = el.getAttribute("style") || "";
      if (/picsum\.photos/i.test(st)) {
        el.style.backgroundImage = 'url("' + HERO_LOCAL + '")';
      }
    }
    // Also computed styles / React may set via cssText
    var all = document.querySelectorAll("div, section, header");
    for (var j = 0; j < all.length; j++) {
      var bg = "";
      try {
        bg = all[j].style && all[j].style.backgroundImage;
      } catch (e) {}
      if (bg && /picsum\.photos/i.test(bg)) {
        all[j].style.backgroundImage = 'url("' + HERO_LOCAL + '")';
      }
    }
  }

  function patchVideoLinks() {
    var as = document.querySelectorAll('a[href="/#video"], a[href="#video"]');
    for (var i = 0; i < as.length; i++) {
      as[i].setAttribute("href", YT);
      as[i].setAttribute("target", "_blank");
      as[i].setAttribute("rel", "noopener noreferrer");
      var label = (as[i].textContent || "").replace(/\s+/g, " ").trim();
      if (/watch/i.test(label)) {
        as[i].setAttribute("aria-label", "Watch HelpOne videos on YouTube");
      }
    }
    // Bare "Watch 2-min video" buttons (no href) → link to YouTube
    var buttons = document.querySelectorAll("button");
    for (var b = 0; b < buttons.length; b++) {
      var bt = (buttons[b].textContent || "").replace(/\s+/g, " ").trim();
      if (!/Watch 2-?min video/i.test(bt)) continue;
      if (buttons[b].getAttribute("data-helpone-video-fixed")) continue;
      var a = document.createElement("a");
      a.href = YT;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = buttons[b].className;
      a.innerHTML = buttons[b].innerHTML;
      a.setAttribute("data-helpone-video-fixed", "1");
      buttons[b].parentNode.replaceChild(a, buttons[b]);
    }
  }

  function patchContactDualH1() {
    var path = (location.pathname || "").replace(/\.html$/, "");
    if (path !== "/contact-us" && path !== "/contact-us/") return;
    var h1s = document.querySelectorAll("h1");
    if (h1s.length < 2) return;
    for (var i = 1; i < h1s.length; i++) {
      var t = (h1s[i].textContent || "").replace(/\s+/g, " ").trim();
      if (/Send us a message/i.test(t)) {
        var h2 = document.createElement("h2");
        h2.className = h1s[i].className;
        h2.innerHTML = h1s[i].innerHTML;
        h1s[i].parentNode.replaceChild(h2, h1s[i]);
        break;
      }
    }
  }

  function ensureModulesHeadingTen() {
    var headings = document.querySelectorAll("h2");
    for (var i = 0; i < headings.length; i++) {
      var ht = (headings[i].textContent || "").replace(/\s+/g, " ").trim();
      if (/Powerful Modules/i.test(ht) && /platform/i.test(ht)) {
        // Honest live count with Board Management card = 10
        headings[i].innerHTML = "10 Powerful Modules.<br/>One breathtaking platform.";
        break;
      }
    }
  }

  function ensureMidPageDemoCta() {
    // Low-risk: only on long solution pages that lack a mid-page Book demo and have a founders CTA area
    var path = (location.pathname || "").replace(/\.html$/, "") || "/";
    var longPages = {
      "/fundraising": 1,
      "/volunteer-management": 1,
      "/hr-solutions": 1,
      "/event-management": 1,
      "/donors-and-contacts": 1,
      "/finances": 1,
      "/training-tracking": 1,
      "/policies-and-procedures": 1,
      "/payments": 1,
      "/board-management": 1
    };
    if (!longPages[path]) return;
    if (document.getElementById("helpone-mid-demo-cta")) return;

    var foreverOrFounders = null;
    var links = document.querySelectorAll("a[href='/contact-us'], a[href='/pricing']");
    for (var i = 0; i < links.length; i++) {
      var tx = (links[i].textContent || "").replace(/\s+/g, " ").trim();
      if (/Founders Rate/i.test(tx) || /\$499/i.test(tx)) {
        foreverOrFounders = links[i];
        break;
      }
    }
    // Prefer inserting before the founders CTA section
    var anchor = foreverOrFounders
      ? foreverOrFounders.closest("section") || foreverOrFounders.closest("div")
      : null;
    if (!anchor || !anchor.parentNode) {
      var sections = document.querySelectorAll("main section");
      if (sections.length >= 3) anchor = sections[Math.floor(sections.length / 2)];
    }
    if (!anchor || !anchor.parentNode) return;

    var wrap = document.createElement("div");
    wrap.id = "helpone-mid-demo-cta";
    wrap.className =
      "max-w-screen-2xl mx-auto px-4 md:px-6 py-8 md:py-10 flex flex-col sm:flex-row items-center justify-center gap-4";
    wrap.innerHTML =
      '<p class="text-white/80 text-center text-base md:text-lg m-0">See HelpOne on your workflows.</p>' +
      '<a href="/contact-us" class="px-8 py-4 bg-[#00E6C3] hover:bg-white text-[#0A1428] text-base font-semibold rounded-2xl [text-decoration:none] transition-colors" aria-label="Book a free demo">Book a free demo →</a>';
    anchor.parentNode.insertBefore(wrap, anchor);
  }

  function applyAll() {
    try {
      patchForeverCtas();
      patchSocCopy();
      patchFaqTierAndModules();
      patchHeroBackground();
      patchVideoLinks();
      patchContactDualH1();
      ensureModulesHeadingTen();
      ensureMidPageDemoCta();
    } catch (err) {
      console.warn("HelpOne marketing perfect patch skipped", err);
    }
  }

  function run() {
    applyAll();
    setTimeout(applyAll, 250);
    setTimeout(applyAll, 1000);
    setTimeout(applyAll, 2000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
    window.addEventListener("load", run);
  } else {
    run();
    window.addEventListener("load", run);
  }
})();
