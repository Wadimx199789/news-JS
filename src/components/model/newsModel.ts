const NEWS_LIMIT = 10;

class NewsModel {
    constructor(loader) {
        this.loader = loader;
        this.selectedSourceId = null;
    }

    getSources(onSuccess, onError) {
        this.loader.getResp(
            {
                endpoint: 'sources',
            },
            (data) => onSuccess(data?.sources ?? []),
            onError
        );
    }

    getNews(onSuccess, onError) {
        this.loader.getResp(
            {
                endpoint: 'everything',
                options: {
                    sources: this.selectedSourceId,
                },
            },
            (data) => onSuccess((data?.articles ?? []).slice(0, NEWS_LIMIT)),
            onError
        );
    }

    selectSource(sourceId) {
        if (this.selectedSourceId === sourceId) return false;

        this.selectedSourceId = sourceId;
        return true;
    }
}

export default NewsModel;
