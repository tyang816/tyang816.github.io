(function () {
  function initTabs(root) {
    var buttons = root.querySelectorAll("[data-tab]");
    var panels = root.querySelectorAll("[data-panel]");
    if (!buttons.length || !panels.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-tab");
        buttons.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        panels.forEach(function (panel) {
          panel.classList.toggle(
            "is-active",
            panel.getAttribute("data-panel") === id
          );
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-tabs]").forEach(initTabs);
  });
})();
