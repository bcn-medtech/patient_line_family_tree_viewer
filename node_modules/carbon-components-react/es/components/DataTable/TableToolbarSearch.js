function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Search from '../Search';
import setupGetInstanceId from './tools/instanceId';
var getInstanceId = setupGetInstanceId();

var TableToolbarSearch = function TableToolbarSearch(_ref) {
  var className = _ref.className,
      searchContainerClass = _ref.searchContainerClass,
      onChange = _ref.onChange,
      _ref$id = _ref.id,
      id = _ref$id === void 0 ? "data-table-search-".concat(getInstanceId()) : _ref$id,
      rest = _objectWithoutProperties(_ref, ["className", "searchContainerClass", "onChange", "id"]);

  var searchContainerClasses = cx(searchContainerClass, 'bx--toolbar-search-container');
  return React.createElement("div", {
    className: searchContainerClasses
  }, React.createElement(Search, _extends({
    className: className
  }, rest, {
    small: true,
    id: id,
    labelText: "Filter table",
    placeHolderText: "Search",
    onChange: onChange
  })));
};

TableToolbarSearch.propTypes = {
  children: PropTypes.node,

  /**
   * Provide an optional class name for the search container
   */
  className: PropTypes.string,

  /**
   * Provide an optional id for the search container
   */
  id: PropTypes.string,
  searchContainerClasses: PropTypes.string,

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange: PropTypes.func
};
export default TableToolbarSearch;