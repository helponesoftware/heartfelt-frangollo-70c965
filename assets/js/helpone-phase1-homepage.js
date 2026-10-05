/**
 * HelpOne Phase-1 homepage emotional copy (DOM only).
 * Survives Next.js static-export hydration / React #418 by re-applying after load.
 * Never edits self.__next_f / RSC flight.
 *
 * Source: HOMEPAGE_INCORPORATION.md E ship-first + Option 1 hero;
 * strings merged in helponesoftware/helponesoftware PR #1 (abe65589).
 *
 * Overrides PR #38 SEO H1 ("All-in-One Nonprofit Software…") back to
 * Edward-approved Phase-1 H1: "One Platform. Unlimited Missions."
 */
(function () {
  var H1_HTML =
    'One Platform.<br/><span class="text-[#00E6C3]">Unlimited Missions.</span>';
  var HERO_SUB =
    "You took this job for the mission, not for eight logins and a Tuesday-night spreadsheet. HelpOne brings volunteers, donors, events, finances and payments into one place, so you can set the weight down.";
  var MICRO =
    "Flat monthly price · Unlimited everything · Payments built in · Free migration";
  var PROBLEM_H2 = "It's 10:40 on a Tuesday. You're still here.";
  var PROBLEM_SUB =
    "Sign-ups in one tool, hours in another, donors in a third, money in QuickBooks, and a spreadsheet that holds it all together that lives with you. None of these tools are bad. They just don't talk to each other, so you do the talking.";
  var GUILT_TEXT = "The guilt belongs to the gap, not to you.";
  var CTA_H2 = "Set it down.";
  var CTA_SUB =
    "Thirty minutes. Show us what you're juggling and we'll show you what it looks like in one place. If it's not a fit, we'll tell you.";
  var CTA_BTN = "Book a free demo";
  var BOARD_DESC =
    "Roster, committees, meetings, documents, votes, COI compliance & board portal.";

  function norm(s) {
    return (s || "").replace(/\s+/g, " ").trim();
  }

  function patchHero() {
    var h1 = document.querySelector("main h1, section.hero-bg h1, h1");
    if (h1) h1.innerHTML = H1_HTML;

    var hero =
      document.querySelector("section.hero-bg") ||
      document.querySelector("main > section");
    if (!hero) return;

    var sub = null;
    var ps = hero.querySelectorAll("p");
    for (var i = 0; i < ps.length; i++) {
      var t = norm(ps[i].textContent);
      if (
        /cheapest way to run your entire nonprofit/i.test(t) ||
        /All-in-one nonprofit software — the simplest way/i.test(t) ||
        /You took this job for the mission/i.test(t) ||
        /simplest way to run your entire mission/i.test(t)
      ) {
        sub = ps[i];
        break;
      }
    }
    // Fallback: first large hero paragraph after H1
    if (!sub) {
      for (var j = 0; j < ps.length; j++) {
        var cls = ps[j].className || "";
        if (/text-xl|text-2xl/.test(cls) && !ps[j].id) {
          sub = ps[j];
          break;
        }
      }
    }
    if (sub) {
      sub.textContent = HERO_SUB;
      if (/\bmb-12\b/.test(sub.className)) {
        sub.className = sub.className.replace(/\bmb-12\b/g, "mb-6");
      } else if (!/\bmb-6\b/.test(sub.className)) {
        sub.className = (sub.className + " mb-6").trim();
      }
    }

    var micro = document.getElementById("helpone-phase1-microline");
    if (!micro) {
      micro = document.createElement("p");
      micro.id = "helpone-phase1-microline";
      micro.setAttribute("data-aos", "fade-up");
      micro.setAttribute("data-aos-delay", "250");
      micro.className =
        "text-sm md:text-base text-white/60 max-w-2xl mb-12 text-left tracking-wide";
      if (sub && sub.parentNode) {
        if (sub.nextSibling) sub.parentNode.insertBefore(micro, sub.nextSibling);
        else sub.parentNode.appendChild(micro);
      }
    }
    micro.textContent = MICRO;
  }

  function patchProblem() {
    var h2s = document.querySelectorAll("main h2, section h2");
    var problemH2 = null;
    for (var i = 0; i < h2s.length; i++) {
      var t = norm(h2s[i].textContent);
      if (
        /problem most nonprofits face/i.test(t) ||
        /10:40 on a Tuesday/i.test(t)
      ) {
        problemH2 = h2s[i];
        break;
      }
    }
    if (!problemH2) return;
    problemH2.textContent = PROBLEM_H2;

    var col = problemH2.parentElement;
    if (col) {
      var sub = document.getElementById("helpone-phase1-problem-sub");
      if (!sub) {
        // Prefer existing sibling p under same column
        var sib = problemH2.nextElementSibling;
        if (sib && sib.tagName === "P") {
          sub = sib;
          sub.id = "helpone-phase1-problem-sub";
        } else {
          sub = document.createElement("p");
          sub.id = "helpone-phase1-problem-sub";
          sub.className =
            "text-white/70 mt-6 text-base md:text-lg leading-relaxed";
          if (problemH2.nextSibling)
            col.insertBefore(sub, problemH2.nextSibling);
          else col.appendChild(sub);
        }
      }
      // Keep "you" italicized like source
      sub.innerHTML =
        "Sign-ups in one tool, hours in another, donors in a third, money in QuickBooks, and a spreadsheet that holds it all together that lives with <em>you</em>. None of these tools are bad. They just don't talk to each other, so you do the talking.";
    }

    // Closing guilt line under the 8+/∞/$ cards
    var section = problemH2.closest("section");
    if (!section) return;
    var guilt = document.getElementById("helpone-phase1-guilt");
    if (!guilt) {
      guilt = document.createElement("p");
      guilt.id = "helpone-phase1-guilt";
      guilt.setAttribute("data-aos", "fade-up");
      guilt.className =
        "mt-10 md:mt-12 text-center text-white/80 text-base md:text-lg";
      var a = document.createElement("a");
      a.href = "/back-to-mission";
      a.className =
        "hover:text-[#00E6C3] transition-colors underline-offset-4 hover:underline";
      a.textContent = GUILT_TEXT;
      guilt.appendChild(a);
      var inner = section.querySelector(".max-w-screen-2xl") || section;
      inner.appendChild(guilt);
    } else {
      var link = guilt.querySelector("a") || guilt;
      if (link.tagName === "A") {
        link.setAttribute("href", "/back-to-mission");
        link.textContent = GUILT_TEXT;
      } else {
        guilt.textContent = GUILT_TEXT;
      }
    }
  }

  function patchFinalCta() {
    var ctaH2 = null;
    var h2s = document.querySelectorAll("h2");
    for (var i = 0; i < h2s.length; i++) {
      var t = norm(h2s[i].textContent);
      if (
        /Ready to see if HelpOne is a fit/i.test(t) ||
        /^Set it down\.?$/i.test(t)
      ) {
        ctaH2 = h2s[i];
        break;
      }
    }
    if (!ctaH2) return;
    ctaH2.textContent = CTA_H2;

    var wrap = ctaH2.parentElement;
    if (!wrap) return;
    var p = wrap.querySelector("p");
    if (p) p.textContent = CTA_SUB;

    var btn = wrap.querySelector('a[href="/contact-us"]');
    if (btn) {
      btn.textContent = CTA_BTN;
      btn.setAttribute("aria-label", CTA_BTN);
    }
  }

  function ensureBoardCard() {
    var headings = document.querySelectorAll("h2");
    for (var i = 0; i < headings.length; i++) {
      var ht = norm(headings[i].textContent);
      if (/Powerful Modules/.test(ht)) {
        headings[i].innerHTML =
          "10 Powerful Modules.<br/>One breathtaking platform.";
        break;
      }
    }

    var existing = document.querySelectorAll("h3");
    for (var e = 0; e < existing.length; e++) {
      if (norm(existing[e].textContent) === "Board Management") {
        var card = existing[e].closest(".module-card");
        if (card) {
          var link = card.querySelector("a[href]");
          if (link) link.setAttribute("href", "/board-management");
          var desc = card.querySelector("p");
          if (desc) desc.textContent = BOARD_DESC;
        }
        return;
      }
    }

    var participant = null;
    for (var j = 0; j < existing.length; j++) {
      if (norm(existing[j].textContent) === "Participant Breakdown") {
        participant = existing[j];
        break;
      }
    }
    if (!participant) return;
    var base = participant.closest(".module-card");
    if (!base || !base.parentNode) return;
    if (document.getElementById("helpone-phase1-board-card")) return;

    var div = document.createElement("div");
    div.id = "helpone-phase1-board-card";
    div.className =
      "module-card bg-white/5 rounded-3xl overflow-hidden board-mgmt-center";
    div.setAttribute("data-aos", "fade-up");
    div.setAttribute("data-aos-delay", "450");
    div.innerHTML =
      '<div class="h-2 bg-indigo-500"></div>' +
      '<div class="p-5 md:p-8">' +
      '<div class="text-4xl md:text-5xl mb-4 md:mb-6">🏛️</div>' +
      '<h3 class="text-xl md:text-2xl font-semibold mb-2 md:mb-3">Board Management</h3>' +
      '<p class="text-white/70 text-sm leading-relaxed">' +
      BOARD_DESC +
      "</p>" +
      '<a class="mt-5 md:mt-8 inline-flex items-center text-[#00E6C3] text-sm font-medium hover:underline" href="/board-management">Explore →</a>' +
      "</div>";
    // Insert after Fundraising card when possible (source order), else after Participant
    var fund = null;
    for (var k = 0; k < existing.length; k++) {
      if (norm(existing[k].textContent) === "Fundraising") {
        fund = existing[k].closest(".module-card");
        break;
      }
    }
    if (fund && fund.parentNode === base.parentNode && fund.nextSibling) {
      base.parentNode.insertBefore(div, fund.nextSibling);
    } else {
      base.parentNode.appendChild(div);
    }
  }

  function applyPhase1() {
    try {
      patchHero();
      patchProblem();
      patchFinalCta();
      ensureBoardCard();
    } catch (err) {
      console.warn("HelpOne Phase-1 hydrate patch skipped", err);
    }
  }

  function run() {
    applyPhase1();
    setTimeout(applyPhase1, 250);
    setTimeout(applyPhase1, 1000);
    setTimeout(applyPhase1, 2000);
    // After PR #38 SEO script's last 2000ms tick so Phase-1 H1 wins
    setTimeout(applyPhase1, 2500);
    setTimeout(applyPhase1, 4000);
  }

  if (document.readyState === "complete") run();
  else window.addEventListener("load", run);
})();
