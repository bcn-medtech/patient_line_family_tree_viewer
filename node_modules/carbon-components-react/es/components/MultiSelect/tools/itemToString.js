function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import invariant from 'invariant';

var itemToString = function itemToString(item) {
  invariant(typeof item.label === 'string', '[MultiSelect] the default `itemToString` method expected to receive ' + 'an item with a `label` field of type `string`. Instead received: `%s`', _typeof(item.label));
  return item.label || '';
};

export var defaultItemToString = function defaultItemToString(item) {
  if (Array.isArray(item)) {
    return item.map(itemToString);
  }

  return itemToString(item);
};