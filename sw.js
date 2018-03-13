const cacheVersion = '0'
const cacheKey = `vap-cache-${cacheVersion}`
const cacheList = [
  '/',
  '/dist/vue-awesome-picker.js',
  '/static/img/vue-logo.png'
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheKey)
      .then(cache => cache.addAll(cacheList))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response != null) {
        return response
      }
      return fetch(e.request.url)
    })
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    Promise.all(
      caches.keys().then(cacheNames => {
        return cacheNames.map(name => {
          if (name !== cacheKey) {
            return caches.delete(name)
          }
        })
      })
    ).then(() => {
      return self.clients.claim()
    })
  )
})