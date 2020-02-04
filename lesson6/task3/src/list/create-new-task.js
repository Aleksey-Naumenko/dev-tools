import { setItem } from './storage.js';
import { renderTasksList } from './render-tasks.js';
import { createTask, getTasksList } from './createGeteway.js';

export { addNewTask };


const creteBtn = document.querySelector('.create-btn');
const addNewTask = () => {
    const input = document.querySelector('.task-input');

    if (!input.value) return;

    const newTask = {
        text: `${input.value}`,
        done: false,
        dateCreated: new Date().toISOString(),
        dateDone: null
    };

    input.value = '';

    createTask(newTask)
        .then(() => getTasksList())
        .then(newTasksList => {
            console.log(newTasksList);
            setItem('tasksList', newTasksList);
            renderTasksList();
        });
}

const addNewTaskHandler = creteBtn.addEventListener('click', addNewTask);