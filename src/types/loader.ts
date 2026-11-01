import type { EverythingRequestParams } from './api';

export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export interface LoaderOptions {
    apiKey: string;
}

export type QueryOptions = Partial<EverythingRequestParams>;

export interface RequestParams {
    endpoint: Endpoint;
    options?: QueryOptions;
}
