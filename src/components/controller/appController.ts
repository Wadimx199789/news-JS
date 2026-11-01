class AppController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    start() {
        this.view.bindSourceSelect((sourceId) => this.handleSourceSelect(sourceId));
        this.model.getSources(
            (sources) => this.view.drawSources(sources),
            (error) => this.view.showError(error)
        );
    }

    handleSourceSelect(sourceId) {
        if (!this.model.selectSource(sourceId)) return;

        this.model.getNews(
            (articles) => this.view.drawNews(articles),
            (error) => this.view.showError(error)
        );
    }
}

export default AppController;
