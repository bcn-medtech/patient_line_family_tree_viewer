"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Search = _interopRequireDefault(require("../Search"));

var _instanceId = _interopRequireDefault(require("./tools/instanceId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

var getInstanceId = (0, _instanceId.default)();

var TableToolbarSearch = function TableToolbarSearch(_ref) {
  var className = _ref.className,
      searchContainerClass = _ref.searchContainerClass,
      onChange = _ref.onChange,
      _ref$id = _ref.id,
      id = _ref$id === void 0 ? "data-table-search-".concat(getInstanceId()) : _ref$id,
      rest = _objectWithoutProperties(_ref, ["className", "searchContainerClass", "onChange", "id"]);

  var searchContainerClasses = (0, _classnames.default)(searchContainerClass, 'bx--toolbar-search-container');
  return _react.default.createElement("div", {
    className: searchContainerClasses
  }, _react.default.createElement(_Search.default, _extends({
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
  children: _propTypes.default.node,

  /**
   * Provide an optional class name for the search container
   */
  className: _propTypes.default.string,

  /**
   * Provide an optional id for the search container
   */
  id: _propTypes.default.string,
  searchContainerClasses: _propTypes.default.string,

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange: _propTypes.default.func
};
var _default = TableToolbarSearch;
exports.default = _default;