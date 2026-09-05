// 配色主题切换
(function () {
  var STORAGE_KEY = 'accent-theme';

  var THEMES = [
    { name: 'default', color: '#49b1f5' },
    { name: 'green', color: '#34a853' },
    { name: 'pink', color: '#f472b6' },
    { name: 'orange', color: '#ff9800' },
    { name: 'purple', color: '#8b5cf6' }
  ];

  function applyTheme(name) {
    if (name && name !== 'default') {
      document.documentElement.setAttribute('data-accent', name);
    } else {
      document.documentElement.removeAttribute('data-accent');
    }
    document.querySelectorAll('.theme-palette .dot').forEach(function (dot) {
      dot.classList.toggle('active', dot.dataset.theme === name);
    });
  }

  function buildPalette() {
    var palette = document.createElement('div');
    palette.className = 'theme-palette';

    THEMES.forEach(function (t) {
      var dot = document.createElement('div');
      dot.className = 'dot';
      dot.dataset.theme = t.name;
      dot.style.background = t.color;
      dot.title = t.name;
      dot.addEventListener('click', function () {
        applyTheme(t.name);
        try {
          localStorage.setItem(STORAGE_KEY, t.name);
        } catch (e) {}
      });
      palette.appendChild(dot);
    });

    document.body.appendChild(palette);
  }

  function init() {
    buildPalette();
    var saved = 'default';
    try {
      saved = localStorage.getItem(STORAGE_KEY) || 'default';
    } catch (e) {}
    applyTheme(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
