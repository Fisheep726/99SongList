(function () {
  'use strict';

  var STORAGE_KEY = 'mySongList.local';
  var VERSION = 'v1.0.0'; // 页面版本号：每次改动后 +1，方便确认部署是否生效

  // 歌单数据来自 songs.js 里的 window.SONGS
  var baseSongs = Array.isArray(window.SONGS) ? window.SONGS : [];

  var els = {
    search: document.getElementById('search'),
    sort: document.getElementById('sort'),
    addBtn: document.getElementById('addBtn'),
    list: document.getElementById('list'),
    count: document.getElementById('count'),
    localCount: document.getElementById('localCount'),
    empty: document.getElementById('empty'),
    modal: document.getElementById('modal'),
    cancelBtn: document.getElementById('cancelBtn'),
    saveBtn: document.getElementById('saveBtn'),
    newName: document.getElementById('newName'),
    newArtist: document.getElementById('newArtist'),
    version: document.getElementById('version')
  };

  // ---- 本地添加的歌曲（存在浏览器 localStorage）----
  function loadLocal() {
    try {
      var arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function saveLocal(arr) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch (e) { /* 存储不可用时静默忽略 */ }
  }

  var localSongs = loadLocal();

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

  function getAllSongs() {
    return baseSongs.concat(
      localSongs.map(function (s) {
        return { name: s.name, artist: s.artist, local: true };
      })
    );
  }

  function getQuery() {
    return els.search.value.trim().toLowerCase();
  }

  function getSort() {
    return els.sort.value;
  }

  // ---- 渲染 ----
  function render() {
    var query = getQuery();
    var sort = getSort();
    var songs = getAllSongs().slice();

    if (query) {
      songs = songs.filter(function (s) {
        return (s.name || '').toLowerCase().indexOf(query) !== -1 ||
               (s.artist || '').toLowerCase().indexOf(query) !== -1;
      });
    }

    if (sort === 'name') {
      songs.sort(function (a, b) { return compare(a.name || '', b.name || ''); });
    } else if (sort === 'artist') {
      songs.sort(function (a, b) {
        var c = compare(a.artist || '', b.artist || '');
        return c !== 0 ? c : compare(a.name || '', b.name || '');
      });
    }

    els.list.innerHTML = '';
    songs.forEach(function (s) {
      els.list.appendChild(buildItem(s));
    });

    els.count.textContent = '共 ' + songs.length + ' 首';
    els.empty.hidden = songs.length !== 0;

    var localCount = localSongs.length;
    els.localCount.hidden = localCount === 0;
    els.localCount.textContent = '（含本地添加 ' + localCount + ' 首）';
  }

  function buildItem(s) {
    var li = document.createElement('li');
    li.className = 'song' + (s.local ? ' is-local' : '');

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

    if (s.local) {
      var badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = '本地';
      li.appendChild(badge);

      var del = document.createElement('button');
      del.className = 'del';
      del.type = 'button';
      del.title = '删除这条本地歌曲';
      del.setAttribute('aria-label', '删除 ' + (s.name || '这首歌'));
      del.textContent = '✕';
      del.addEventListener('click', function () { removeLocal(s); });
      li.appendChild(del);
    }

    return li;
  }

  // ---- 本地歌曲的增删 ----
  function removeLocal(song) {
    localSongs = localSongs.filter(function (s) {
      return !(s.name === song.name && s.artist === song.artist);
    });
    saveLocal(localSongs);
    render();
  }

  function openModal() {
    els.newName.value = '';
    els.newArtist.value = '';
    els.modal.hidden = false;
    els.newName.focus();
  }

  function closeModal() {
    els.modal.hidden = true;
  }

  function saveNew() {
    var name = els.newName.value.trim();
    var artist = els.newArtist.value.trim();
    if (!name) {
      els.newName.focus();
      return;
    }
    localSongs.push({ name: name, artist: artist });
    saveLocal(localSongs);
    closeModal();
    render();
  }

  // ---- 事件绑定 ----
  var searchTimer;
  els.search.addEventListener('input', function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(render, 120);
  });
  els.sort.addEventListener('change', render);

  els.addBtn.addEventListener('click', openModal);
  els.cancelBtn.addEventListener('click', closeModal);
  els.saveBtn.addEventListener('click', saveNew);

  els.modal.addEventListener('click', function (e) {
    if (e.target === els.modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !els.modal.hidden) closeModal();
  });
  els.newName.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') saveNew();
  });
  els.newArtist.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') saveNew();
  });

  // 显示版本号
  if (els.version) els.version.textContent = VERSION;

  // 首次渲染
  render();
})();
