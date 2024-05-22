// Função para armazenar o token no IndexedDB
export async function setToken(token) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('my-database', 1);

    request.onerror = (event) => {
      console.error('Erro ao abrir o IndexedDB', event);
      reject('Erro ao abrir o IndexedDB');
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['tokens'], 'readwrite');
      const store = transaction.objectStore('tokens');
      const putRequest = store.put(token, 'auth-token');

      putRequest.onerror = (event) => {
        console.error('Erro ao salvar o token', event);
        reject('Erro ao salvar o token');
      };

      putRequest.onsuccess = () => {
        resolve();
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

// Função para recuperar o token do IndexedDB
export async function getToken() {
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
