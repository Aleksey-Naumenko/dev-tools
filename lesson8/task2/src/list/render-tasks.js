import { getItem, setItem } from './storage.js';
import { getTasksList } from './createGeteway.js';

import './index.scss';

export { renderTasksList };

document.addEventListener('DOMContentLoaded', () => {
    getTasksList()
        .then(tasksList => {
            setItem('tasksList', tasksList);
            renderTasksList();
        })
});

const renderTasksList = () => {
    const list = document.querySelector('.list');
    list.innerHTML = '';

    const tasksList = getItem('tasksList') || 0;

    const listElements = tasksList
        .sort((a, b) => b.dateCreated - a.dateCreated)
        .sort((a, b) => a.dateDone - b.dateDone)
        .sort((a, b) => a.done - b.done)
        .map( ({ text, done, id }) => {
            console.log(text, done, id);
            const listElement = document.createElement('li');
            listElement.classList.add('list__item');
            if (done) {
                listElement.classList.add('list__item_done');
            }
            const checkboxElement = document.createElement('input');
            checkboxElement.setAttribute('type', 'checkbox');
            checkboxElement.setAttribute('data-id', id);
            checkboxElement.checked = done;
            checkboxElement.classList.add('list__item-checkbox');

            const textElem = document.createElement('span');
            textElem.classList.add('list__item-text');
            textElem.textContent = text;

            const deleteBtnElem = document.createElement('button');
            deleteBtnElem.classList.add('delete-btn');

            listElement.append(checkboxElement, textElem, deleteBtnElem);

            return listElement;
        });
        list.append(...listElements);
}