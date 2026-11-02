export enum HttpStatus {
    OK = 200,
    BadRequest = 400,
    Unauthorized = 401,
    TooManyRequests = 429,
    ServerError = 500,
}

export type ResponseStatus = 'ok' | 'error';

export type ErrorCode =
    | 'apiKeyDisabled'
    | 'apiKeyExhausted'
    | 'apiKeyInvalid'
    | 'apiKeyMissing'
    | 'parameterInvalid'
    | 'parametersMissing'
    | 'rateLimited'
    | 'sourcesTooMany'
    | 'sourceDoesNotExist'
    | 'unexpectedError';

export interface ErrorResponseDto {
    status: ResponseStatus;
    code: ErrorCode;
    message: string;
}

export interface SourceDto {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface SourcesResponseDto {
    status: ResponseStatus;
    sources: SourceDto[];
}

export type ArticleSourceDto = Pick<SourceDto, 'id' | 'name'>;

export interface ArticleDto {
    source: ArticleSourceDto;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface ArticlesResponseDto {
    status: ResponseStatus;
    totalResults: number;
    articles: ArticleDto[];
}

export interface EverythingRequestParams {
    sources: string;
}
