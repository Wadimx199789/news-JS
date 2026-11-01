import News from './news/news';
import Sources from './sources/sources';
import { getElement } from '../../utils/dom';

class AppView {
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(articles) {
        this.news.draw(articles);
    }

    drawSources(sources) {
        this.sources.draw(sources);
    }

    showError(error) {
        console.error(error);
        this.news.showMessage(`Sorry, something went wrong: ${error.message}`);
    }

    bindSourceSelect(handler) {
        const sourcesContainer = getElement('.sources');

        sourcesContainer.addEventListener('click', (e) => {
            let target = e.target;

            while (target !== sourcesContainer) {
                if (target.classList.contains('source__item')) {
                    handler(target.getAttribute('data-source-id'));
                    return;
                }
                target = target.parentNode;
            }
        });
    }
}

export default AppView;
