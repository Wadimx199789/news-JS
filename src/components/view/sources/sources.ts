import './sources.css';
import { getElement } from '../../../utils/dom';
import type { SourceDto } from '../../../types/api';

class Sources {
    draw(data: SourceDto[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = getElement<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            getElement('.source__item-name', sourceClone).textContent = item.name;
            getElement('.source__item', sourceClone).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = getElement('.sources');
        sourcesContainer.innerHTML = '';
        sourcesContainer.append(fragment);
    }

    setActive(sourceId: string): void {
        getElement('.sources')
            .querySelectorAll<HTMLElement>('.source__item')
            .forEach((item) => {
                item.setAttribute('aria-pressed', String(item.dataset.sourceId === sourceId));
            });
    }
}

export default Sources;
