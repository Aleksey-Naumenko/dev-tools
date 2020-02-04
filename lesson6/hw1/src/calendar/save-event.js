import { renderEvents } from './render-events.js';
import { popupForm, closePopup } from './create-popup.js';
import { saveEvent, updateEvent } from './gateways.js';


export { editSaveHandler };

const editSaveHandler = event => {
    event.preventDefault();

    const formData = [...new FormData(popupForm)];

    const newEvent = formData.reduce((acc, item) => {
        acc[item[0]] = item[1];
        return acc;
    }, {});


    const timeFrom = (newEvent.timeFrom).split(':');
    newEvent.dateFrom = new Date(new Date(newEvent.dateFrom).setHours(+timeFrom[0], +timeFrom[1])).toISOString();
    const timeTo = (newEvent.timeTo).split(':');
    newEvent.dateTo = new Date(new Date(newEvent.dateTo).setHours(+timeTo[0], +timeTo[1])).toISOString();


    if (newEvent.id === "0") {

        if (newEvent.title == '') {
            newEvent.title = 'No Title';
        }
        const { id, ...rest } = newEvent;
        saveEvent(rest)
            .catch(err => console.log(err.stack));
    } else {
        const { id, ...rest } = newEvent;
        updateEvent(id, rest)
            .catch(err => console.log(err.stack));    }
    closePopup();
    renderEvents();
}

popupForm.addEventListener('submit', editSaveHandler);