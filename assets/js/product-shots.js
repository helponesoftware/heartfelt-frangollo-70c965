/**
 * Swap old module screenshots for the new framed product shots.
 * Static HTML already has the new markup; this re-applies after Next.js
 * hydration if React re-renders an old <img>. Never touches self.__next_f.
 */
(function () {
  var MAP = [
 {
  "p": "volunteer-management",
  "old": "/assets/volunteer-management/Admin Master Dashboard.png",
  "mode": "img",
  "html": "<figure class=\"h1shot\" data-h1shot=\"volunteers\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/volunteers-1440.webp\" srcset=\"/assets/product-shots/volunteers-960.webp 960w, /assets/product-shots/volunteers-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Volunteer review queue with approve and background check buttons\"/><figcaption>Approve new volunteers and start checks in one click.</figcaption></figure>"
 },
 {
  "p": "volunteer-management",
  "old": "/assets/volunteer-management/Background Screening Done Right.png",
  "mode": "img",
  "html": "<figure class=\"h1shot\" data-h1shot=\"screening\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/screening-1440.webp\" srcset=\"/assets/product-shots/screening-960.webp 960w, /assets/product-shots/screening-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Screening pipeline with a queue of volunteers and statuses\"/><figcaption>Background checks tracked from start to clear.</figcaption></figure>"
 },
 {
  "p": "event-management",
  "old": "/_next/static/media/01.35eed40b.png",
  "mode": "img",
  "html": "<figure class=\"h1shot\" data-h1shot=\"event-registration\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/event-registration-1440.webp\" srcset=\"/assets/product-shots/event-registration-960.webp 960w, /assets/product-shots/event-registration-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Public event page with ticket choices and a reserve button\"/><figcaption>A simple public page to buy tickets. No account needed.</figcaption></figure>"
 },
 {
  "p": "event-management",
  "old": "/_next/static/media/03.a01384eb.png",
  "mode": "img",
  "html": "<figure class=\"h1shot\" data-h1shot=\"events\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/events-1440.webp\" srcset=\"/assets/product-shots/events-960.webp 960w, /assets/product-shots/events-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Events dashboard with raised, expenses and net totals\"/><figcaption>What each event raised, spent and netted.</figcaption></figure>"
 },
 {
  "p": "fundraising",
  "old": "/_next/static/media/02.e9fd2c4d.png",
  "mode": "img",
  "html": "<figure class=\"h1shot\" data-h1shot=\"donations\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/donations-1440.webp\" srcset=\"/assets/product-shots/donations-960.webp 960w, /assets/product-shots/donations-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Gifts list with donor names, amounts and restriction labels\"/><figcaption>Every gift, with its restriction, in one list.</figcaption></figure>"
 },
 {
  "p": "board-management",
  "old": "/assets/board-management/committees.png",
  "mode": "figure",
  "html": "<figure class=\"h1shot\" data-h1shot=\"board\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/board-1440.webp\" srcset=\"/assets/product-shots/board-960.webp 960w, /assets/product-shots/board-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Board member list with term tags beside a member record\"/><figcaption>Terms, roles and committees for every director.</figcaption></figure>"
 },
 {
  "p": "board-management",
  "old": "/assets/board-management/votes.png",
  "mode": "figure",
  "html": "<figure class=\"h1shot\" data-h1shot=\"board-votes\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/board-votes-1440.webp\" srcset=\"/assets/product-shots/board-votes-960.webp 960w, /assets/product-shots/board-votes-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Board vote with a results bar and a ballot table\"/><figcaption>Votes with quorum and results, live.</figcaption></figure>"
 },
 {
  "p": "donors-and-contacts",
  "old": "/_next/static/media/Centralized Contact & Company Management.da8b70e4.png",
  "mode": "img",
  "html": "<figure class=\"h1shot\" data-h1shot=\"contacts\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/contacts-1440.webp\" srcset=\"/assets/product-shots/contacts-960.webp 960w, /assets/product-shots/contacts-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Contact list with avatars beside a contact record and follow-up panel\"/><figcaption>Every donor and partner on one page, with calls, texts and follow-ups.</figcaption></figure>"
 },
 {
  "p": "donors-and-contacts",
  "old": "/_next/static/media/Effortless Donation Tracking.a87c4904.png",
  "mode": "img",
  "html": "<figure class=\"h1shot\" data-h1shot=\"donations\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/donations-1440.webp\" srcset=\"/assets/product-shots/donations-960.webp 960w, /assets/product-shots/donations-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Gifts list with donor names, amounts and restriction labels\"/><figcaption>Every gift, with its restriction, in one list.</figcaption></figure>"
 },
 {
  "p": "finances",
  "old": "/_next/static/media/01.6ca4c05c.png",
  "mode": "img",
  "html": "<figure class=\"h1shot\" data-h1shot=\"finance\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/finance-1440.webp\" srcset=\"/assets/product-shots/finance-960.webp 960w, /assets/product-shots/finance-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Finance books page with three net asset totals, a donut chart and monthly gift bars\"/><figcaption>Net assets and giving by month, straight from the books.</figcaption></figure>"
 },
 {
  "p": "finances",
  "old": "/_next/static/media/02.4d0ab624.png",
  "mode": "img",
  "html": "<figure class=\"h1shot\" data-h1shot=\"compliance\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/compliance-1440.webp\" srcset=\"/assets/product-shots/compliance-960.webp 960w, /assets/product-shots/compliance-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Compliance page with PDF downloads and Form 990 and CHAR500 deadlines\"/><figcaption>Filing dates and compliance PDFs in one place.</figcaption></figure>"
 },
 {
  "p": "hr-solutions",
  "old": "/_next/static/media/01.73ecfe16.png",
  "mode": "img",
  "html": "<figure class=\"h1shot\" data-h1shot=\"staff-hr\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/staff-hr-1440.webp\" srcset=\"/assets/product-shots/staff-hr-960.webp 960w, /assets/product-shots/staff-hr-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"People and HR overview with bar charts\"/><figcaption>Your team by schedule, department and status.</figcaption></figure>"
 },
 {
  "p": "hr-solutions",
  "old": "/_next/static/media/03.ff19ce76.png",
  "mode": "img",
  "html": "<figure class=\"h1shot\" data-h1shot=\"timesheets\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/timesheets-1440.webp\" srcset=\"/assets/product-shots/timesheets-960.webp 960w, /assets/product-shots/timesheets-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Weekly timesheet form beside submitted entries\"/><figcaption>Log hours in seconds and send them for approval.</figcaption></figure>"
 },
 {
  "p": "my-helpone",
  "old": "/assets/otherfiles/myHelpOne.png",
  "mode": "fill",
  "html": "<figure class=\"h1shot\" data-h1shot=\"dashboard\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/dashboard-1440.webp\" srcset=\"/assets/product-shots/dashboard-960.webp 960w, /assets/product-shots/dashboard-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"HelpOne dashboard with a greeting, task and approval tabs, upcoming events and days off\"/><figcaption>Your day at a glance: tasks, approvals, time off and what's coming up.</figcaption></figure>"
 }
];
  var page = location.pathname.replace(/^\/|\.html$|\/$/g, "");
  function apply() {
    MAP.forEach(function (m) {
      if (m.p !== page) return;
      var imgs = document.querySelectorAll("img");
      for (var i = 0; i < imgs.length; i++) {
        var src = decodeURIComponent(imgs[i].getAttribute("src") || "");
        if (src !== m.old) continue;
        var target = imgs[i];
        if (m.mode === "figure") target = imgs[i].closest("figure") || target;
        if (m.mode === "fill") target = imgs[i].closest(".aspect-video") || target;
        var w = document.createElement("div");
        w.innerHTML = m.mode === "fill" ? '<div class="max-w-[1100px] mx-auto mb-8">' + m.html + "</div>" : m.html;
        target.parentNode.replaceChild(w.firstChild, target);
      }
    });
  }
  function run() { apply(); [250, 1000, 2000, 4000].forEach(function (t) { setTimeout(apply, t); }); }
  if (document.readyState === "complete") run(); else window.addEventListener("load", run);
})();
