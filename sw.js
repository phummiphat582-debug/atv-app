self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => self.clients.claim());

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // ❌ อย่าดัก Firebase / Google APIs
  if (
    url.origin.includes('googleapis.com') ||
    url.origin.includes('gstatic.com')
  ) {
    return;
  }

  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
