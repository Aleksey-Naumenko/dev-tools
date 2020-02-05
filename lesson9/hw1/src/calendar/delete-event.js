import { renderEvents } from './render-events.js';
import { closePopup, deleteButton } from './create-popup.js';
import { deleteEvent } from './gateways.js';



export { deleteEv };


function deleteEv(e) {

    const parentPopup = deleteButton.closest('.popup');
    const clickedEventId = new FormData(parentPopup).get('id');

    deleteEvent(clickedEventId)
        .catch(err => console.log(err.stack));

    renderEvents();
    closePopup();
};

deleteButton.addEventListener('click', deleteEv);