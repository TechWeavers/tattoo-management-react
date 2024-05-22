const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    // Adicione outros arquivos que deseja cachear
];

// Evento de instalação
self.addEventListener('install', (event) => {
    console.log('Service Worker: Install event in progress.');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.error('Service Worker: Failed to cache', error);
            })
    );
});

// Evento de ativação
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activate event in progress.');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Evento de fetch com modificação da requisição
self.addEventListener('fetch', function(event) {
    event.respondWith(
        (async function() {
            // Função fictícia dbGet para obter token do IndexedDB ou qualquer armazenamento desejado
            const tokenAqui = localStorage.getItem('token');  
            const headers = new Headers(event.request.headers);
            headers.append('Authorization', `Bearer ${tokenAqui/*.token*/}`);

            // Altera a requisição para incluir o token
            const requisicaoModificada = new Request(event.request, {
                method: event.request.method,
                headers: headers,
                body: event.request.body
            });

            // Busca os recursos do cache
            const requisicaoCache = await caches.match(requisicaoModificada);
            if (requisicaoCache) {
                return requisicaoCache;
            }

            // Busca os recursos da rede
            const requisicaoRede = await fetch(requisicaoModificada);
            const cache = await caches.open(CACHE_NAME);

            // Atualiza os recursos no cache
            cache.put(event.request, requisicaoRede.clone());  
            return requisicaoRede;
        })()
    );
});


