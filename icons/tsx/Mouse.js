"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var StyledMouse = styled_components_1.default.i(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  &{box-sizing:border-box;position:relative;display:block;transform:scale(var(--ggs,1));width:16px;height:24px;border:2px solid;border-radius:10px}&::after{content:\"\";display:block;box-sizing:border-box;position:absolute;border-radius:3px;width:2px;height:6px;background:currentColor;top:3px;left:5px}\n"], ["\n  &{box-sizing:border-box;position:relative;display:block;transform:scale(var(--ggs,1));width:16px;height:24px;border:2px solid;border-radius:10px}&::after{content:\"\";display:block;box-sizing:border-box;position:absolute;border-radius:3px;width:2px;height:6px;background:currentColor;top:3px;left:5px}\n"])));
exports.Mouse = react_1.default.forwardRef(function (props, ref) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(StyledMouse, tslib_1.__assign({}, props, { ref: ref, "icon-role": "mouse" }))));
});
var templateObject_1;
//# sourceMappingURL=Mouse.js.map