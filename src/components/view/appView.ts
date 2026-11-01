import News from './news/news';
import Sources from './sources/sources';
import { getElement } from '../../utils/dom';
import type { ArticleDto, SourceDto } from '../../types/api';
import type { SourceSelectHandler } from '../../types/handlers';

class AppView {
    private readonly news = new News();
    private readonly sources = new Sources();

    constructor() {
        this.enableWheelScroll();
    }

    drawNews(articles: ArticleDto[]): void {
        this.news.draw(articles);
    }

    drawSources(sources: SourceDto[]): void {
        this.sources.draw(sources);
    }

    setActiveSource(sourceId: string): void {
        this.sources.setActive(sourceId);
    }

    showLoading(): void {
        this.news.showLoading();
    }

    showError(error: Error): void {
        console.error(error);
        this.news.showMessage(`Sorry, something went wrong: ${error.message}`);
    }

    bindSourceSelect(handler: SourceSelectHandler): void {
        const sourcesContainer = getElement('.sources');

        sourcesContainer.addEventListener('click', (e) => {
            if (!(e.target instanceof Element)) return;

            const sourceItem = e.target.closest('.source__item');
            const sourceId = sourceItem?.getAttribute('data-source-id');

            if (sourceItem && sourcesContainer.contains(sourceItem) && sourceId) {
                handler(sourceId);
            }
        });
    }

    private enableWheelScroll(): void {
        const sourcesContainer = getElement('.sources');

        sourcesContainer.addEventListener(
            'wheel',
            (e) => {
                if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

                e.preventDefault();
                sourcesContainer.scrollLeft += e.deltaY;
            },
            { passive: false }
        );
    }
}

export default AppView;
