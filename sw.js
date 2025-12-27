self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // ❌ อย่าไปดัก request ของ Firebase / Google
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
