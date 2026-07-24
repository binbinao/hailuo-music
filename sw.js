// 海螺音乐 Service Worker
// 策略:
//  - HTML/JSON:  network-first (网络优先, 离线时使用 cache)
//  - MP3 / 静态资源: cache-first (缓存优先, 离线时已加载的还能放)
//
// 重要: GitHub Pages 是强力缓存 (sha 路径), 这里只缓存我们的 shell
const CACHE = 'hailuo-music-v1';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);

  // 只处理同源请求, 否则直传 (gif/raw.githubusercontent.com 也直传)
  if (url.origin !== self.location.origin) return;

  // GET 才有意义
  if (req.method !== 'GET') return;

  // HTML / JSON: network-first
  if (req.mode === 'navigate' ||
      req.headers.get('accept')?.includes('text/html') ||
      req.headers.get('accept')?.includes('application/json')) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('index.html')))
    );
    return;
  }

  // 其他 (图片 / mp3): cache-first
  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      });
    })
  );
});
