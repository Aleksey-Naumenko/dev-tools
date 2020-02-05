import { setItem, getItem } from './storage.js';
import { renderTasksList } from './render-tasks.js';
import { updateTask, getTasksList, deleteTask } from './createGeteway.js';

export { onTasksListChange };


const listWithTasks = document.querySelector('.list');
const onTasksListChange = event => {

    const tasksList = getItem('tasksList');

    const taskId = event.target.dataset.id;
    const done = event.target.checked;
    const { text, dateCreated } = tasksList
        .find(task => task.id == taskId);

    const updatedTask = {
        text,
        done,
        dateCreated,
        dateDone: done ? new Date().toISOString() : null,
    }

    updateTask(taskId, updatedTask)
        .then(() => getTasksList())
        .then(newTasksList => {
            setItem('tasksList', newTasksList);
            renderTasksList();
        });
};


const onTaskDelete = event => {

    const targetTaskElem = event.target.parentNode.children[0];
    const targetTaskId = targetTaskElem.dataset.id;

    deleteTask(targetTaskId)
        .then(() => getTasksList())
        .then(newTasksList => {
            setItem('tasksList', newTasksList);
            renderTasksList();
        });
}


const onToggleList = event => {
    const isCheckbox = event.target.classList.contains('list__item-checkbox');
    const isDeleteBtn = event.target.classList.contains('delete-btn');

    if (isCheckbox) {
        onTasksListChange(event);
    } else if (isDeleteBtn) {
        onTaskDelete(event);
    }
}

const updateTasksListHandler = listWithTasks.addEventListener('click', onToggleList);