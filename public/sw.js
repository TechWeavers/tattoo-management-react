const CACHE_NAME = 'my-cache';

this.addEventListener('install', (event) => {
    console.log('Service Worker instalado com sucesso!')
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/manifest.json'                
                ]).then(() => this.skipWaiting());
            })
    );
});

this.addEventListener('activate', (event) => {
    console.log('Service Worker ativado com sucesso!')
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
        })
    );
});

this.addEventListener('fetch', (event) => {
    console.log('Requisição interceptada:', event.request.url);
    if (navigator.onLine) {
        var fetchRequest = event.request.clone();
                return fetch(fetchRequest).then((response) => {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    var responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                }) 
            } else {
                event.respondWith(
                    caches.match(event.request).then((response) => {
                        return response || fetch(event.request);
                    })
                );
            }
        });

<script>
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .then((registration) => {
                console.log('Service Worker registrado com sucesso:', registration);
                return navigator.serviceWorker.ready;
            })
            .then((registration) => {
                console.log('Service Worker pronto para uso:', registration);
            })
            .catch((error) => {
                console.log('Falha ao registrar o Service Worker:', error);
            })
    }

</script>