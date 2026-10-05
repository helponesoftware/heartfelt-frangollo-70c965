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

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  // Prefer the real gtag from the page snippet when present
  function send(eventName, params) {
    try {
      var payload = {
        form_id: params.form_id || "",
        form_name: params.form_name || "",
        page_path: params.page_path || pagePath(),
      };
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, payload);
      } else {
        gtag("event", eventName, payload);
      }
    } catch (err) {
      console.warn("HelpOne GA4 conversion skipped", err);
    }
  }

  function pagePath() {
    try {
      return window.location.pathname || "";
    } catch (e) {
      return "";
    }
  }

  function fireLeadAndSubmit(formId, formName) {
    var base = { form_id: formId, form_name: formName, page_path: pagePath() };
    send("generate_lead", base);
    send("form_submit", base);
  }

  var path = (pagePath().replace(/\/+$/, "") || "/");
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
    fireLeadAndSubmit(thanksPaths[path].form_id, thanksPaths[path].form_name);
  }

  function isContactPath(p) {
    return p === "/contact-us" || p === "/contact-us/";
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
