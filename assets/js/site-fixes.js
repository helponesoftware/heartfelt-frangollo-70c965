/* Sitewide copy fixes that must survive Next.js hydration / client navigation:
   remove SOC 2 claims and use the correct legal entity. Never edits self.__next_f. */
(function () {
  var RULES = [
    [/\s*SOC 2 • PCI Level 1 • GDPR compliant/g, " PCI Level 1 • GDPR compliant"],
    [/SOC 2 Type II,\s*/g, ""],
    [/SOC II,\s*/g, ""],
    [/SOC 2 • /g, ""],
    [/Are you SOC 2 and PCI compliant\?/g, "Are you PCI compliant?"],
    [/HelpOne is built to meet SOC 2 Type II and PCI Level 1 standards\./g, "Card payments run through PCI DSS Level 1 payment processors."],
    [/HelpOne Software, Inc\./g, "HelpOne Software, LLC"]
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
    if (!root || !/SOC|Inc\./.test(root.textContent || "")) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n, list = [];
    while ((n = w.nextNode())) if (/SOC|Inc\./.test(n.nodeValue)) list.push(n);
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
  function run() { queued = false; walk(document.body); fixAddress(); }
  function queue() { if (!queued) { queued = true; setTimeout(run, 50); } }
  function start() {
    run();
    new MutationObserver(queue).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
