/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ generateUI)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/index.js\");\n\n\nfunction generateUI(folders) {\n    folders.forEach(element => {\n        populateFoldersContainer(element)\n    });\n}\n\nfunction populateFoldersContainer(element) {\n    \n    const div = document.createElement('div')\n    div.classList.add('selector-container')  \n    \n    const folderImg = document.createElement('img')\n    folderImg.src = \"./img/folder.svg\"\n    div.appendChild(folderImg)\n    \n    const name = document.createElement('h3')  \n    name.classList.add('selector')\n    name.textContent = element.name\n    div.appendChild(name)\n\n    const foldersContainer = (0,___WEBPACK_IMPORTED_MODULE_0__.getFoldersContainer)()\n\n    foldersContainer.appendChild(div)\n}\n\n// TO DO - generate tables with the remainder of object data\n//       - add way to delete folders and content\n\n//# sourceURL=webpack://to-do-list/./src/UI.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getFoldersContainer: () => (/* binding */ getFoldersContainer)\n/* harmony export */ });\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ \"./src/storage.js\");\n/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ \"./src/UI.js\");\n\n\n\nconst addFolderBtn = document.querySelector('.add-folder-container') \nconst inputContainer = document.querySelector('.input-container')\nconst cancelFolderBtn = document.querySelector('.button-cancel')\nconst newTaskBtn = document.querySelector('.add-task-button')\nconst closeModalBtn = document.querySelector('.close-modal')\nconst modal = document.querySelector('.modal')\nconst foldersContainer = document.querySelector('.folders-container')\n\n\naddFolderBtn.addEventListener('click', function() {\n    addFolderBtn.setAttribute('id', 'hide')\n    inputContainer.removeAttribute('id', 'hide')\n})\n\ncancelFolderBtn.addEventListener('click', function() {\n    addFolderBtn.removeAttribute('id', 'hide')\n    inputContainer.setAttribute('id', 'hide')\n})\n\nnewTaskBtn.addEventListener('click', function() {\n    modal.showModal();\n})\n\ncloseModalBtn.addEventListener('click', function() {\n    modal.close();\n})\n\n\nfunction getFoldersContainer() {\n    return foldersContainer\n}\n\n\nfunction init() {\n    //Return stored data, or default data for a fresh user and populate UI. \n    (0,_UI__WEBPACK_IMPORTED_MODULE_1__[\"default\"])((0,_storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"])())\n\n}\n\ninit()\n\n\n\n//# sourceURL=webpack://to-do-list/./src/index.js?");

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ returnFolders)\n/* harmony export */ });\nfunction returnFolders() {\n    if (storageAvailable(\"localStorage\")) {                 \n        return getFromStorage()\n    }\n    else {\n        console.log(\"storage not available\")\n    }\n}\n\nfunction storageAvailable(type) {\n    let storage;\n  try {\n    storage = window[type];\n    const x = \"__storage_test__\";\n    storage.setItem(x, x);\n    storage.removeItem(x);\n    return true;\n  } catch (e) {\n    return (\n        e instanceof DOMException &&\n        (e.code === 22 || \n            e.code === 1014 || \n            e.name === \"QuotaExceededError\" || \n            e.name === \"NS_ERROR_DOM_QUOTA_REACHED\") &&\n        storage &&\n        storage.length !== 0\n    );\n  }\n}\n\nfunction getFromStorage() {\n    const storedFolders = localStorage.getItem(\"folders\")\n    if (!storedFolders) {\n        populateStorage();\n    }\n    else {\n        return JSON.parse(storedFolders)\n    }\n}\n\nfunction populateStorage() {\n    localStorage.clear()\n    localStorage.setItem(\"folders\", JSON.stringify(defaultFolders))   \n}\n\nconst defaultFolders = \n    [{\n        name : \"Personal\",\n        tasks: [\n            [\"Study hard!\", \"01-06-2023\", null],\n            [\"Wash Car\", \"26-05-2023\", \"medium\"],\n            [\"Defeat Evil\", null, \"high\"]\n        ]\n    },\n    {   name : \"Work\",\n        tasks: [\n            [\"Work hard!\", null, \"low\"],\n            [\"Don't get fired\", \"01-01-2065\", \"high\"],\n            [\"Placate boss\", null, null]\n        ]\n    }]\n\n//# sourceURL=webpack://to-do-list/./src/storage.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;