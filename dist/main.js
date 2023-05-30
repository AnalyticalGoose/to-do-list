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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ generateUI)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/index.js\");\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ \"./src/storage.js\");\n\n\n\n\n\nlet storageCopy = []\nconst editModal = document.querySelector('.edit-row-modal')\nconst closeModal = document.querySelector('#close-edit-modal')\n\n// to-do -- submit buttons to update tables\n\nfunction generateUI(folders) {\n    storageCopy = folders\n    folders.forEach(element => {\n        createFolder(element)\n        createTableRow(element)\n        setTableEventListeners()\n    });\n}\n\nfunction createFolder(element) {\n    \n    const div = document.createElement('div')\n    div.classList.add('selector-container')  \n    \n    const folderImg = document.createElement('img')\n    folderImg.src = \"./img/folder.svg\"\n    div.appendChild(folderImg)\n    \n    const name = document.createElement('h3')  \n    name.classList.add('selector')\n    name.textContent = element.name\n    div.appendChild(name)\n\n    const foldersContainer = (0,___WEBPACK_IMPORTED_MODULE_0__.getFoldersContainer)()\n\n    foldersContainer.appendChild(div)\n}\n\nfunction createTableRow(element) {\n    \n    element.tasks.forEach(arr => {\n        const newRow = document.createElement('div');\n        newRow.classList.add('task-row' ,`${arr[2]}`)\n        \n        // left 'complete' checkbox\n        const checkbox = document.createElement('input')\n        checkbox.setAttribute('type', 'checkbox')\n        checkbox.classList.add('checkbox')\n        newRow.appendChild(checkbox)\n\n        // Task content\n        const taskContainer = document.createElement('div')\n        taskContainer.classList.add('task-container')\n\n        const taskName = document.createElement('span')\n        const taskDate = document.createElement('span')\n        taskName.classList.add('task-name')\n        taskDate.classList.add('task-date')\n\n        taskName.textContent = arr[0]\n        taskDate.textContent = arr[1]\n\n        taskContainer.append(taskName, taskDate)\n        newRow.appendChild(taskContainer)\n\n        // right 'edit and 'delete buttons\n        const btnsContainer = document.createElement('div')\n        btnsContainer.classList.add('edit-del-container')\n        \n        const editBtn = document.createElement('img')\n        editBtn.classList.add('edit-button')\n        editBtn.src = \"./img/edit.svg\"\n        btnsContainer.appendChild(editBtn)\n\n        const delBtn = document.createElement('img')\n        delBtn.classList.add('delete-button')\n        delBtn.src = \"./img/delete.svg\"\n        btnsContainer.appendChild(delBtn)\n        \n        newRow.appendChild(btnsContainer)\n\n        const tableContainer = (0,___WEBPACK_IMPORTED_MODULE_0__.getTableContainer)()\n        tableContainer.appendChild(newRow)\n\n    })\n}\n\nfunction setTableEventListeners() {\n    const table = document.getElementById('main-table');\n  \n    const handleEvent = (event) => {\n        let target = event.target;\n        let parentElement = target.parentElement;\n        let siblingElement = parentElement.previousSibling;\n  \n        if (target.matches('input.checkbox')) {\n            event.stopImmediatePropagation();\n            fadeRow(parentElement);\n        } else if (target.matches('.edit-button')) {\n            event.stopImmediatePropagation();\n            editRow(siblingElement);\n        } else if (target.matches('.delete-button')) {\n            event.stopImmediatePropagation();\n            deleteRow(siblingElement);\n        } else if (target.matches('.priority-button')) {\n            event.stopImmediatePropagation();\n            setPriority(target);\n        }\n    };\n  \n    table.addEventListener('click', handleEvent);\n}\n\nfunction fadeRow(div) {\n    if (div.classList.contains('fade')) {\n        div.classList.remove('fade')\n    }\n    else div.classList.add('fade')\n}\n\nfunction editRow(sibling) {\n    \n    let taskName = sibling.children[0]\n    let taskDate = sibling.children[1]\n    let parentDiv = sibling.parentElement\n\n    const textInput = document.querySelector('#edit-text')\n    const dateInput = document.querySelector('#edit-date')\n    \n    const highPrioBtn = document.querySelector('#edit-high-button')\n    const medPrioBtn = document.querySelector('#edit-medium-button')\n    const lowPrioBtn = document.querySelector('#edit-low-button')\n\n    const submitBtn = document.querySelector('.submit-edit-button')\n\n    // populate name and date with values stored in table\n    textInput.value = sibling.childNodes[0].innerText\n    dateInput.value = sibling.childNodes[1].innerText\n\n    // Select the button for the current task priority\n    let currentPrio = sibling.parentElement.classList[1]\n\n    if (currentPrio == \"High\") {\n        highPrioBtn.classList.add('prio-btn-select')\n    }\n    else if (currentPrio == \"Medium\" || currentPrio == \"Med\") {\n        medPrioBtn.classList.add('prio-btn-select')\n    }\n    else if (currentPrio == \"Low\") {\n        lowPrioBtn.classList.add('prio-btn-select')\n    }\n    editModal.showModal()\n\n\n    highPrioBtn.addEventListener('click', function(e) {\n        e.stopImmediatePropagation()\n        setPriority(highPrioBtn, parentDiv)\n    })\n\n    medPrioBtn.addEventListener('click', function(e) {\n        e.stopImmediatePropagation()\n        setPriority(medPrioBtn, parentDiv)\n    })\n\n    lowPrioBtn.addEventListener('click', function(e) {\n        e.stopImmediatePropagation()\n        setPriority(lowPrioBtn, parentDiv)\n    })\n\n    submitBtn.addEventListener('click', function(e) {\n        e.stopImmediatePropagation()\n\n        console.log(taskName)\n\n        let newName = textInput.value\n        let newDate = dateInput.value\n        let newPrio = getPriority()\n\n        // update localStorage with new data\n        updateRow(taskName.textContent, newName, newDate, newPrio)\n        \n        // // // update variable in table row UI\n        // taskName.textContent = newName\n        // taskDate.textContent = newDate\n\n        // // // replace priority in the UI element and update the stored variable\n        // parentDiv.classList.replace(currentPrio, newPrio)\n        // currentPrio = newPrio\n\n        clearPriority()\n        editModal.close()\n    })\n\n    closeModal.addEventListener('click', function() { \n        clearPriority()\n        editModal.close()    \n    })\n}\n\nfunction setPriority(button) {\n    clearPriority()\n    button.classList.add('prio-btn-select')\n}\n\nfunction getPriority() {\n    let selectedPrioBtn = document.querySelector('.prio-btn-select')\n    if (!selectedPrioBtn) {\n        return \"null\"\n    }\n    else return selectedPrioBtn.textContent\n}\n\nfunction clearPriority() {\n    let selectedPrioBtn = document.querySelector('.prio-btn-select')\n    \n    if (selectedPrioBtn) {\n        selectedPrioBtn.classList.remove('prio-btn-select')\n    }\n}\n\nfunction updateRow(oldName, newName, newDate, newPrio) {\n\n    storageCopy.forEach(folder => {\n        folder.tasks.forEach(arr => {\n            if (arr.includes(oldName)) {\n                arr[0] = newName\n                arr[1] = newDate\n                arr[2] = newPrio\n\n                console.log(arr)\n            }\n        })\n    })\n    regenerateTable()\n}\n\nfunction deleteRow(div) {\n    const taskname = div.childNodes[0].innerText\n\n    storageCopy.forEach(folder => {\n        folder.tasks.forEach(arr => {\n            if (arr.includes(taskname)) {\n                let index = folder.tasks.indexOf(arr)\n                folder.tasks.splice(index, 1)\n            }\n        })\n    })\n    regenerateTable()\n}\n\nfunction regenerateTable() {\n    (0,_storage__WEBPACK_IMPORTED_MODULE_1__.populateStorage)(storageCopy)\n    ;(0,___WEBPACK_IMPORTED_MODULE_0__.getTableContainer)().innerHTML = \"\"\n\n    storageCopy = (0,_storage__WEBPACK_IMPORTED_MODULE_1__.getFromStorage)()\n    \n    storageCopy.forEach(element => {\n        createTableRow(element)\n        setTableEventListeners()\n    });\n}\n\n//# sourceURL=webpack://to-do-list/./src/UI.js?");

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