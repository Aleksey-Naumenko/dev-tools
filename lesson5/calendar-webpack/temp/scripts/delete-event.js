import { renderEvents } from './render-events.js';
import { closePopup, deleteButton } from './create-popup.js';
import { deleteEvent } from './gateways.js';
export { deleteEv };

function deleteEv(e) {
  var parentPopup = deleteButton.closest('.popup');
  var clickedEventId = new FormData(parentPopup).get('id');
  deleteEvent(clickedEventId).catch(function (err) {
    return console.log(err.stack);
  });
  renderEvents();
  closePopup();
}

;
deleteButton.addEventListener('click', deleteEv);