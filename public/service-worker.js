const CACHE_NAME = 'my-app-cache-v1';


// Evento de instalação
this.addEventListener('install', (event) => {
    console.log('Service Worker: Install event in progress.');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching app shell');
                return cache.addAll('/index.html');
            })
            .catch((error) => {
                console.error('Service Worker: Failed to cache', error);
            })
    );
});

// Evento de ativação
this.addEventListener('activate', (event) => {
  console.log('Service Worker: Activate event in progress.');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
          return null; // Add this line to return null for the other cases
        })
      );
    })
  );
});

this.addEventListener('fetch', (event) => {
    event.respondWith(
      (async function() {
        try {
          const tokenAqui = await getToken();
          const headers = new Headers(event.request.headers);
          headers.append('Authorization', `Bearer ${tokenAqui}`);
  
          // Altera a requisição para incluir o token
          const requisicaoModificada = new Request(event.request, {
            method: event.request.method,
            headers: headers,
            body: event.request.body,
            mode: 'same-origin',  // Certifique-se de que o modo é correto
            credentials: 'same-origin'  // Certifique-se de que as credenciais são mantidas
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
        } catch (error) {
          console.error('Erro na interceptação da fetch:', error);
          return fetch(event.request);
        }
      })()
    );
  });
  
 // Função para obter o token do IndexedDB
function getToken() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('my-database', 1);

    request.onerror = (event) => {
      console.error('Erro ao abrir o IndexedDB', event);
      reject('Erro ao abrir o IndexedDB');
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['tokens'], 'readonly');
      const store = transaction.objectStore('tokens');
      const getRequest = store.get('auth-token');

      getRequest.onerror = (event) => {
        console.error('Erro ao obter o token', event);
        reject('Erro ao obter o token');
      };

      getRequest.onsuccess = (event) => {
        resolve(event.target.result);
      };
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('tokens')) {
        db.createObjectStore('tokens');
      }
    };
  });
}