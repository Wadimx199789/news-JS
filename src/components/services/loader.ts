import type { Callback, ErrorCallback } from '../../types/handlers';
import type { Endpoint, LoaderOptions, QueryOptions, RequestParams } from '../../types/loader';

class Loader {
    private readonly baseLink: string;
    private readonly options: Readonly<LoaderOptions>;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>({ endpoint, options = {} }: RequestParams, onSuccess: Callback<T>, onError: ErrorCallback): void {
        this.load<T>(endpoint, onSuccess, onError, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }

        return res;
    }

    private makeUrl(options: QueryOptions, endpoint: Endpoint): string {
        const urlOptions: Record<string, string | undefined> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.entries(urlOptions).forEach(([key, value]) => {
            if (value !== undefined) {
                url += `${key}=${value}&`;
            }
        });

        return url.slice(0, -1);
    }

    private load<T>(
        endpoint: Endpoint,
        onSuccess: Callback<T>,
        onError: ErrorCallback,
        options: QueryOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint))
            .then((res) => this.errorHandler(res))
            .then((res) => res.json() as Promise<T>)
            .then((data) => onSuccess(data))
            .catch((err: unknown) => onError(err instanceof Error ? err : new Error(String(err))));
    }
}

export default Loader;
