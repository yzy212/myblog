// 外观设置：配色 + 字号 + 字体
(function () {
  var KEY_ACCENT = 'accent-theme';
  var KEY_FONT_SIZE = 'font-size';
  var KEY_FONT_FAMILY = 'font-family';

  var ACCENTS = [
    { name: 'default', color: '#49b1f5' },
    { name: 'green', color: '#34a853' },
    { name: 'pink', color: '#f472b6' },
    { name: 'orange', color: '#ff9800' },
    { name: 'purple', color: '#8b5cf6' }
  ];

  var FONTS = [
    { name: 'default', label: '默认' },
    { name: 'serif', label: '宋体' },
    { name: 'hei', label: '黑体' },
    { name: 'kai', label: '楷体' }
  ];

  var SIZE = { min: 12, max: 22, step: 2, default: 14 };

  function getStored(key, def) {
    try { return localStorage.getItem(key) || def; } catch (e) { return def; }
  }
  function setStored(key, val) {
    try { localStorage.setItem(key, val); } catch (e) {}
  }

  function applyAccent(name) {
    if (name && name !== 'default') {
      document.documentElement.setAttribute('data-accent', name);
    } else {
      document.documentElement.removeAttribute('data-accent');
    }
    document.querySelectorAll('.ap-dot').forEach(function (d) {
      d.classList.toggle('active', d.dataset.accent === name);
    });
  }

  function applyFontSize(px) {
    document.documentElement.style.setProperty('--global-font-size', px + 'px');
    document.querySelectorAll('.ap-btn[data-font-size]').forEach(function (b) {
      b.classList.remove('active');
    });
  }

  function applyFontFamily(name) {
    if (name && name !== 'default') {
      document.documentElement.setAttribute('data-font-family', name);
    } else {
      document.documentElement.removeAttribute('data-font-family');
    }
    document.querySelectorAll('.ap-btn[data-font-family]').forEach(function (b) {
      b.classList.toggle('active', b.dataset.fontFamily === name);
    });
  }

  function buildPanel() {
    var panel = document.createElement('div');
    panel.className = 'appearance-panel';

    // 配色行
    var accentGroup = document.createElement('div');
    accentGroup.className = 'ap-group';
    var accentTitle = document.createElement('span');
    accentTitle.className = 'ap-title';
    accentTitle.textContent = '配色';
    accentGroup.appendChild(accentTitle);
    var dots = document.createElement('div');
    dots.className = 'ap-dots';
    ACCENTS.forEach(function (a) {
      var dot = document.createElement('div');
      dot.className = 'ap-dot';
      dot.dataset.accent = a.name;
      dot.style.background = a.color;
      dot.title = a.name;
      dot.addEventListener('click', function () {
        applyAccent(a.name);
        setStored(KEY_ACCENT, a.name);
      });
      dots.appendChild(dot);
    });
    accentGroup.appendChild(dots);
    panel.appendChild(accentGroup);

    // 字号行
    var sizeGroup = document.createElement('div');
    sizeGroup.className = 'ap-group';
    var sizeTitle = document.createElement('span');
    sizeTitle.className = 'ap-title';
    sizeTitle.textContent = '字号';
    sizeGroup.appendChild(sizeTitle);
    var sizeBtns = document.createElement('div');
    sizeBtns.className = 'ap-btns';
    ['decrease', 'increase'].forEach(function (action) {
      var btn = document.createElement('button');
      btn.className = 'ap-btn';
      btn.dataset.fontSize = action;
      btn.textContent = action === 'decrease' ? 'A-' : 'A+';
      btn.addEventListener('click', function () {
        var cur = parseInt(getStored(KEY_FONT_SIZE, SIZE.default), 10);
        var next = action === 'decrease' ? cur - SIZE.step : cur + SIZE.step;
        if (next < SIZE.min) next = SIZE.min;
        if (next > SIZE.max) next = SIZE.max;
        applyFontSize(next);
        setStored(KEY_FONT_SIZE, next);
      });
      sizeBtns.appendChild(btn);
    });
    sizeGroup.appendChild(sizeBtns);
    panel.appendChild(sizeGroup);

    // 字体行
    var fontGroup = document.createElement('div');
    fontGroup.className = 'ap-group';
    var fontTitle = document.createElement('span');
    fontTitle.className = 'ap-title';
    fontTitle.textContent = '字体';
    fontGroup.appendChild(fontTitle);
    var fontBtns = document.createElement('div');
    fontBtns.className = 'ap-btns';
    FONTS.forEach(function (f) {
      var btn = document.createElement('button');
      btn.className = 'ap-btn';
      btn.dataset.fontFamily = f.name;
      btn.textContent = f.label;
      btn.addEventListener('click', function () {
        applyFontFamily(f.name);
        setStored(KEY_FONT_FAMILY, f.name);
      });
      fontBtns.appendChild(btn);
    });
    fontGroup.appendChild(fontBtns);
    panel.appendChild(fontGroup);

    document.body.appendChild(panel);
  }

  function init() {
    buildPanel();
    applyAccent(getStored(KEY_ACCENT, 'default'));
    applyFontSize(parseInt(getStored(KEY_FONT_SIZE, SIZE.default), 10));
    applyFontFamily(getStored(KEY_FONT_FAMILY, 'default'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
