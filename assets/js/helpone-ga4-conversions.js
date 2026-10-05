/**
 * HelpOne GA4 conversion events (measurement ID G-JGSKFEED8X).
 * Fires ONLY on successful conversion signals — never on raw button clicks.
 *
 * Events to mark as key events in GA4 Admin → Events → Mark as key event:
 *   1) generate_lead  — demo/contact interest + partner application success
 *   2) form_submit    — successful form completion (custom)
 *
 * Event params: form_id, form_name, page_path
 *
 * Where events fire:
 *   /partner-apply-thanks (and legacy /partners/apply-thanks if ever served)
 *        → generate_lead + form_submit on page load (Netlify success redirect)
 *   /contact-us
 *        → generate_lead + form_submit when FormSubmit AJAX returns HTTP ok
 *   "Book a free demo" CTAs link to /contact-us — counted when that form succeeds.
 *   No Calendly embeds exist on the site (none invented).
 */
(function () {
  if (window.__helponeGa4Conversions) return;
  window.__helponeGa4Conversions = true;

  var MEASUREMENT_ID = "G-JGSKFEED8X";

  function pagePath() {
    try {
      var p = window.location.pathname || "";
      p = p.replace(/\/+$/, "") || "/";
      if (/\.html$/i.test(p)) p = p.replace(/\.html$/i, "");
      return p;
    } catch (e) {
      return "";
    }
  }

  function send(eventName, params) {
    var payload = {
      send_to: MEASUREMENT_ID,
      form_id: params.form_id || "",
      form_name: params.form_name || "",
      page_path: params.page_path || pagePath(),
    };

    function attempt() {
      try {
        window.dataLayer = window.dataLayer || [];
        if (typeof window.gtag === "function") {
          window.gtag("event", eventName, payload);
          return true;
        }
        // Queue in dataLayer until gtag.js defines gtag
        window.dataLayer.push(["event", eventName, payload]);
        return false;
      } catch (err) {
        console.warn("HelpOne GA4 conversion skipped", err);
        return false;
      }
    }

    if (attempt()) return;
    var tries = 0;
    var timer = setInterval(function () {
      tries += 1;
      if (attempt() || tries >= 40) clearInterval(timer);
    }, 250);
  }

  function fireLeadAndSubmit(formId, formName) {
    var base = { form_id: formId, form_name: formName, page_path: pagePath() };
    send("generate_lead", base);
    send("form_submit", base);
  }

  var path = pagePath();
  var thanksPaths = {
    "/partner-apply-thanks": {
      form_id: "partner-application",
      form_name: "Partner Application",
    },
    "/partners/apply-thanks": {
      form_id: "partner-application",
      form_name: "Partner Application",
    },
  };
  if (thanksPaths[path]) {
    // Defer slightly so the page's gtag('config') has run and gtag.js can attach
    var fireThanks = function () {
      fireLeadAndSubmit(thanksPaths[path].form_id, thanksPaths[path].form_name);
    };
    if (document.readyState === "complete") setTimeout(fireThanks, 0);
    else window.addEventListener("load", function () { setTimeout(fireThanks, 0); });
  }

  function isContactPath(p) {
    return p === "/contact-us";
  }

  if (isContactPath(path) && typeof window.fetch === "function") {
    var originalFetch = window.fetch.bind(window);
    window.fetch = function (input, init) {
      var url = "";
      try {
        if (typeof input === "string") url = input;
        else if (input && typeof input.url === "string") url = input.url;
      } catch (e) {}
      var isFormSubmit =
        /formsubmit\.co\/ajax\/hello@helponesoftware\.com/i.test(url);
      var result = originalFetch(input, init);
      if (!isFormSubmit) return result;
      return result.then(function (response) {
        try {
          if (response && response.ok) {
            fireLeadAndSubmit("contact-us", "Contact Us");
          }
        } catch (e) {}
        return response;
      });
    };
  }
})();
