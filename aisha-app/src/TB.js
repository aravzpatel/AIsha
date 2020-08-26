"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TextBox extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      formSubmit: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.responseHandle = this.responseHandle.bind(this);
  }

  responseHandle(response) {}

  onSubmit(event) {
    event.preventDefault();

    _axios.default.post('/api/help', {
      user_input: 'I am having an awful day'
    }).then(response => {
      this.setState({
        formSubmit: true,
        response: response.data.response
      });
    }); // this.props.submit();

  }

  render() {
    let response = null;

    if (this.state.formSubmit === true) {
      response = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
        "data-testid": "response"
      }, this.state.response));
    }

    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("form", {
      onSubmit: this.onSubmit
    }, /*#__PURE__*/_react.default.createElement("label", null, "Input", /*#__PURE__*/_react.default.createElement("input", {
      type: "text"
    })), /*#__PURE__*/_react.default.createElement("input", {
      type: "submit",
      value: "Submit"
    })), response);
  }

}

var _default = TextBox;
exports.default = _default;