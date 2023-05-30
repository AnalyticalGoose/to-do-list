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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ generateUI)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/index.js\");\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ \"./src/storage.js\");\n\n\n\n\n\nlet storageCopy = []\nconst editModal = document.querySelector('.edit-row-modal')\nconst closeModal = document.querySelector('#close-edit-modal')\n\nfunction generateUI(folders) {\n    storageCopy = folders\n    folders.forEach(element => {\n        createFolder(element)\n        createTableRow(element)\n        setTableEventListeners()\n    });\n}\n\nfunction createFolder(element) {\n    const foldersContainer = (0,___WEBPACK_IMPORTED_MODULE_0__.getFoldersContainer)();\n  \n    foldersContainer.innerHTML += `\n      <div class=\"selector-container\">\n        <img src=\"./img/folder.svg\">\n        <h3 class=\"selector\">${element.name}</h3>\n      </div>\n    `;\n}\n  \nfunction createTableRow(element) {\n    const tableContainer = (0,___WEBPACK_IMPORTED_MODULE_0__.getTableContainer)();\n  \n    element.tasks.forEach(arr => {\n        const newRow = document.createElement('div');\n        newRow.className = `task-row ${arr[2]}`;\n  \n        newRow.innerHTML = `\n        <input type=\"checkbox\" class=\"checkbox\">\n        <div class=\"task-container\">\n            <span class=\"task-name\">${arr[0]}</span>\n            <span class=\"task-date\">${arr[1] !== null ? arr[1] : ''}</span>\n        </div>\n        <div class=\"edit-del-container\">\n            <img class=\"edit-button\" src=\"./img/edit.svg\">\n            <img class=\"delete-button\" src=\"./img/delete.svg\">\n        </div>\n        `;\n  \n      tableContainer.appendChild(newRow);\n    });\n  \n}\n  \nfunction setTableEventListeners() {\n    const table = document.getElementById('main-table');\n  \n    const handleEvent = (event) => {\n        let target = event.target;\n        let parentElement = target.parentElement;\n        let siblingElement = parentElement.previousSibling;\n  \n        if (target.matches('input.checkbox')) {\n            event.stopImmediatePropagation();\n            fadeRow(parentElement);\n        } else if (target.matches('.edit-button')) {\n            event.stopImmediatePropagation();\n            editRow(siblingElement);\n        } else if (target.matches('.delete-button')) {\n            event.stopImmediatePropagation();\n            deleteRow(siblingElement);\n        } else if (target.matches('.priority-button')) {\n            event.stopImmediatePropagation();\n            setPriority(target);\n        }\n    };\n  \n    table.addEventListener('click', handleEvent);\n}\n\nfunction fadeRow(div) {\n    div.classList.toggle('fade');\n}\n\nfunction editRow(sibling) {\n    const submitBtn = document.querySelector('.submit-edit-button');\n    const textInput = document.querySelector('#edit-text');\n    const dateInput = document.querySelector('#edit-date');\n  \n    textInput.value = sibling.previousSibling.children[0].textContent;\n    dateInput.value = sibling.previousSibling.children[1].textContent;\n\n    let parentDiv = sibling.parentElement\n    selectPriorityBtn(sibling.parentElement.classList[1], parentDiv)\n\n    editModal.showModal();\n  \n    submitBtn.addEventListener('click', function handleClick() {\n        const taskName = sibling.previousSibling.children[0].textContent;\n        const newName = textInput.value;\n        const newDate = dateInput.value;\n        const newPriority = getPriority();\n  \n        updateRow(taskName, newName, newDate, newPriority);\n        clearPriority();\n        editModal.close();\n  \n        submitBtn.removeEventListener('click', handleClick); // Remove the event listener\n    },  { once: true });\n\n    closeModal.addEventListener('click', function() { \n        clearPriority()\n        editModal.close()    \n    })\n}\n  \nfunction updateRow(matchingString, newName, newDate, newPriority) {\n    storageCopy.forEach(folder => {\n        folder.tasks.forEach(task => {\n            if (task.includes(matchingString)) {\n                task[0] = newName;\n                task[1] = newDate;\n                task[2] = newPriority;\n                return\n            }\n        });\n    });\n    reRenderTable()\n}\n  \nfunction selectPriorityBtn(prio, parentDiv) {\n    const highPrioBtn = document.querySelector('#edit-high-button')\n    const medPrioBtn = document.querySelector('#edit-medium-button')\n    const lowPrioBtn = document.querySelector('#edit-low-button')\n\n    if (prio === \"High\") {\n        highPrioBtn.classList.add('prio-btn-select');\n      } else if (prio === \"Medium\" || prio === \"Med\") {\n        medPrioBtn.classList.add('prio-btn-select');\n      } else if (prio === \"Low\") {\n        lowPrioBtn.classList.add('prio-btn-select');\n    }\n\n    highPrioBtn.addEventListener('click', function(e) {\n        e.stopImmediatePropagation()\n        setPriority(highPrioBtn, parentDiv)\n    })\n\n    medPrioBtn.addEventListener('click', function(e) {\n        e.stopImmediatePropagation()\n        setPriority(medPrioBtn, parentDiv)\n    })\n\n    lowPrioBtn.addEventListener('click', function(e) {\n        e.stopImmediatePropagation()\n        setPriority(lowPrioBtn, parentDiv)\n    })\n}\n  \nfunction setPriority(button) {\n    clearPriority()\n    button.classList.add('prio-btn-select')\n}\n  \nfunction getPriority() {\n    let selectedPrioBtn = document.querySelector('.prio-btn-select')\n    if (!selectedPrioBtn) {\n        return \"null\"\n    }\n    else return selectedPrioBtn.textContent\n}\n\nfunction clearPriority() {\n    let selectedPrioBtns = document.querySelectorAll('.prio-btn-select')\n    \n    if (selectedPrioBtns) {\n        selectedPrioBtns.forEach(button => {\n            button.classList.remove('prio-btn-select')\n        })\n    }\n}\n\nfunction reRenderTable() {\n    (0,_storage__WEBPACK_IMPORTED_MODULE_1__.populateStorage)(storageCopy)\n    ;(0,___WEBPACK_IMPORTED_MODULE_0__.getTableContainer)().innerHTML = \"\"\n\n    storageCopy = (0,_storage__WEBPACK_IMPORTED_MODULE_1__.getFromStorage)()\n    \n    storageCopy.forEach(element => {\n        createTableRow(element)\n        setTableEventListeners()\n    });\n}\n\nfunction deleteRow(div) {\n    const taskname = div.previousSibling.children[0].textContent\n    \n    storageCopy.forEach(folder => {\n        folder.tasks.forEach(arr => {\n            if (arr.includes(taskname)) {\n                let index = folder.tasks.indexOf(arr)\n                folder.tasks.splice(index, 1)\n            }\n        })\n    })\n    reRenderTable()\n}\n\n//# sourceURL=webpack://to-do-list/./src/UI.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getFoldersContainer: () => (/* binding */ getFoldersContainer),\n/* harmony export */   getTableContainer: () => (/* binding */ getTableContainer)\n/* harmony export */ });\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ \"./src/storage.js\");\n/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ \"./src/UI.js\");\n\n\n\nconst addFolderBtn = document.querySelector('.add-folder-container') \nconst inputContainer = document.querySelector('.input-container')\nconst cancelFolderBtn = document.querySelector('.button-cancel')\nconst newTaskBtn = document.querySelector('.add-task-button')\nconst closeModalBtn = document.querySelector('.close-modal-main')\nconst modal = document.querySelector('.modal')\nconst foldersContainer = document.querySelector('.folders-container')\nconst tableContainer = document.querySelector('.task-table')\n\n\naddFolderBtn.addEventListener('click', function() {\n    addFolderBtn.setAttribute('id', 'hide')\n    inputContainer.removeAttribute('id', 'hide')\n})\n\ncancelFolderBtn.addEventListener('click', function() {\n    addFolderBtn.removeAttribute('id', 'hide')\n    inputContainer.setAttribute('id', 'hide')\n})\n\nnewTaskBtn.addEventListener('click', function() {\n    modal.showModal();\n})\n\ncloseModalBtn.addEventListener('click', function() {\n    modal.close();\n})\n\n\nfunction getFoldersContainer() {\n    return foldersContainer\n}\n\nfunction getTableContainer() {\n    return tableContainer\n}\n\n\nfunction init() {\n    //Return stored data, or default data for a fresh user and populate UI. \n    (0,_UI__WEBPACK_IMPORTED_MODULE_1__[\"default\"])((0,_storage__WEBPACK_IMPORTED_MODULE_0__.returnFolders)())\n}\n\ninit()\n\n\n\n//# sourceURL=webpack://to-do-list/./src/index.js?");

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getFromStorage: () => (/* binding */ getFromStorage),\n/* harmony export */   populateStorage: () => (/* binding */ populateStorage),\n/* harmony export */   returnFolders: () => (/* binding */ returnFolders)\n/* harmony export */ });\nfunction returnFolders() {\n    if (storageAvailable(\"localStorage\")) {                 \n        return getFromStorage()\n    }\n    else {\n        console.log(\"storage not available\")\n    }\n}\n\nfunction storageAvailable(type) {\n    let storage;\n  try {\n    storage = window[type];\n    const x = \"__storage_test__\";\n    storage.setItem(x, x);\n    storage.removeItem(x);\n    return true;\n  } catch (e) {\n    return (\n        e instanceof DOMException &&\n        (e.code === 22 || \n            e.code === 1014 || \n            e.name === \"QuotaExceededError\" || \n            e.name === \"NS_ERROR_DOM_QUOTA_REACHED\") &&\n        storage &&\n        storage.length !== 0\n    );\n  }\n}\n\nfunction getFromStorage() {\n    const storedFolders = localStorage.getItem(\"folders\")\n    if (!storedFolders) {\n        populateStorage();\n    }\n    else {\n        return JSON.parse(storedFolders)\n    }\n}\n\nfunction populateStorage(folders = defaultFolders) {\n    localStorage.clear()\n    localStorage.setItem(\"folders\", JSON.stringify(folders))   \n}\n\nconst defaultFolders = \n    [{\n        name : \"Personal\",\n        tasks: [\n            [\"Study hard!\", \"2023-06-01\", null],\n            [\"Wash Car\", \"2023-05-26\", \"Medium\"],\n            [\"Defeat Evil\", null, \"High\"]\n        ]\n    },\n    {   name : \"Work\",\n        tasks: [\n            [\"Work hard!\", null, \"Low\"],\n            [\"Don't get fired\", \"2065-01-01\", \"High\"],\n            [\"Placate boss\", null, null]\n        ]\n    }]\n\n\n\n//# sourceURL=webpack://to-do-list/./src/storage.js?");

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