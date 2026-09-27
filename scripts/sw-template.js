const CACHE = 'amanat-offline-__VERSION__'
const FILES = /* __PRECACHE__ */ []
const URLS = new Set(FILES.map(path => new URL(path, self.location.origin).href))

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE)
    // Installation succeeds only when every route chunk and font is present.
    // A failed new version cannot replace the previously working offline copy.
    await cache.addAll(FILES.map(path => new Request(path, { cache: 'reload' })))
  })())
})

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    // Retain two prior packages for existing tabs without accumulating every
    // historical build. Unrelated caches and local progress are untouched.
    const old = (await caches.keys()).filter(name => name.startsWith('amanat-offline-') && name !== CACHE)
    await Promise.all(old.slice(0, -2).map(name => caches.delete(name)))
    await self.clients.claim()
  })())
})

self.addEventListener('message', event => {
  if (event.data?.type === 'ACTIVATE_UPDATE') self.skipWaiting()
})

self.addEventListener('fetch', event => {
  const request = event.request
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin || request.headers.has('range')) return
  const isPage = request.mode === 'navigate' && !url.pathname.startsWith('/design/') && !/\.[a-z0-9]+$/i.test(url.pathname)
  if (isPage) {
    event.respondWith(caches.open(CACHE).then(cache => cache.match('/index.html')).then(response => response || fetch(request)))
  } else if (URLS.has(url.href)) {
    event.respondWith(caches.open(CACHE).then(cache => cache.match(request)).then(response => response || fetch(request)))
  } else if (url.pathname.startsWith('/assets/')) {
    event.respondWith(caches.match(request).then(response => response || fetch(request)))
  }
})
