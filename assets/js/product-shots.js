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
  "html": "<figure class=\"h1shot h1shot--card\" data-h1shot=\"myhelpone-volunteer\" data-full-alt=\"Volunteer portal home with next shift, impact numbers and to-dos\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/myhelpone-volunteer-1440.webp\" srcset=\"/assets/product-shots/myhelpone-volunteer-960.webp 960w, /assets/product-shots/myhelpone-volunteer-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Volunteer portal home with next shift, impact numbers and to-dos\"/><figcaption>Volunteers get their own simple home: shifts, hours, to-dos.</figcaption></figure>"
 },
 {
  "p": "volunteer-management",
  "old": "/assets/volunteer-management/Smart Availability.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--card\" data-h1shot=\"volunteer-shifts\" data-full-alt=\"Shift list with assigned volunteer avatars and an assign picker\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/volunteer-shifts-1440.webp\" srcset=\"/assets/product-shots/volunteer-shifts-960.webp 960w, /assets/product-shots/volunteer-shifts-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Shift list with assigned volunteer avatars and an assign picker\"/><figcaption>Fill shifts and see who's on them.</figcaption></figure>"
 },
 {
  "p": "volunteer-management",
  "old": "/assets/volunteer-management/Admin Master Dashboard.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"volunteers\" data-full-alt=\"Volunteer review queue with approve and background check buttons\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/volunteers-1440.webp\" srcset=\"/assets/product-shots/volunteers-960.webp 960w, /assets/product-shots/volunteers-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Volunteer review queue with approve and background check buttons\"/><figcaption>Approve new volunteers and start checks in one click.</figcaption></figure>"
 },
 {
  "p": "volunteer-management",
  "old": "/assets/volunteer-management/Background Screening Done Right.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"screening\" data-full-alt=\"Screening pipeline with a queue of volunteers and statuses\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/screening-1440.webp\" srcset=\"/assets/product-shots/screening-960.webp 960w, /assets/product-shots/screening-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Screening pipeline with a queue of volunteers and statuses\"/><figcaption>Background checks tracked from start to clear.</figcaption></figure>"
 },
 {
  "p": "event-management",
  "old": "/_next/static/media/01.35eed40b.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"event-registration\" data-full-alt=\"Public event page with ticket choices and a reserve button\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/event-registration-1440.webp\" srcset=\"/assets/product-shots/event-registration-960.webp 960w, /assets/product-shots/event-registration-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Public event page with ticket choices and a reserve button\"/><figcaption>A simple public page to buy tickets. No account needed.</figcaption></figure>"
 },
 {
  "p": "event-management",
  "old": "/_next/static/media/02.da8b93ec.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"volunteer-shifts\" data-full-alt=\"Shift list with assigned volunteer avatars and an assign picker\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/volunteer-shifts-1440.webp\" srcset=\"/assets/product-shots/volunteer-shifts-960.webp 960w, /assets/product-shots/volunteer-shifts-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Shift list with assigned volunteer avatars and an assign picker\"/><figcaption>Fill shifts and see who's on them.</figcaption></figure>"
 },
 {
  "p": "event-management",
  "old": "/_next/static/media/03.a01384eb.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"events\" data-full-alt=\"Events dashboard with raised, expenses and net totals\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/events-1440.webp\" srcset=\"/assets/product-shots/events-960.webp 960w, /assets/product-shots/events-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Events dashboard with raised, expenses and net totals\"/><figcaption>What each event raised, spent and netted.</figcaption></figure>"
 },
 {
  "p": "fundraising",
  "old": "/_next/static/media/02.e9fd2c4d.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"donations\" data-full-alt=\"Gifts list with donor names, amounts and restriction labels\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/donations-1440.webp\" srcset=\"/assets/product-shots/donations-960.webp 960w, /assets/product-shots/donations-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Gifts list with donor names, amounts and restriction labels\"/><figcaption>Every gift, with its restriction, in one list.</figcaption></figure>"
 },
 {
  "p": "board-management",
  "old": "/assets/board-management/committees.png",
  "mode": "figure",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"board\" data-full-alt=\"Board member list with term tags beside a member record\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/board-1440.webp\" srcset=\"/assets/product-shots/board-960.webp 960w, /assets/product-shots/board-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Board member list with term tags beside a member record\"/><figcaption>Terms, roles and committees for every director.</figcaption></figure>"
 },
 {
  "p": "board-management",
  "old": "/assets/board-management/votes.png",
  "mode": "figure",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"board-votes\" data-full-alt=\"Board vote with a results bar and a ballot table\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/board-votes-1440.webp\" srcset=\"/assets/product-shots/board-votes-960.webp 960w, /assets/product-shots/board-votes-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Board vote with a results bar and a ballot table\"/><figcaption>Votes with quorum and results, live.</figcaption></figure>"
 },
 {
  "p": "donors-and-contacts",
  "old": "/_next/static/media/Centralized Contact & Company Management.da8b70e4.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--card\" data-h1shot=\"contacts\" data-full-alt=\"Contact list with avatars beside a contact record and follow-up panel\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/contacts-1440.webp\" srcset=\"/assets/product-shots/contacts-960.webp 960w, /assets/product-shots/contacts-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Contact list with avatars beside a contact record and follow-up panel\"/><figcaption>Every donor and partner on one page, with calls, texts and follow-ups.</figcaption></figure>"
 },
 {
  "p": "donors-and-contacts",
  "old": "/_next/static/media/Effortless Donation Tracking.a87c4904.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--card\" data-h1shot=\"donations\" data-full-alt=\"Gifts list with donor names, amounts and restriction labels\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/donations-1440.webp\" srcset=\"/assets/product-shots/donations-960.webp 960w, /assets/product-shots/donations-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Gifts list with donor names, amounts and restriction labels\"/><figcaption>Every gift, with its restriction, in one list.</figcaption></figure>"
 },
 {
  "p": "finances",
  "old": "/_next/static/media/01.6ca4c05c.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"finance\" data-full-alt=\"Finance books page with three net asset totals, a donut chart and monthly gift bars\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/finance-1440.webp\" srcset=\"/assets/product-shots/finance-960.webp 960w, /assets/product-shots/finance-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Finance books page with three net asset totals, a donut chart and monthly gift bars\"/><figcaption>Net assets and giving by month, straight from the books.</figcaption></figure>"
 },
 {
  "p": "finances",
  "old": "/_next/static/media/02.4d0ab624.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"compliance\" data-full-alt=\"Compliance page with PDF downloads and Form 990 and CHAR500 deadlines\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/compliance-1440.webp\" srcset=\"/assets/product-shots/compliance-960.webp 960w, /assets/product-shots/compliance-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Compliance page with PDF downloads and Form 990 and CHAR500 deadlines\"/><figcaption>Filing dates and compliance PDFs in one place.</figcaption></figure>"
 },
 {
  "p": "finances",
  "old": "/_next/static/media/03.dd1ce485.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"donations\" data-full-alt=\"Gifts list with donor names, amounts and restriction labels\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/donations-1440.webp\" srcset=\"/assets/product-shots/donations-960.webp 960w, /assets/product-shots/donations-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Gifts list with donor names, amounts and restriction labels\"/><figcaption>Every gift, with its restriction, in one list.</figcaption></figure>"
 },
 {
  "p": "hr-solutions",
  "old": "/_next/static/media/01.73ecfe16.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"staff-hr\" data-full-alt=\"People and HR overview with bar charts\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/staff-hr-1440.webp\" srcset=\"/assets/product-shots/staff-hr-960.webp 960w, /assets/product-shots/staff-hr-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"People and HR overview with bar charts\"/><figcaption>Your team by schedule, department and status.</figcaption></figure>"
 },
 {
  "p": "hr-solutions",
  "old": "/_next/static/media/03.ff19ce76.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"timesheets\" data-full-alt=\"Weekly timesheet form beside submitted entries\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/timesheets-1440.webp\" srcset=\"/assets/product-shots/timesheets-960.webp 960w, /assets/product-shots/timesheets-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Weekly timesheet form beside submitted entries\"/><figcaption>Log hours in seconds and send them for approval.</figcaption></figure>"
 },
 {
  "p": "volunteer-management",
  "old": "/assets/volunteer-management/Volunteer Onboarding.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--card\" data-h1shot=\"volunteer-onboarding\" data-full-alt=\"Volunteer sign-up form settings with question checkboxes and an invite link\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/volunteer-onboarding-1440.webp\" srcset=\"/assets/product-shots/volunteer-onboarding-960.webp 960w, /assets/product-shots/volunteer-onboarding-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Volunteer sign-up form settings with question checkboxes and an invite link\"/><figcaption>Choose what your sign-up form asks and share one link.</figcaption></figure>"
 },
 {
  "p": "volunteer-management",
  "old": "/assets/volunteer-management/Hours Approval Workflow.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--card\" data-h1shot=\"volunteer-hours-approval\" data-full-alt=\"Volunteer hours waiting for approval above approved hours\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/volunteer-hours-approval-1440.webp\" srcset=\"/assets/product-shots/volunteer-hours-approval-960.webp 960w, /assets/product-shots/volunteer-hours-approval-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Volunteer hours waiting for approval above approved hours\"/><figcaption>Approve logged hours or send them back with a note.</figcaption></figure>"
 },
 {
  "p": "volunteer-management",
  "old": "/assets/volunteer-management/Native Checkr - Compliance.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--card\" data-h1shot=\"volunteer-background-checks\" data-full-alt=\"Volunteer screening pipeline with a queue of volunteers and check settings\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/volunteer-background-checks-1440.webp\" srcset=\"/assets/product-shots/volunteer-background-checks-960.webp 960w, /assets/product-shots/volunteer-background-checks-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Volunteer screening pipeline with a queue of volunteers and check settings\"/><figcaption>Background checks tracked from start to clear, with who pays and how long a check lasts.</figcaption></figure>"
 },
 {
  "p": "volunteer-management",
  "old": "/assets/volunteer-management/990-Ready Hours.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--card\" data-h1shot=\"volunteer-990-hours\" data-full-alt=\"Volunteer compliance report with verified hours, in-kind value by program and PDF and CSV downloads\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/volunteer-990-hours-1440.webp\" srcset=\"/assets/product-shots/volunteer-990-hours-960.webp 960w, /assets/product-shots/volunteer-990-hours-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Volunteer compliance report with verified hours, in-kind value by program and PDF and CSV downloads\"/><figcaption>Verified volunteer hours and their estimated value, ready for Form 990 and grant reports.</figcaption></figure>"
 },
 {
  "p": "volunteer-management",
  "old": "/assets/volunteer-management/Certifications & Extra Checks.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--card\" data-h1shot=\"volunteer-certifications\" data-full-alt=\"Volunteer portal training list with finished dates, documents and impact certificate\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/volunteer-certifications-1440.webp\" srcset=\"/assets/product-shots/volunteer-certifications-960.webp 960w, /assets/product-shots/volunteer-certifications-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Volunteer portal training list with finished dates, documents and impact certificate\"/><figcaption>Each volunteer sees their trainings and marks them done.</figcaption></figure>"
 },
 {
  "p": "volunteer-management",
  "old": "/assets/volunteer-management/Communication Hub.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--card\" data-h1shot=\"volunteer-communication\" data-full-alt=\"Volunteer message picker beside a thank-you email preview\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/volunteer-communication-1440.webp\" srcset=\"/assets/product-shots/volunteer-communication-960.webp 960w, /assets/product-shots/volunteer-communication-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Volunteer message picker beside a thank-you email preview\"/><figcaption>Thank-you notes and shift reminders, filled in for you.</figcaption></figure>"
 },
 {
  "p": "volunteer-management",
  "old": "/assets/volunteer-management/My Availability.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"volunteer-hours\" data-full-alt=\"Volunteer portal hours form beside a list of approved hours\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/volunteer-hours-1440.webp\" srcset=\"/assets/product-shots/volunteer-hours-960.webp 960w, /assets/product-shots/volunteer-hours-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Volunteer portal hours form beside a list of approved hours\"/><figcaption>Volunteers log their own hours and see what was approved.</figcaption></figure>"
 },
 {
  "p": "fundraising",
  "old": "/_next/static/media/01.2f8b271c.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"auctions\" data-full-alt=\"Event auctions table with donors, items, winning bids and fair market value\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/auctions-1440.webp\" srcset=\"/assets/product-shots/auctions-960.webp 960w, /assets/product-shots/auctions-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Event auctions table with donors, items, winning bids and fair market value\"/><figcaption>Auction items with donor, winner, bid and deductible amount.</figcaption></figure>"
 },
 {
  "p": "fundraising",
  "old": "/_next/static/media/03.78602b02.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"expenses\" data-full-alt=\"Expense form above a list of staff expenses with approve and reimbursed states\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/expenses-1440.webp\" srcset=\"/assets/product-shots/expenses-960.webp 960w, /assets/product-shots/expenses-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Expense form above a list of staff expenses with approve and reimbursed states\"/><figcaption>Log an expense, then approve and reimburse it in one list.</figcaption></figure>"
 },
 {
  "p": "donors-and-contacts",
  "old": "/_next/static/media/Powerful Email Campaigns.70d20e4a.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--card\" data-h1shot=\"email-campaigns\" data-full-alt=\"Email group with member contacts, companies and a Send email button\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/email-campaigns-1440.webp\" srcset=\"/assets/product-shots/email-campaigns-960.webp 960w, /assets/product-shots/email-campaigns-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Email group with member contacts, companies and a Send email button\"/><figcaption>Build a mailing list from contacts and companies, then email it.</figcaption></figure>"
 },
 {
  "p": "board-management",
  "old": "/assets/board-management/meetings.png",
  "mode": "figure",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"board-meetings\" data-full-alt=\"Board meeting record with date, time, organizer and purpose\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/board-meetings-1440.webp\" srcset=\"/assets/product-shots/board-meetings-960.webp 960w, /assets/product-shots/board-meetings-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Board meeting record with date, time, organizer and purpose\"/><figcaption>Schedule meetings with agenda, location and calendar links.</figcaption></figure>"
 },
 {
  "p": "board-management",
  "old": "/assets/board-management/documents.png",
  "mode": "figure",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"board-documents\" data-full-alt=\"Board document record with version history table\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/board-documents-1440.webp\" srcset=\"/assets/product-shots/board-documents-960.webp 960w, /assets/product-shots/board-documents-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Board document record with version history table\"/><figcaption>Policies and board packets with versions and review dates.</figcaption></figure>"
 },
 {
  "p": "board-management",
  "old": "/assets/board-management/tasks.png",
  "mode": "figure",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"board-tasks\" data-full-alt=\"Board task record with priority, assignee, due date and subtasks\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/board-tasks-1440.webp\" srcset=\"/assets/product-shots/board-tasks-960.webp 960w, /assets/product-shots/board-tasks-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Board task record with priority, assignee, due date and subtasks\"/><figcaption>Action items with owners, due dates and progress notes.</figcaption></figure>"
 },
 {
  "p": "board-management",
  "old": "/assets/board-management/compliance.png",
  "mode": "figure",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"board-portal\" data-full-alt=\"Board member home with next meeting, open votes and tasks\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/board-portal-1440.webp\" srcset=\"/assets/product-shots/board-portal-960.webp 960w, /assets/product-shots/board-portal-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Board member home with next meeting, open votes and tasks\"/><figcaption>Directors see their meetings, votes and tasks. Nothing else.</figcaption></figure>"
 },
 {
  "p": "hr-solutions",
  "old": "/_next/static/media/02.c81b0844.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"hr-policies\" data-full-alt=\"Policy status bar chart above a list of policy books\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/hr-policies-1440.webp\" srcset=\"/assets/product-shots/hr-policies-960.webp 960w, /assets/product-shots/hr-policies-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Policy status bar chart above a list of policy books\"/><figcaption>See which policies are approved, under review or expired.</figcaption></figure>"
 },
 {
  "p": "policies-and-procedures",
  "old": "/_next/static/media/01.aafa7955.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"policies\" data-full-alt=\"Policy book editor with chapters, sections and text\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/policies-1440.webp\" srcset=\"/assets/product-shots/policies-960.webp 960w, /assets/product-shots/policies-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Policy book editor with chapters, sections and text\"/><figcaption>Write policy books by chapter and publish them.</figcaption></figure>"
 },
 {
  "p": "training-tracking",
  "old": "/_next/static/media/01.69d54065.png",
  "mode": "img",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"training\" data-full-alt=\"Training list by course with people, dates and completion status\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/training-1440.webp\" srcset=\"/assets/product-shots/training-960.webp 960w, /assets/product-shots/training-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"Training list by course with people, dates and completion status\"/><figcaption>Who has finished each training, and who is still due.</figcaption></figure>"
 },
 {
  "p": "my-helpone",
  "old": "/assets/otherfiles/myHelpOne.png",
  "mode": "fill",
  "html": "<figure class=\"h1shot h1shot--wide\" data-h1shot=\"dashboard\" data-full-alt=\"HelpOne dashboard with a greeting, task and approval tabs, upcoming events and days off\"><div class=\"h1shot-bar\" aria-hidden=\"true\"><span></span><span></span><span></span></div><img src=\"/assets/product-shots/dashboard-1440.webp\" srcset=\"/assets/product-shots/dashboard-960.webp 960w, /assets/product-shots/dashboard-1440.webp 1440w\" sizes=\"(min-width:1024px) 680px, 100vw\" width=\"1440\" height=\"900\" loading=\"lazy\" decoding=\"async\" alt=\"HelpOne dashboard with a greeting, task and approval tabs, upcoming events and days off\"/><figcaption>Your day at a glance: tasks, approvals, time off and what's coming up.</figcaption></figure>"
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
