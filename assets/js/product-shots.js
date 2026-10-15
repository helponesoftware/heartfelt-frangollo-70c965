/**
 * Swap old module screenshots for the new framed product shots.
 * Static HTML already has the new markup; this re-applies after Next.js
 * hydration if React re-renders an old <img>. Never touches self.__next_f.
 */
(function () {
  var MAP = [
 {
  "p": "volunteer-management",
  "old": "/assets/volunteer-management/Self-Service Portal - small.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--teaser\" data-h1shot=\"myhelpone-volunteer\" data-full-alt=\"Volunteer portal home with next shift, impact numbers and to-dos\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/myhelpone-volunteer-teaser.webp\" width=\"1165\" height=\"380\" loading=\"lazy\" decoding=\"async\" alt=\"Volunteer home cards with next shift, impact hours and profile progress\"/><figcaption>Hours and next steps</figcaption></figure>"
 },
 {
  "p": "volunteer-management",
  "old": "/assets/volunteer-management/Smart Availability.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--teaser\" data-h1shot=\"volunteer-shifts\" data-full-alt=\"Shift list with assigned volunteer avatars and an assign picker\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/volunteer-shifts-teaser.webp\" width=\"885\" height=\"365\" loading=\"lazy\" decoding=\"async\" alt=\"Two shifts with fill counts, an assigned volunteer and an assign picker\"/><figcaption>Fill shifts and see who's on</figcaption></figure>"
 },
 {
  "p": "volunteer-management",
  "old": "/assets/volunteer-management/Admin Master Dashboard.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--teaser\" data-h1shot=\"volunteers\" data-full-alt=\"Volunteer review queue with approve and background check buttons\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/volunteers-teaser.webp\" width=\"1158\" height=\"370\" loading=\"lazy\" decoding=\"async\" alt=\"Three volunteer sign-ups with approve and background check buttons\"/><figcaption>Approve volunteers in one click</figcaption></figure>"
 },
 {
  "p": "volunteer-management",
  "old": "/assets/volunteer-management/Background Screening Done Right.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--teaser\" data-h1shot=\"screening\" data-full-alt=\"Screening pipeline with a queue of volunteers and statuses\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/screening-teaser.webp\" width=\"1165\" height=\"400\" loading=\"lazy\" decoding=\"async\" alt=\"Screening totals above a queue of volunteers with status and actions\"/><figcaption>Every background check, tracked</figcaption></figure>"
 },
 {
  "p": "event-management",
  "old": "/_next/static/media/01.35eed40b.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--teaser\" data-h1shot=\"event-registration\" data-full-alt=\"Public event page with ticket choices and a reserve button\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/event-registration-teaser.webp\" width=\"800\" height=\"952\" loading=\"lazy\" decoding=\"async\" alt=\"Ticket choices with quantity steppers and a green reserve button\"/><figcaption>Pick tickets, then reserve</figcaption></figure>"
 },
 {
  "p": "event-management",
  "old": "/_next/static/media/02.da8b93ec.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--teaser\" data-h1shot=\"volunteer-shifts\" data-full-alt=\"Shift list with assigned volunteer avatars and an assign picker\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/volunteer-shifts-teaser.webp\" width=\"885\" height=\"365\" loading=\"lazy\" decoding=\"async\" alt=\"Two shifts with fill counts, an assigned volunteer and an assign picker\"/><figcaption>Fill shifts and see who's on</figcaption></figure>"
 },
 {
  "p": "event-management",
  "old": "/_next/static/media/03.a01384eb.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--teaser\" data-h1shot=\"events\" data-full-alt=\"Events dashboard with raised, expenses and net totals\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/events-teaser.webp\" width=\"890\" height=\"500\" loading=\"lazy\" decoding=\"async\" alt=\"Event totals above a donut chart of money by source\"/><figcaption>Raised, spent and netted</figcaption></figure>"
 },
 {
  "p": "fundraising",
  "old": "/_next/static/media/02.e9fd2c4d.png",
  "mode": "img",
  "html": "<figure class=\"h1shot\" data-h1shot=\"donations\" data-full-alt=\"Gifts list with donor names, amounts and restriction labels\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/donations-1440.webp\" srcset=\"/assets/product-shots/donations-960.webp 960w, /assets/product-shots/donations-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Gifts list with donor names, amounts and restriction labels\"/><figcaption>Every gift, with its restriction, in one list.</figcaption></figure>"
 },
 {
  "p": "board-management",
  "old": "/assets/board-management/committees.png",
  "mode": "figure",
  "html": "<figure class=\"h1shot h1shot--teaser\" data-h1shot=\"board\" data-full-alt=\"Board member list with term tags beside a member record\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/board-teaser.webp\" width=\"800\" height=\"758\" loading=\"lazy\" decoding=\"async\" alt=\"Board member list beside a director record with term dates and term limit\"/><figcaption>Terms and roles per director</figcaption></figure>"
 },
 {
  "p": "board-management",
  "old": "/assets/board-management/votes.png",
  "mode": "figure",
  "html": "<figure class=\"h1shot h1shot--teaser\" data-h1shot=\"board-votes\" data-full-alt=\"Board vote with a results bar and a ballot table\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/board-votes-teaser.webp\" width=\"875\" height=\"610\" loading=\"lazy\" decoding=\"async\" alt=\"Vote totals, a yes, no and abstain bar, and ballots with voter avatars\"/><figcaption>Quorum and results, live</figcaption></figure>"
 },
 {
  "p": "donors-and-contacts",
  "old": "/_next/static/media/Centralized Contact & Company Management.da8b70e4.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--teaser\" data-h1shot=\"contacts\" data-full-alt=\"Contact list with avatars beside a contact record and follow-up panel\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/contacts-teaser.webp\" width=\"445\" height=\"669\" loading=\"lazy\" decoding=\"async\" alt=\"Contact record with call, text and email buttons\"/><figcaption>Every contact, one click away</figcaption></figure>"
 },
 {
  "p": "donors-and-contacts",
  "old": "/_next/static/media/Effortless Donation Tracking.a87c4904.png",
  "mode": "img",
  "html": "<figure class=\"h1shot\" data-h1shot=\"donations\" data-full-alt=\"Gifts list with donor names, amounts and restriction labels\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/donations-1440.webp\" srcset=\"/assets/product-shots/donations-960.webp 960w, /assets/product-shots/donations-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Gifts list with donor names, amounts and restriction labels\"/><figcaption>Every gift, with its restriction, in one list.</figcaption></figure>"
 },
 {
  "p": "finances",
  "old": "/_next/static/media/01.6ca4c05c.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--teaser\" data-h1shot=\"finance\" data-full-alt=\"Finance books page with three net asset totals, a donut chart and monthly gift bars\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/finance-teaser.webp\" width=\"1165\" height=\"360\" loading=\"lazy\" decoding=\"async\" alt=\"Three net asset totals above a donut chart and monthly gift bars\"/><figcaption>Net assets, split by restriction</figcaption></figure>"
 },
 {
  "p": "finances",
  "old": "/_next/static/media/02.4d0ab624.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--teaser\" data-h1shot=\"compliance\" data-full-alt=\"Compliance page with PDF downloads and Form 990 and CHAR500 deadlines\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/compliance-teaser.webp\" width=\"1158\" height=\"320\" loading=\"lazy\" decoding=\"async\" alt=\"Key deadlines list with Form 990, CHAR500 and 990-N\"/><figcaption>Filing deadlines you won't miss</figcaption></figure>"
 },
 {
  "p": "finances",
  "old": "/_next/static/media/03.dd1ce485.png",
  "mode": "img",
  "html": "<figure class=\"h1shot\" data-h1shot=\"donations\" data-full-alt=\"Gifts list with donor names, amounts and restriction labels\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/donations-1440.webp\" srcset=\"/assets/product-shots/donations-960.webp 960w, /assets/product-shots/donations-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Gifts list with donor names, amounts and restriction labels\"/><figcaption>Every gift, with its restriction, in one list.</figcaption></figure>"
 },
 {
  "p": "hr-solutions",
  "old": "/_next/static/media/01.73ecfe16.png",
  "mode": "img",
  "html": "<figure class=\"h1shot\" data-h1shot=\"staff-hr\" data-full-alt=\"People and HR overview with bar charts\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/staff-hr-1440.webp\" srcset=\"/assets/product-shots/staff-hr-960.webp 960w, /assets/product-shots/staff-hr-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"People and HR overview with bar charts\"/><figcaption>Your team by schedule, department and status.</figcaption></figure>"
 },
 {
  "p": "hr-solutions",
  "old": "/_next/static/media/03.ff19ce76.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--teaser\" data-h1shot=\"timesheets\" data-full-alt=\"Weekly timesheet form beside submitted entries\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/timesheets-teaser.webp\" width=\"1158\" height=\"415\" loading=\"lazy\" decoding=\"async\" alt=\"Time entries with draft, approved and rejected status and an approve button\"/><figcaption>Approve hours or send back</figcaption></figure>"
 },
 {
  "p": "my-helpone",
  "old": "/assets/otherfiles/myHelpOne.png",
  "mode": "fill",
  "html": "<figure class=\"h1shot h1shot--teaser\" data-h1shot=\"dashboard\" data-full-alt=\"HelpOne dashboard with a greeting, task and approval tabs, upcoming events and days off\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/dashboard-teaser.webp\" width=\"800\" height=\"406\" loading=\"lazy\" decoding=\"async\" alt=\"Upcoming events with shift fill counts beside company days off\"/><figcaption>Events and days off ahead</figcaption></figure>"
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
