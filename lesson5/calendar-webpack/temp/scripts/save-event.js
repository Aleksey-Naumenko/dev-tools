import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.reduce";
import "core-js/modules/es.object.keys";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.split";
import "core-js/modules/web.dom-collections.iterator";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import { renderEvents } from './render-events.js';
import { popupForm, closePopup } from './create-popup.js';
import { saveEvent, updateEvent } from './gateways.js';
export { editSaveHandler };

var editSaveHandler = function editSaveHandler(event) {
  event.preventDefault();

  var formData = _toConsumableArray(new FormData(popupForm));

  var newEvent = formData.reduce(function (acc, item) {
    acc[item[0]] = item[1];
    return acc;
  }, {});
  var timeFrom = newEvent.timeFrom.split(':');
  newEvent.dateFrom = new Date(new Date(newEvent.dateFrom).setHours(+timeFrom[0], +timeFrom[1])).toISOString();
  var timeTo = newEvent.timeTo.split(':');
  newEvent.dateTo = new Date(new Date(newEvent.dateTo).setHours(+timeTo[0], +timeTo[1])).toISOString();

  if (newEvent.id === "0") {
    if (newEvent.title == '') {
      newEvent.title = 'No Title';
    }

    var id = newEvent.id,
        rest = _objectWithoutProperties(newEvent, ["id"]);

    saveEvent(rest).catch(function (err) {
      return console.log(err.stack);
    });
  } else {
    var _id = newEvent.id,
        _rest = _objectWithoutProperties(newEvent, ["id"]);

    updateEvent(_id, _rest).catch(function (err) {
      return console.log(err.stack);
    });
  }

  closePopup();
  renderEvents();
};

popupForm.addEventListener('submit', editSaveHandler);