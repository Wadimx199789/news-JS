import type Loader from '../services/loader';
import { Endpoint } from '../../types/loader';
import type { ArticleDto, ArticlesResponseDto, SourceDto, SourcesResponseDto } from '../../types/api';
import type { Callback, ErrorCallback } from '../../types/handlers';

const NEWS_LIMIT = 10;

class NewsModel {
    private readonly loader: Loader;
    private selectedSourceId: string | null = null;

    constructor(loader: Loader) {
        this.loader = loader;
    }

    public getSources(onSuccess: Callback<SourceDto[]>, onError: ErrorCallback): void {
        this.loader.getResp<SourcesResponseDto>(
            {
                endpoint: Endpoint.Sources,
            },
            (data) => onSuccess(data.sources),
            onError
        );
    }

    public getNews(onSuccess: Callback<ArticleDto[]>, onError: ErrorCallback): void {
        if (!this.selectedSourceId) return;

        this.loader.getResp<ArticlesResponseDto>(
            {
                endpoint: Endpoint.Everything,
                options: {
                    sources: this.selectedSourceId,
                },
            },
            (data) => onSuccess(data.articles.slice(0, NEWS_LIMIT)),
            onError
        );
    }

    public selectSource(sourceId: string): boolean {
        if (this.selectedSourceId === sourceId) return false;

        this.selectedSourceId = sourceId;
        return true;
    }
}

export default NewsModel;
