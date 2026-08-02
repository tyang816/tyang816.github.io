/* Shared site chrome: scroll-to-top / scroll-to-bottom float */
(function () {
  'use strict';

  function docHeight() {
    var b = document.body;
    var e = document.documentElement;
    return Math.max(
      b.scrollHeight, e.scrollHeight,
      b.offsetHeight, e.offsetHeight,
      b.clientHeight, e.clientHeight
    );
  }

  function init(root) {
    if (!root || root.getAttribute('data-ready')) return;
    root.setAttribute('data-ready', '1');

    var topBtn = root.querySelector('[data-scroll="top"]');
    var bottomBtn = root.querySelector('[data-scroll="bottom"]');

    function update() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      var viewH = window.innerHeight || document.documentElement.clientHeight || 0;
      var fullH = docHeight();
      var canScroll = fullH > viewH + 80;
      root.hidden = !canScroll;
      if (!canScroll) return;

      var nearTop = scrollY < 120;
      var nearBottom = scrollY + viewH >= fullH - 80;
      if (topBtn) topBtn.disabled = nearTop;
      if (bottomBtn) bottomBtn.disabled = nearBottom;
    }

    if (topBtn) {
      topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    if (bottomBtn) {
      bottomBtn.addEventListener('click', function () {
        window.scrollTo({ top: docHeight(), behavior: 'smooth' });
      });
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    setTimeout(update, 300);
  }

  function initSidebarCollapse(root) {
    if (!root || root.getAttribute('data-ready')) return;
    root.setAttribute('data-ready', '1');

    var panel = root.querySelector('#sidebar-profile-panel');
    var toggles = root.querySelectorAll('[data-sidebar-toggle]');
    var hint = root.querySelector('[data-sidebar-toggle-label]');
    var expandLabel = root.getAttribute('data-label-expand') || 'Show profile';
    var collapseLabel = root.getAttribute('data-label-collapse') || 'Hide profile';
    if (!panel || !toggles.length) return;

    function setOpen(open) {
      root.classList.toggle('is-open', open);
      panel.hidden = !open;
      toggles.forEach(function (btn) {
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      if (hint) hint.textContent = open ? collapseLabel : expandLabel;
    }

    toggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setOpen(!root.classList.contains('is-open'));
      });
    });

    setOpen(false);
  }

  function boot() {
    document.querySelectorAll('[data-scroll-float]').forEach(init);
    document.querySelectorAll('[data-sidebar-collapse]').forEach(initSidebarCollapse);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
