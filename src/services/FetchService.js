class FetchService {
    constructor(apiBaseUrl) {
        this.apiBaseUrl = apiBaseUrl;
    }

    async fetch(url, options = {}) {
        const response = await fetch(`${this.apiBaseUrl}${url}`, options);
        if (!response.ok) {
            throw new Error('Conexão com API não encontrada!');
        }
        return response.json();
    }
}
export default FetchService;