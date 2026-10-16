// kc-track.js: the standard event list every site sends to PostHog (PLAYBOOK_ANALYTICS.md).
// Canonical copy: brain/automation/analytics/kc-track.js (PLAYBOOK_ANALYTICS.md). Sites embed it verbatim.
// Change it HERE, then re-run install-posthog.mjs on each site (or re-copy public/kc-track.js).
// Needs window.posthog (snippet or posthog-js) already initialised. No per-site wiring:
//   tel: links -> call_tap · mailto: -> email_tap · map links -> directions_click
//   any element with data-widget="name" -> widget_used {widget} (once per widget per page view)
//   forms -> form_start (first input) and form_submit
(function () {
  if (window.__kcTrack) return;
  window.__kcTrack = true;
  var ph = function () { return window.posthog; };
  var MAPS = /(google\.[a-z.]+\/maps|maps\.google\.|maps\.app\.goo\.gl|goo\.gl\/maps|maps\.apple\.com|g\.page\/)/i;
  var usedWidgets = {};
  var lastPath = location.pathname;
  var formName = function (f) {
    return f.getAttribute('name') || f.getAttribute('data-form') || f.id || 'form';
  };
  var label = function (el) { return (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80); };

  document.addEventListener('click', function (e) {
    var p = ph(); if (!p || !e.target || !e.target.closest) return;
    if (location.pathname !== lastPath) { usedWidgets = {}; lastPath = location.pathname; }
    var a = e.target.closest('a[href]');
    if (a) {
      var h = a.getAttribute('href') || '';
      var props = { href: h, label: label(a), path: location.pathname };
      if (h.indexOf('tel:') === 0) p.capture('call_tap', props);
      else if (h.indexOf('mailto:') === 0) p.capture('email_tap', props);
      else if (MAPS.test(h)) p.capture('directions_click', props);
    }
    var w = e.target.closest('[data-widget]');
    if (w) {
      var name = w.getAttribute('data-widget');
      if (!usedWidgets[name]) { usedWidgets[name] = true; p.capture('widget_used', { widget: name, path: location.pathname }); }
    }
  }, true);

  var started = typeof WeakSet === 'function' ? new WeakSet() : null;
  document.addEventListener('input', function (e) {
    var p = ph(); var f = e.target && e.target.form;
    if (!p || !f || !started || started.has(f)) return;
    started.add(f);
    p.capture('form_start', { form: formName(f), path: location.pathname });
  }, true);
  document.addEventListener('submit', function (e) {
    var p = ph(); var f = e.target;
    if (!p || !f || f.tagName !== 'FORM') return;
    p.capture('form_submit', { form: formName(f), path: location.pathname });
  }, true);
})();
