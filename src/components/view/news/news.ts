import './news.css';
import { getElement } from '../../../utils/dom';
import type { ArticleDto } from '../../../types/api';

class News {
    draw(data: ArticleDto[]): void {
        const fragment = document.createDocumentFragment();
        const newsItemTemp = getElement<HTMLTemplateElement>('#newsItemTemp');

        data.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) getElement('.news__item', newsClone).classList.add('alt');

            if (item.urlToImage) {
                getElement('.news__meta-photo', newsClone).style.backgroundImage = `url(${item.urlToImage})`;
            }
            getElement('.news__meta-author', newsClone).textContent = item.author || item.source.name;
            getElement('.news__meta-date', newsClone).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            getElement('.news__description-title', newsClone).textContent = item.title;
            getElement('.news__description-source', newsClone).textContent = item.source.name;
            getElement('.news__description-content', newsClone).textContent = item.description;
            getElement('.news__read-more a', newsClone).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = getElement('.news');
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }

    showMessage(message: string): void {
        this.renderMessage(message);
    }

    showLoading(): void {
        this.renderMessage('Loading news…', 'news__message--loading');
    }

    private renderMessage(message: string, modifier?: string): void {
        const messageElement = document.createElement('p');
        messageElement.className = 'news__message';
        if (modifier) messageElement.classList.add(modifier);
        messageElement.textContent = message;

        getElement('.news').replaceChildren(messageElement);
    }
}

export default News;
