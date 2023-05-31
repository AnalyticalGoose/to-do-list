import { getFoldersContainer } from ".";
import { getTableContainer } from ".";
import { populateStorage } from "./storage";
import { getFromStorage } from "./storage";

let storageCopy = []
const editModal = document.querySelector('.edit-row-modal')
const closeModal = document.getElementById('close-edit-modal')
const table = document.getElementById('main-table');

// to-do
// - Add new folders
// - Add new tasks

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
    const datesContainer = document.querySelector('.dates-container')
  
    foldersContainer.innerHTML += `
      <div class="selector-container">
        <img src="./img/folder.svg">
        <h3 class="selector">${element.name}</h3>
      </div>
    `;

    foldersContainer.addEventListener('click', selectFolder)
    datesContainer.addEventListener('click', selectDate)
}
  
function createTableRow(element) {
    const tableContainer = getTableContainer();
  
    element.tasks.forEach(arr => {
        const newRow = document.createElement('div');
        newRow.className = `task-row ${arr[2]}`;
        newRow.setAttribute('id', element.name)
  
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

    const { previousSibling } = sibling;
    textInput.value = previousSibling.children[0].textContent;
    dateInput.value = previousSibling.children[1].textContent;

    const parentDiv = sibling.parentElement;
    selectPriorityBtn(parentDiv.classList[1], parentDiv);

    editModal.showModal();

    const handleClick = () => {
        const taskName = previousSibling.children[0].textContent;
        const newName = textInput.value;
        const newDate = dateInput.value;
        const newPriority = getPriority();

        updateRow(taskName, newName, newDate, newPriority);
        clearPriority();
        editModal.close();

        submitBtn.removeEventListener('click', handleClick);
    };
    
    submitBtn.addEventListener('click', handleClick, { once: true });
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
    return selectedPrioBtn ? selectedPrioBtn.textContent : "null";
}

function clearPriority() {
    const selectedPrioBtns = document.querySelectorAll('.prio-btn-select')
    
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

function clearFolders() {
    const selectedFolders = document.querySelectorAll('.selected') 

    selectedFolders.forEach(folder => {
        folder.classList.remove('selected')
    })
}

const selectFolder = (e) => {
    clearFolders()

    e.target.classList.add('selected')
    
    filterFolders(e)
}

const filterFolders = (e) => {
    let folderName = e.target.innerText;
  
    const taskRows = document.querySelectorAll('.task-row');
    taskRows.forEach(row => {
        if (row.id == folderName ) {
            row.classList.add('hide');
        }   else {
                row.classList.remove('hide');
        }
    });
};

function clearDate() {
    const selectedDate = document.querySelectorAll('.selected-date')

    selectedDate.forEach(date => {
        date.classList.remove('selected-date')
    })
}

const selectDate = (e) => {
    clearDate()

    e.target.classList.add('selected-date')

    filterDates(e)
}

const getDateString = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const currentDate = year + "-" + month + "-" + day
    
    return currentDate
}

const filterDates = (e) => {
    const taskDates = document.querySelectorAll('.task-date');
    const dateName = e.target.innerText;
    const currentDate = new Date()
    const currentDateString = getDateString(currentDate)

    if (dateName == 'This Week') {
        taskDates.forEach(date => {
            const taskDate = new Date(date.textContent); // parse string to usable date

            if (isWithinCurrentWeek(taskDate, currentDate)) {
                date.parentElement.parentElement.classList.remove('hide-date');
            } else {
                date.parentElement.parentElement.classList.add('hide-date');
            }
        });
    }

    if (dateName == 'Inbox') {
        taskDates.forEach(date => {
            date.parentElement.parentElement.classList.remove('hide-date')
        })
    }

    if (dateName == 'Today') {
        taskDates.forEach(date => {         
            if (date.innerText == currentDateString) {
                date.parentElement.parentElement.classList.remove('hide-date')
            }   else {
                date.parentElement.parentElement.classList.add('hide-date')
            }
        })
    }
}

function isWithinCurrentWeek(taskDate, currentDate) {

    Date.prototype.GetFirstDayOfWeek = function() {
        return (new Date(this.setDate(this.getDate() - this.getDay()+ (this.getDay() == 0 ? -6:1) )));
    }
    Date.prototype.GetLastDayOfWeek = function() {
        return (new Date(this.setDate(this.getDate() - this.getDay() +7)));
    }
    
    const firstDayOfWeek = currentDate.GetFirstDayOfWeek();
    const lastDayOfWeek = currentDate.GetLastDayOfWeek();
  
    return taskDate >= firstDayOfWeek && taskDate <= lastDayOfWeek;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        clearPriority();
        editModal.close();
    }
});

closeModal.addEventListener('click', () => {
    clearPriority();
    editModal.close();
});
