import type NewsModel from '../model/newsModel';
import type AppView from '../view/appView';

class AppController {
    private readonly model: NewsModel;
    private readonly view: AppView;

    constructor(model: NewsModel, view: AppView) {
        this.model = model;
        this.view = view;
    }

    public start(): void {
        this.view.bindSourceSelect((sourceId) => this.handleSourceSelect(sourceId));
        this.model.getSources(
            (sources) => this.view.drawSources(sources),
            (error) => this.view.showError(error)
        );
    }

    private handleSourceSelect(sourceId: string): void {
        if (!this.model.selectSource(sourceId)) return;

        this.model.getNews(
            (articles) => this.view.drawNews(articles),
            (error) => this.view.showError(error)
        );
    }
}

export default AppController;
