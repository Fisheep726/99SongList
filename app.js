(function () {
  'use strict';

  var VERSION = 'v1.2.0'; // 页面版本号：每次改动后 +1，方便确认部署是否生效

  // 歌单数据来自 songs.js 里的 window.SONGS
  var songs = Array.isArray(window.SONGS) ? window.SONGS : [];

  var els = {
    search: document.getElementById('search'),
    sort: document.getElementById('sort'),
    list: document.getElementById('list'),
    count: document.getElementById('count'),
    empty: document.getElementById('empty'),
    version: document.getElementById('version'),
    indexBar: document.getElementById('indexBar')
  };

  // 中文排序器（按拼音），老浏览器回退到 localeCompare
  var collator;
  try {
    collator = new Intl.Collator('zh-Hans-CN', { sensitivity: 'base', numeric: true });
  } catch (e) {
    collator = null;
  }

  function compare(a, b) {
    return collator ? collator.compare(a, b) : String(a).localeCompare(String(b), 'zh');
  }

  function getQuery() {
    return els.search.value.trim().toLowerCase();
  }

  function getSort() {
    return els.sort.value;
  }

  var currentSongs = [];

  // ---- 右侧 A-Z 快速索引 ----
  function buildIndex() {
    if (!els.indexBar) return;
    els.indexBar.innerHTML = '';
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function (letter) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = letter;
      btn.className = 'index-item';
      btn.dataset.letter = letter;
      btn.addEventListener('click', function () { jumpTo(letter); });
      els.indexBar.appendChild(btn);
    });
  }

  function updateIndex() {
    if (!els.indexBar) return;
    var present = {};
    currentSongs.forEach(function (s) {
      present[window.getInitial(s.name)] = true;
    });
    Array.prototype.forEach.call(els.indexBar.children, function (btn) {
      var has = !!present[btn.dataset.letter];
      btn.disabled = !has;
      btn.classList.toggle('is-empty', !has);
    });
  }

  function jumpTo(letter) {
    var idx = -1;
    for (var i = 0; i < currentSongs.length; i++) {
      if (window.getInitial(currentSongs[i].name) === letter) { idx = i; break; }
    }
    if (idx === -1) return;
    var item = els.list.children[idx];
    if (item) item.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ---- 渲染 ----
  function render() {
    var query = getQuery();
    var sort = getSort();
    var list = songs.slice();

    if (query) {
      list = list.filter(function (s) {
        return (s.name || '').toLowerCase().indexOf(query) !== -1 ||
               (s.artist || '').toLowerCase().indexOf(query) !== -1;
      });
    }

    if (sort === 'name') {
      list.sort(function (a, b) { return compare(a.name || '', b.name || ''); });
    } else if (sort === 'artist') {
      list.sort(function (a, b) {
        var c = compare(a.artist || '', b.artist || '');
        return c !== 0 ? c : compare(a.name || '', b.name || '');
      });
    }

    currentSongs = list;

    els.list.innerHTML = '';
    list.forEach(function (s) {
      els.list.appendChild(buildItem(s));
    });

    els.count.textContent = '共 ' + list.length + ' 首';
    els.empty.hidden = list.length !== 0;

    updateIndex();
  }

  function buildItem(s) {
    var li = document.createElement('li');
    li.className = 'song';

    var info = document.createElement('div');
    info.className = 'song-info';

    var name = document.createElement('span');
    name.className = 'song-name';
    name.textContent = s.name || '未命名';

    var artist = document.createElement('span');
    artist.className = 'song-artist';
    artist.textContent = s.artist || '';

    info.appendChild(name);
    info.appendChild(artist);

    li.appendChild(info);

    return li;
  }

  // ---- 事件绑定 ----
  var searchTimer;
  els.search.addEventListener('input', function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(render, 120);
  });
  els.sort.addEventListener('change', render);

  // 显示版本号
  if (els.version) els.version.textContent = VERSION;

  // 构建 A-Z 索引
  buildIndex();

  // 首次渲染
  render();
})();
