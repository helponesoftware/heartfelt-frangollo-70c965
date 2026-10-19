/* Sitewide copy fixes that must survive Next.js hydration / client navigation:
   remove SOC 2 claims and use the correct legal entity. Never edits self.__next_f. */
(function () {
  var RULES = [
    [/\s*SOC 2 • PCI Level 1 • GDPR compliant/g, " Secure hosted card fields • GDPR-aligned"],
    [/SOC 2 Type II,\s*/g, ""],
    [/SOC II,\s*/g, ""],
    [/SOC 2 • /g, ""],
    [/Are you SOC 2 and PCI compliant\?/g, "How do you handle card data?"],
    [/HelpOne is built to meet SOC 2 Type II and PCI Level 1 standards\./g, "Card details are entered into our payment processor's secure hosted fields."],
    [/HelpOne Software, Inc\./g, "HelpOne Software, LLC"],
    [/edward@helponesoftware\.com/g, "hello@helponesoftware.com"]
  ];
  var DROP = /^\s*(SOC 2( Type II)?( Certified)?|SOC II)\s*$/;
  function fixText(n) {
    var t = n.nodeValue, o = t;
    for (var i = 0; i < RULES.length; i++) t = t.replace(RULES[i][0], RULES[i][1]);
    if (t !== o) n.nodeValue = t;
    if (DROP.test(t) && n.parentNode && n.parentNode.childNodes.length === 1) {
      var el = n.parentNode;
      if (el.tagName !== "BODY") el.parentNode && el.parentNode.removeChild(el);
    }
  }
  function walk(root) {
    if (!root || !/SOC|Inc\.|edward@/.test(root.textContent || "")) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n, list = [];
    while ((n = w.nextNode())) if (/SOC|Inc\.|edward@/.test(n.nodeValue)) list.push(n);
    list.forEach(fixText);
  }
  var queued = false;
  function fixAddress() {
    var a = document.querySelectorAll("address");
    for (var i = 0; i < a.length; i++) {
      var t = a[i].textContent || "";
      if (/HelpOne Software/.test(t) && /Somers/.test(t) && !/Village Square/.test(t))
        a[i].innerHTML = "HelpOne Software, LLC<br/>108 Village Square, Suite 189<br/>Somers, NY 10589<br/>United States";
    }
  }
  function fixMailto() {
    var a = document.querySelectorAll('a[href*="edward@helponesoftware.com"]');
    for (var i = 0; i < a.length; i++) a[i].href = a[i].getAttribute("href").replace("edward@helponesoftware.com", "hello@helponesoftware.com");
  }
  function run() { queued = false; walk(document.body); fixAddress(); fixMailto(); }
  function queue() { if (!queued) { queued = true; setTimeout(run, 50); } }
  function start() {
    run();
    new MutationObserver(queue).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
