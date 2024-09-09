/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/context.js":
/*!************************!*\
  !*** ./src/context.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   NearContext: () => (/* binding */ NearContext)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n/**\n * @typedef NearContext\n * @property {import('./wallets/near').Wallet} wallet Current wallet\n * @property {string} signedAccountId The AccountId of the signed user\n */ /** @type {import ('react').Context<NearContext>} */ const NearContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({\n    wallet: undefined,\n    signedAccountId: \"\"\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGV4dC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBc0M7QUFFdEM7Ozs7Q0FJQyxHQUVELGtEQUFrRCxHQUMzQyxNQUFNQyw0QkFBY0Qsb0RBQWFBLENBQUM7SUFDdkNFLFFBQVFDO0lBQ1JDLGlCQUFpQjtBQUNuQixHQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGVsbG8tbmVhci8uL3NyYy9jb250ZXh0LmpzP2JlMjYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCB9IGZyb20gJ3JlYWN0JztcblxuLyoqXG4gKiBAdHlwZWRlZiBOZWFyQ29udGV4dFxuICogQHByb3BlcnR5IHtpbXBvcnQoJy4vd2FsbGV0cy9uZWFyJykuV2FsbGV0fSB3YWxsZXQgQ3VycmVudCB3YWxsZXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzaWduZWRBY2NvdW50SWQgVGhlIEFjY291bnRJZCBvZiB0aGUgc2lnbmVkIHVzZXJcbiAqL1xuXG4vKiogQHR5cGUge2ltcG9ydCAoJ3JlYWN0JykuQ29udGV4dDxOZWFyQ29udGV4dD59ICovXG5leHBvcnQgY29uc3QgTmVhckNvbnRleHQgPSBjcmVhdGVDb250ZXh0KHtcbiAgd2FsbGV0OiB1bmRlZmluZWQsXG4gIHNpZ25lZEFjY291bnRJZDogJydcbn0pOyJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwiTmVhckNvbnRleHQiLCJ3YWxsZXQiLCJ1bmRlZmluZWQiLCJzaWduZWRBY2NvdW50SWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/context.js\n");

/***/ }),

/***/ "./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/context */ \"./src/context.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ \"./node_modules/bootstrap/dist/css/bootstrap.min.css\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n// Import Google Font\n\n\nfunction MyApp({ Component }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context__WEBPACK_IMPORTED_MODULE_1__.NearContext.Provider, {\n        value: \"\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                    rel: \"stylesheet\",\n                    href: \"https://fonts.googleapis.com/css2?family=Russo+One&display=swap\"\n                }, void 0, false, {\n                    fileName: \"/home/tony/code/Portfolio/src/pages/_app.js\",\n                    lineNumber: 17,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/tony/code/Portfolio/src/pages/_app.js\",\n                lineNumber: 16,\n                columnNumber: 5\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {}, void 0, false, {\n                fileName: \"/home/tony/code/Portfolio/src/pages/_app.js\",\n                lineNumber: 22,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/tony/code/Portfolio/src/pages/_app.js\",\n        lineNumber: 15,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQVNNQTtBQVRrQztBQUVaO0FBRTVCLHFCQUFxQjtBQUVTO0FBQ2dCO0FBRy9CLFNBQVNHLE1BQU0sRUFBRUMsU0FBUyxFQUFFO0lBR3pDLHFCQUNFLDhEQUFDSCxpREFBV0EsQ0FBQ0ksUUFBUTtRQUFDQyxPQUFNOzswQkFDNUIsOERBQUNKLGtEQUFJQTswQkFDRCw0RUFBQ0s7b0JBQ0NDLEtBQUk7b0JBQ0pDLE1BQUs7Ozs7Ozs7Ozs7OzBCQUdULDhEQUFDTDs7Ozs7Ozs7Ozs7QUFHUCIsInNvdXJjZXMiOlsid2VicGFjazovL2hlbGxvLW5lYXIvLi9zcmMvcGFnZXMvX2FwcC5qcz84ZmRhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5lYXJDb250ZXh0IH0gZnJvbSAnQC9jb250ZXh0JztcbmltcG9ydCB7IEludGVyIH0gZnJvbSAnQG5leHQvZm9udC9nb29nbGUnXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5cbi8vIEltcG9ydCBHb29nbGUgRm9udFxuXG5pbXBvcnQgJ0Avc3R5bGVzL2dsb2JhbHMuY3NzJztcbmltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJztcblxuY29uc3QgcnVzc29PbmUgPSBJbnRlcih7IHN1YnNldHM6IFsnbGF0aW4nXSB9KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50IH0pIHtcbiBcblxuICByZXR1cm4gKFxuICAgIDxOZWFyQ29udGV4dC5Qcm92aWRlciB2YWx1ZT1cIlwiPlxuICAgIDxIZWFkPlxuICAgICAgICA8bGlua1xuICAgICAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgICAgICAgIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJ1c3NvK09uZSZkaXNwbGF5PXN3YXBcIlxuICAgICAgICAvPlxuICAgICAgPC9IZWFkPlxuICAgICAgPENvbXBvbmVudCAgLz5cbiAgICA8L05lYXJDb250ZXh0LlByb3ZpZGVyPlxuICApO1xufVxuIl0sIm5hbWVzIjpbInJ1c3NvT25lIiwiTmVhckNvbnRleHQiLCJIZWFkIiwiTXlBcHAiLCJDb21wb25lbnQiLCJQcm92aWRlciIsInZhbHVlIiwibGluayIsInJlbCIsImhyZWYiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/_app.js\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/bootstrap"], () => (__webpack_exec__("./src/pages/_app.js")));
module.exports = __webpack_exports__;

})();