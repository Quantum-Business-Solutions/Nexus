/* ==========================================================================
   Nexus · polish layer (runtime)

   Why JS: every page is built from inline styles, and inline styles outrank
   any stylesheet. Setting element.style from JS is the only way to upgrade
   the existing markup without editing 42 files by hand.

   What it does, all progressive — if this file fails to load, the site is
   exactly what it was before:
     1. staggered reveal-on-scroll for sections, cards and grid children
     2. depth: swaps hard 1px borders for layered shadows on cards
     3. lift-on-hover for anything card-like
     4. promotes the small stat numbers to display scale
     5. parallax drift on the decorative background art
   ========================================================================== */
(function () {
  "use strict";

  var reduced = window.matchMedia &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else { fn(); }
  }

  /* ── 1 · reveal on scroll ───────────────────────────────────────────────── */
  function reveals() {
    if (reduced || !("IntersectionObserver" in window)) return;

    var targets = [];
    // top-level content blocks
    document.querySelectorAll("section > div, section > h1, section > h2")
      .forEach(function (el) { targets.push(el); });
    // grid and flex children stagger against their siblings
    document.querySelectorAll('[style*="grid-template-columns"]')
      .forEach(function (grid) {
        Array.prototype.forEach.call(grid.children, function (kid) {
          targets.push(kid);
        });
      });

    var seen = new Set();
    targets = targets.filter(function (el) {
      if (!el || seen.has(el) || el.offsetHeight === 0) return false;
      seen.add(el); return true;
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var delay = parseFloat(el.getAttribute("data-nx-delay") || 0);
        setTimeout(function () {
          el.style.opacity = "1";
          el.style.transform = "none";
        }, delay);
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.06 });

    targets.forEach(function (el, i) {
      // anything already in view on load stays visible — no flash of blank page
      var box = el.getBoundingClientRect();
      if (box.top < window.innerHeight * 0.92) return;

      el.style.opacity = "0";
      el.style.transform = "translate3d(0,26px,0)";
      el.style.transition =
        "opacity .78s cubic-bezier(.2,.7,.3,1), transform .78s cubic-bezier(.2,.7,.3,1)";
      el.style.willChange = "opacity, transform";

      var sibIndex = el.parentNode ?
        Array.prototype.indexOf.call(el.parentNode.children, el) : 0;
      el.setAttribute("data-nx-delay", String(Math.min(sibIndex, 6) * 85));
      io.observe(el);
    });
  }

  /* ── 2 · depth: trade hard borders for layered shadow ───────────────────── */
  var SH_REST = "0 2px 4px rgba(19,33,26,.05), 0 14px 32px -12px rgba(19,33,26,.16)";
  var SH_LIFT = "0 6px 12px rgba(19,33,26,.07), 0 40px 80px -30px rgba(19,33,26,.34)";
  var SH_REST_DK = "0 2px 6px rgba(0,0,0,.35), 0 22px 50px -20px rgba(0,0,0,.55)";
  var SH_LIFT_DK = "0 8px 16px rgba(0,0,0,.4), 0 46px 90px -32px rgba(0,0,0,.7)";

  function isDark(el) {
    // walk up for a dark background so we pick the right shadow colour
    var n = el;
    while (n && n !== document.body) {
      var bg = getComputedStyle(n).backgroundColor;
      var m = bg && bg.match(/\d+/g);
      if (m && m.length >= 3 && (m[3] === undefined || +m[3] > 0.4)) {
        var lum = (0.299 * +m[0] + 0.587 * +m[1] + 0.114 * +m[2]);
        if (lum < 90) return true;
        if (lum > 170) return false;
      }
      n = n.parentNode;
    }
    return getComputedStyle(document.body).backgroundColor.indexOf("14, 26") > -1;
  }

  function depth() {
    var cards = document.querySelectorAll(
      '.nx-card, [style*="border-radius:16px"], [style*="border-radius:18px"],' +
      '[style*="border-radius:20px"], [style*="border-radius:22px"]'
    );
    Array.prototype.forEach.call(cards, function (el) {
      if (el.offsetHeight < 40) return;
      var dark = isDark(el);
      el.style.boxShadow = dark ? SH_REST_DK : SH_REST;
      // soften the hairline border rather than removing it outright
      var bd = getComputedStyle(el).borderTopColor;
      if (bd && bd !== "rgba(0, 0, 0, 0)") {
        el.style.borderColor = dark ? "rgba(255,255,255,.08)" : "rgba(19,33,26,.07)";
      }
      if (reduced) return;
      el.style.transition =
        "transform .34s cubic-bezier(.2,.7,.3,1), box-shadow .34s cubic-bezier(.2,.7,.3,1), border-color .3s ease";
      el.addEventListener("mouseenter", function () {
        el.style.transform = "translate3d(0,-6px,0)";
        el.style.boxShadow = dark ? SH_LIFT_DK : SH_LIFT;
        el.style.borderColor = "rgba(138,187,42,.42)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "none";
        el.style.boxShadow = dark ? SH_REST_DK : SH_REST;
        el.style.borderColor = dark ? "rgba(255,255,255,.08)" : "rgba(19,33,26,.07)";
      });
    });
  }

  /* ── 3 · promote the stat numbers to display scale ──────────────────────── */
  function stats() {
    var RX = /^(\s*)(\d+[\d.,]*\s*(?:min|hr|%|\+|\/7)?|24\/7)(\s*)$/i;
    document.querySelectorAll('[style*="color:#8ABB2A"],[style*="color:#248332"]')
      .forEach(function (el) {
        if (el.children.length) return;
        var txt = (el.textContent || "").trim();
        if (!RX.test(txt) || txt.length > 8) return;
        var size = parseFloat(getComputedStyle(el).fontSize);
        if (!size || size > 34) return;           // already large — leave it
        el.style.fontSize = "clamp(40px,5.4vw,74px)";
        el.style.lineHeight = ".92";
        el.style.letterSpacing = "-.035em";
        el.style.fontWeight = "600";
        el.style.background = "linear-gradient(180deg,#a8d84a,#248332)";
        el.style.webkitBackgroundClip = "text";
        el.style.backgroundClip = "text";
        el.style.color = "transparent";
        el.style.fontVariantNumeric = "tabular-nums";
        var lab = el.nextElementSibling;
        if (lab && !lab.children.length) {
          lab.style.letterSpacing = ".13em";
          lab.style.textTransform = "uppercase";
          lab.style.fontSize = "12px";
          lab.style.fontWeight = "600";
          lab.style.marginTop = "10px";
        }
      });
  }

  /* ── 4 · parallax drift on the decorative background art ───────────────── */
  function parallax() {
    if (reduced) return;
    var art = [];
    document.querySelectorAll('img[src*="nexus-mesh"],img[src*="nexus-glow"],img[src*="nexus-band"]')
      .forEach(function (el) {
        art.push({ el: el, base: el.getBoundingClientRect().top + window.scrollY });
      });
    if (!art.length) return;
    var raf = null;
    window.addEventListener("scroll", function () {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        var y = window.scrollY;
        art.forEach(function (a, i) {
          var shift = (y - a.base) * (i % 2 ? -0.055 : 0.075);
          a.el.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0)";
        });
        raf = null;
      });
    }, { passive: true });
  }

  ready(function () {
    try { depth();    } catch (e) {}
    try { stats();    } catch (e) {}
    try { reveals();  } catch (e) {}
    try { parallax(); } catch (e) {}
  });
})();
