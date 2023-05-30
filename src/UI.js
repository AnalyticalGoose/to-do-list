import { getFoldersContainer } from ".";
import { getTableContainer } from ".";
import { populateStorage } from "./storage";
import { getFromStorage } from "./storage";

let storageCopy = []
const editModal = document.querySelector('.edit-row-modal')
const closeModal = document.querySelector('#close-edit-modal')

export default function generateUI(folders) {
    storageCopy = folders
    folders.forEach(element => {
        createFolder(element)
        createTableRow(element)
        setTableEventListeners()
    });
}

function createFolder(element) {
    const foldersContainer = getFoldersContainer();
  
    foldersContainer.innerHTML += `
      <div class="selector-container">
        <img src="./img/folder.svg">
        <h3 class="selector">${element.name}</h3>
      </div>
    `;
}
  
function createTableRow(element) {
    const tableContainer = getTableContainer();
  
    element.tasks.forEach(arr => {
        const newRow = document.createElement('div');
        newRow.className = `task-row ${arr[2]}`;
  
        newRow.innerHTML = `
        <input type="checkbox" class="checkbox">
        <div class="task-container">
            <span class="task-name">${arr[0]}</span>
            <span class="task-date">${arr[1] !== null ? arr[1] : ''}</span>
        </div>
        <div class="edit-del-container">
            <img class="edit-button" src="./img/edit.svg">
            <img class="delete-button" src="./img/delete.svg">
        </div>
        `;
  
      tableContainer.appendChild(newRow);
    });
  
}
  
function setTableEventListeners() {
    const table = document.getElementById('main-table');
  
    const handleEvent = (event) => {
        let target = event.target;
        let parentElement = target.parentElement;
        let siblingElement = parentElement.previousSibling;
  
        if (target.matches('input.checkbox')) {
            event.stopImmediatePropagation();
            fadeRow(parentElement);
        } else if (target.matches('.edit-button')) {
            event.stopImmediatePropagation();
            editRow(siblingElement);
        } else if (target.matches('.delete-button')) {
            event.stopImmediatePropagation();
            deleteRow(siblingElement);
        } else if (target.matches('.priority-button')) {
            event.stopImmediatePropagation();
            setPriority(target);
        }
    };
  
    table.addEventListener('click', handleEvent);
}

function fadeRow(div) {
    div.classList.toggle('fade');
}

function editRow(sibling) {
    const submitBtn = document.querySelector('.submit-edit-button');
    const textInput = document.querySelector('#edit-text');
    const dateInput = document.querySelector('#edit-date');
  
    textInput.value = sibling.previousSibling.children[0].textContent;
    dateInput.value = sibling.previousSibling.children[1].textContent;

    let parentDiv = sibling.parentElement
    selectPriorityBtn(sibling.parentElement.classList[1], parentDiv)

    editModal.showModal();
  
    submitBtn.addEventListener('click', function handleClick() {
        const taskName = sibling.previousSibling.children[0].textContent;
        const newName = textInput.value;
        const newDate = dateInput.value;
        const newPriority = getPriority();
  
        updateRow(taskName, newName, newDate, newPriority);
        clearPriority();
        editModal.close();
  
        submitBtn.removeEventListener('click', handleClick); // Remove the event listener
    },  { once: true });

    closeModal.addEventListener('click', function() { 
        clearPriority()
        editModal.close()    
    })
}
  
function updateRow(matchingString, newName, newDate, newPriority) {
    storageCopy.forEach(folder => {
        folder.tasks.forEach(task => {
            if (task.includes(matchingString)) {
                task[0] = newName;
                task[1] = newDate;
                task[2] = newPriority;
                return
            }
        });
    });
    reRenderTable()
}
  
function selectPriorityBtn(prio, parentDiv) {
    const highPrioBtn = document.querySelector('#edit-high-button')
    const medPrioBtn = document.querySelector('#edit-medium-button')
    const lowPrioBtn = document.querySelector('#edit-low-button')

    if (prio === "High") {
        highPrioBtn.classList.add('prio-btn-select');
      } else if (prio === "Medium" || prio === "Med") {
        medPrioBtn.classList.add('prio-btn-select');
      } else if (prio === "Low") {
        lowPrioBtn.classList.add('prio-btn-select');
    }

    highPrioBtn.addEventListener('click', function(e) {
        e.stopImmediatePropagation()
        setPriority(highPrioBtn, parentDiv)
    })

    medPrioBtn.addEventListener('click', function(e) {
        e.stopImmediatePropagation()
        setPriority(medPrioBtn, parentDiv)
    })

    lowPrioBtn.addEventListener('click', function(e) {
        e.stopImmediatePropagation()
        setPriority(lowPrioBtn, parentDiv)
    })
}
  
function setPriority(button) {
    clearPriority()
    button.classList.add('prio-btn-select')
}
  
function getPriority() {
    let selectedPrioBtn = document.querySelector('.prio-btn-select')
    if (!selectedPrioBtn) {
        return "null"
    }
    else return selectedPrioBtn.textContent
}

function clearPriority() {
    let selectedPrioBtns = document.querySelectorAll('.prio-btn-select')
    
    if (selectedPrioBtns) {
        selectedPrioBtns.forEach(button => {
            button.classList.remove('prio-btn-select')
        })
    }
}

function reRenderTable() {
    populateStorage(storageCopy)
    getTableContainer().innerHTML = ""

    storageCopy = getFromStorage()
    
    storageCopy.forEach(element => {
        createTableRow(element)
        setTableEventListeners()
    });
}

function deleteRow(div) {
    const taskname = div.previousSibling.children[0].textContent
    
    storageCopy.forEach(folder => {
        folder.tasks.forEach(arr => {
            if (arr.includes(taskname)) {
                let index = folder.tasks.indexOf(arr)
                folder.tasks.splice(index, 1)
            }
        })
    })
    reRenderTable()
}