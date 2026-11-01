class Loader {
    constructor(baseLink, options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp({ endpoint, options = {} }, onSuccess, onError) {
        this.load('GET', endpoint, onSuccess, onError, options);
    }

    errorHandler(res) {
        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }

        return res;
    }

    makeUrl(options, endpoint) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method, endpoint, onSuccess, onError, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => onSuccess(data))
            .catch((err) => onError(err));
    }
}

export default Loader;
