/* HelpOne marketing site: PostHog analytics (project 671491, HelpOne org).
 * - Heatmaps, autocapture, dead clicks, rage clicks, session replay (all inputs masked).
 * - Explicit named events for unambiguous drop-off analysis:
 *     cta_click        every button / link click: {text, href, page, section, cta_type, ...}
 *     start_trial_click links to the trial/signup URL (app.helponesoftware.com/demo)
 *     book_demo_click   book-a-demo / working-session / schedule links (mostly /contact-us)
 *     pricing_toggle    monthly / yearly toggle on pricing cards {period}
 *     video_play        "Watch ... video" buttons and #video links
 *     form_submit       partner + contact forms {form_name, form_id, page}; NEVER field values
 * - Runs only on www.helponesoftware.com, helponesoftware.com and
 *   deploy-preview-*--heartfelt-frangollo-70c965.netlify.app (super property env = production|preview).
 * GA4 (G-JGSKFEED8X) is untouched and independent of this file.
 */
(function () {
  "use strict";
  if (window.__helponePosthog) return;
  window.__helponePosthog = true;

  var host = (window.location.hostname || "").toLowerCase();
  var ENV = null;
  if (host === "www.helponesoftware.com" || host === "helponesoftware.com") ENV = "production";
  else if (/^deploy-preview-\d+--heartfelt-frangollo-70c965\.netlify\.app$/.test(host)) ENV = "preview";
  if (!ENV) return;

  var TOKEN = "phc_x9sHRTAgLouwRLxn7bPFKcyccrrWpZ5UbX9g7eTejX7F";
  var API_HOST = "https://us.i.posthog.com";

  /* Standard PostHog snippet (posthog.com/docs/libraries/js). */
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],Object.defineProperty(u,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}}),Object.defineProperty(u.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+".people (stub)"}}),o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  var posthog = window.posthog;
  try {
    posthog.init(TOKEN, {
      api_host: API_HOST,
      defaults: "2025-05-24", // => capture_pageview:"history_change" (also catches client-side nav) + capture_pageleave
      autocapture: true,
      capture_heatmaps: true,
      enable_heatmaps: true,
      capture_dead_clicks: true,
      rageclick: true,
      session_recording: { maskAllInputs: true },
      person_profiles: "identified_only",
      respect_dnt: true,
      before_send: function (ev) {
        if (ev && ev.properties) ev.properties.env = ENV;
        return ev;
      },
      loaded: function (ph) {
        try { ph.register({ env: ENV, site: "helpone-marketing" }); } catch (e) {}
      }
    });
  } catch (err) {
    return;
  }

  /* ---------- helpers ---------- */
  function clean(s, max) {
    s = (s || "").replace(/\s+/g, " ").trim();
    return s.length > (max || 100) ? s.slice(0, max || 100) : s;
  }
  function pagePath() {
    var p = window.location.pathname || "/";
    p = p.replace(/\.html$/i, "").replace(/\/+$/, "");
    return p || "/";
  }
  function headingText(root) {
    var h = root.querySelector && root.querySelector("h1, h2, h3");
    return h ? clean(h.textContent, 80) : "";
  }
  function sectionOf(el) {
    var n = el;
    while (n && n !== document.body && n.nodeType === 1) {
      var tag = n.tagName;
      if (n.id && !/^(__next|h1nav-drawer)$/.test(n.id) && /^(SECTION|HEADER|FOOTER|NAV|MAIN|ASIDE|FORM|DIV|ARTICLE)$/.test(tag)) return n.id;
      if (tag === "NAV" || tag === "HEADER") return "header";
      if (tag === "FOOTER") return "footer";
      if (tag === "SECTION" || tag === "ARTICLE" || tag === "ASIDE") { var h = headingText(n); if (h) return h; }
      n = n.parentElement;
    }
    // Fallback: nearest heading that precedes the element in document order.
    var hs = document.querySelectorAll("main h1, main h2, main h3, h1, h2");
    var best = "";
    for (var i = 0; i < hs.length; i++) {
      if (hs[i].compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) best = clean(hs[i].textContent, 80);
    }
    return best;
  }
  function absHref(a) {
    try { return a.href ? String(a.href) : (a.getAttribute("href") || ""); } catch (e) { return ""; }
  }
  var TRIAL_RE = /^https?:\/\/app\.helponesoftware\.com\/(demo|signup|sign-up|register|trial)(\b|\/|\?|#|$)/i;
  function classify(el, text, href) {
    if (el.matches && el.matches("[data-period]")) return "pricing_toggle";
    var rawHref = el.tagName === "A" ? (el.getAttribute("href") || "") : "";
    if ((el.tagName === "BUTTON" && /^Watch .*(video|Overview)/i.test(text)) || rawHref === "/#video" || rawHref === "#video" || /\bwatch\b.*\bvideo\b/i.test(text)) return "video_play";
    if (TRIAL_RE.test(href) || /start (your )?(free )?trial|free trial|sign ?up/i.test(text)) return "start_trial";
    if (/book|schedule|request|demo|working session|partnership call/i.test(text) && (/\/contact-us/.test(href) || /calendly|cal\.com|meet/.test(href) || el.tagName === "BUTTON")) return "book_demo";
    if (/\/contact-us(\.html)?([?#]|$)/.test(href)) return "contact";
    if (/^https?:\/\/app\.helponesoftware\.com\/?$/i.test(href) || /^log ?in$/i.test(text)) return "login";
    if (el.type === "submit") return "submit";
    if (el.closest && el.closest("nav, header, #h1nav-drawer, #mobile-menu, .h1h-in")) return "nav";
    if (el.closest && el.closest("footer")) return "footer_link";
    return el.tagName === "A" ? "link" : "button";
  }
  function send(name, props, beacon) {
    try { posthog.capture(name, props, beacon ? { transport: "sendBeacon" } : undefined); } catch (e) {}
  }

  /* ---------- click tracking (capture phase so it runs before handlers that preventDefault) ---------- */
  document.addEventListener("click", function (e) {
    try {
      var el = e.target && e.target.closest && e.target.closest('a[href], button, [role="button"], input[type="submit"], input[type="button"]');
      if (!el) return;
      var isInput = el.tagName === "INPUT";
      var text = clean(isInput ? (el.value || el.getAttribute("aria-label")) : (el.textContent || el.getAttribute("aria-label") || el.getAttribute("title")), 100);
      if (isInput && el.type !== "submit" && el.type !== "button") text = ""; // never read field values
      var href = el.tagName === "A" ? absHref(el) : "";
      var type = classify(el, text, href);
      var props = {
        text: text,
        href: href,
        page: window.location.pathname,
        page_clean: pagePath(),
        section: sectionOf(el),
        cta_type: type,
        element: el.tagName.toLowerCase(),
        is_external: !!(href && el.hostname && el.hostname !== window.location.hostname)
      };
      var leaving = !!href && !/^(#|javascript:)/i.test(el.getAttribute("href") || "") && el.target !== "_blank";
      send("cta_click", props, leaving);
      if (type === "start_trial") send("start_trial_click", props, leaving);
      else if (type === "book_demo") send("book_demo_click", props, leaving);
      else if (type === "video_play") send("video_play", props);
      else if (type === "pricing_toggle") {
        props.period = el.getAttribute("data-period") || "";
        send("pricing_toggle", props);
      }
    } catch (err) {}
  }, true);

  /* ---------- form submits (no field contents, ever) ---------- */
  document.addEventListener("submit", function (e) {
    try {
      var f = e.target;
      if (!f || f.tagName !== "FORM") return;
      var path = pagePath();
      var name = f.getAttribute("name") || f.id || "";
      if (!name) name = /contact/.test(path) ? "contact" : (/partner/.test(path) ? "partner-application" : "form");
      send("form_submit", {
        form_name: name,
        form_id: f.id || "",
        form_action: f.getAttribute("action") || "",
        page: window.location.pathname,
        page_clean: path,
        section: sectionOf(f)
      }, true);
    } catch (err) {}
  }, true);
})();
