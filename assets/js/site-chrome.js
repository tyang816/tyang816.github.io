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
    initSectionNav(root.querySelector('.site-scroll-float__sections'));
  }

  function initSectionNav(nav) {
    if (!nav) return;
    var items = Array.prototype.map.call(nav.querySelectorAll('a[href^="#"]'), function (link) {
      var id = link.getAttribute('href').slice(1);
      return { link: link, el: document.getElementById(id) };
    }).filter(function (item) { return item.el; });
    if (!items.length) return;

    function mark() {
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      var current = items[0];
      items.forEach(function (item) {
        var top = item.el.getBoundingClientRect().top + y;
        if (top - 140 <= y) current = item;
      });
      items.forEach(function (item) {
        var on = item === current;
        item.link.classList.toggle('is-active', on);
        if (on) item.link.setAttribute('aria-current', 'true');
        else item.link.removeAttribute('aria-current');
      });
    }

    window.addEventListener('scroll', mark, { passive: true });
    window.addEventListener('resize', mark);
    mark();

    var toggle = nav.querySelector('.site-scroll-float__sections-toggle');
    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    if (toggle) {
      toggle.addEventListener('click', function (event) {
        event.stopPropagation();
        setOpen(!nav.classList.contains('is-open'));
      });
    }
    document.addEventListener('click', function (event) {
      if (!nav.contains(event.target)) setOpen(false);
    });
    items.forEach(function (item) {
      item.link.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setOpen(false);
        var mast = document.querySelector('.masthead');
        var offset = (mast ? mast.getBoundingClientRect().height : 56) + 16;
        var top = item.el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || 0) - offset;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }, true);
    });
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

  function initMastheadNav() {
    var nav = document.getElementById('site-nav');
    if (!nav || nav.getAttribute('data-nav-ready')) return;
    nav.setAttribute('data-nav-ready', '1');

    var btn = nav.querySelector('button');
    var visible = nav.querySelector('.visible-links');
    var hidden = nav.querySelector('.hidden-links');
    if (!btn || !visible || !hidden) return;

    if (!hidden.id) hidden.id = 'site-nav-menu';
    btn.type = 'button';
    btn.setAttribute('aria-controls', hidden.id);

    var zh = (document.documentElement.lang || '').toLowerCase().indexOf('zh') === 0;
    var order = 0;
    Array.prototype.forEach.call(visible.children, stamp);
    Array.prototype.forEach.call(hidden.children, stamp);

    function stamp(li) {
      if (!li.hasAttribute('data-nav-order')) li.setAttribute('data-nav-order', String(order));
      order += 1;
    }

    function phoneMode() {
      return window.matchMedia('(max-width: 767px)').matches;
    }

    function sortItems(list) {
      var items = Array.prototype.slice.call(list.children);
      items.sort(function (a, b) {
        return (+a.getAttribute('data-nav-order') || 0) - (+b.getAttribute('data-nav-order') || 0);
      });
      items.forEach(function (li) { list.appendChild(li); });
    }

    function shownItems() {
      return Array.prototype.filter.call(visible.children, function (li) {
        return window.getComputedStyle(li).display !== 'none';
      });
    }

    function overflows() {
      var items = shownItems();
      if (!items.length) return false;
      var sum = 0;
      items.forEach(function (li) { sum += li.getBoundingClientRect().width; });
      var reserve = btn.classList.contains('hidden') ? 0 : btn.offsetWidth + 12;
      if (sum > nav.clientWidth - reserve + 1) return true;
      if (!btn.classList.contains('hidden')) {
        var last = items[items.length - 1].getBoundingClientRect();
        var buttonBox = btn.getBoundingClientRect();
        if (last.right > buttonBox.left - 8) return true;
      }
      return false;
    }

    function sync() {
      var open = !hidden.classList.contains('hidden');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.classList.toggle('close', open);
      btn.setAttribute('aria-label', open
        ? (zh ? '关闭导航菜单' : 'Close menu')
        : (zh ? '打开导航菜单' : 'Open menu'));
      document.body.classList.toggle('nav-open', open);
    }

    function layout() {
      if (phoneMode()) {
        while (visible.firstElementChild) hidden.appendChild(visible.firstElementChild);
        sortItems(hidden);
        btn.classList.remove('hidden');
        sync();
        return;
      }

      while (hidden.firstElementChild) visible.appendChild(hidden.firstElementChild);
      sortItems(visible);
      btn.classList.add('hidden');
      hidden.classList.add('hidden');
      btn.classList.remove('close');
      var guard = 0;
      while (shownItems().length > 1 && overflows() && guard < 20) {
        guard += 1;
        btn.classList.remove('hidden');
        hidden.insertBefore(visible.lastElementChild, hidden.firstElementChild);
      }
      if (!hidden.children.length) btn.classList.add('hidden');
      else btn.classList.remove('hidden');
      sync();
    }

    function closeMenu() {
      if (hidden.classList.contains('hidden')) return;
      hidden.classList.add('hidden');
      sync();
    }

    btn.addEventListener('click', function () {
      sync();
    });

    hidden.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('click', function (event) {
      if (!nav.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' || hidden.classList.contains('hidden')) return;
      closeMenu();
      btn.focus();
    });

    window.updateNav = layout;
    if (window.matchMedia) {
      var mq = window.matchMedia('(max-width: 767px)');
      if (mq.addEventListener) mq.addEventListener('change', layout);
      else if (mq.addListener) mq.addListener(layout);
    }
    layout();
  }

  function boot() {
    document.querySelectorAll('[data-scroll-float]').forEach(init);
    document.querySelectorAll('[data-sidebar-collapse]').forEach(initSidebarCollapse);
    initMastheadNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
