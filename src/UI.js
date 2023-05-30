import { getFoldersContainer } from ".";
import { getTableContainer } from ".";
import { populateStorage } from "./storage";
import { getFromStorage } from "./storage";

let storageCopy = []
const editModal = document.querySelector('.edit-row-modal')
const closeModal = document.querySelector('#close-edit-modal')

// to-do -- submit buttons to update tables

export default function generateUI(folders) {
    storageCopy = folders
    folders.forEach(element => {
        createFolder(element)
        createTableRow(element)
        setTableEventListeners()
    });
}

function createFolder(element) {
    
    const div = document.createElement('div')
    div.classList.add('selector-container')  
    
    const folderImg = document.createElement('img')
    folderImg.src = "./img/folder.svg"
    div.appendChild(folderImg)
    
    const name = document.createElement('h3')  
    name.classList.add('selector')
    name.textContent = element.name
    div.appendChild(name)

    const foldersContainer = getFoldersContainer()

    foldersContainer.appendChild(div)
}

function createTableRow(element) {
    
    element.tasks.forEach(arr => {
        const newRow = document.createElement('div');
        newRow.classList.add('task-row' ,`${arr[2]}`)
        
        // left 'complete' checkbox
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.classList.add('checkbox')
        newRow.appendChild(checkbox)

        // Task content
        const taskContainer = document.createElement('div')
        taskContainer.classList.add('task-container')

        const taskName = document.createElement('span')
        const taskDate = document.createElement('span')
        taskName.classList.add('task-name')
        taskDate.classList.add('task-date')

        taskName.textContent = arr[0]
        taskDate.textContent = arr[1]

        taskContainer.append(taskName, taskDate)
        newRow.appendChild(taskContainer)

        // right 'edit and 'delete buttons
        const btnsContainer = document.createElement('div')
        btnsContainer.classList.add('edit-del-container')
        
        const editBtn = document.createElement('img')
        editBtn.classList.add('edit-button')
        editBtn.src = "./img/edit.svg"
        btnsContainer.appendChild(editBtn)

        const delBtn = document.createElement('img')
        delBtn.classList.add('delete-button')
        delBtn.src = "./img/delete.svg"
        btnsContainer.appendChild(delBtn)
        
        newRow.appendChild(btnsContainer)

        const tableContainer = getTableContainer()
        tableContainer.appendChild(newRow)

    })
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
    if (div.classList.contains('fade')) {
        div.classList.remove('fade')
    }
    else div.classList.add('fade')
}

function editRow(sibling) {
    
    let taskName = sibling.children[0]
    let taskDate = sibling.children[1]
    let parentDiv = sibling.parentElement

    const textInput = document.querySelector('#edit-text')
    const dateInput = document.querySelector('#edit-date')
    
    const highPrioBtn = document.querySelector('#edit-high-button')
    const medPrioBtn = document.querySelector('#edit-medium-button')
    const lowPrioBtn = document.querySelector('#edit-low-button')

    const submitBtn = document.querySelector('.submit-edit-button')

    // populate name and date with values stored in table
    textInput.value = sibling.childNodes[0].innerText
    dateInput.value = sibling.childNodes[1].innerText

    // Select the button for the current task priority
    let currentPrio = sibling.parentElement.classList[1]

    if (currentPrio == "High") {
        highPrioBtn.classList.add('prio-btn-select')
    }
    else if (currentPrio == "Medium" || currentPrio == "Med") {
        medPrioBtn.classList.add('prio-btn-select')
    }
    else if (currentPrio == "Low") {
        lowPrioBtn.classList.add('prio-btn-select')
    }
    editModal.showModal()


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

    submitBtn.addEventListener('click', function(e) {
        e.stopImmediatePropagation()

        console.log(taskName)

        let newName = textInput.value
        let newDate = dateInput.value
        let newPrio = getPriority()

        // update localStorage with new data
        updateRow(taskName.textContent, newName, newDate, newPrio)
        
        // // // update variable in table row UI
        // taskName.textContent = newName
        // taskDate.textContent = newDate

        // // // replace priority in the UI element and update the stored variable
        // parentDiv.classList.replace(currentPrio, newPrio)
        // currentPrio = newPrio

        clearPriority()
        editModal.close()
    })

    closeModal.addEventListener('click', function() { 
        clearPriority()
        editModal.close()    
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
    let selectedPrioBtn = document.querySelector('.prio-btn-select')
    
    if (selectedPrioBtn) {
        selectedPrioBtn.classList.remove('prio-btn-select')
    }
}

function updateRow(oldName, newName, newDate, newPrio) {

    storageCopy.forEach(folder => {
        folder.tasks.forEach(arr => {
            if (arr.includes(oldName)) {
                arr[0] = newName
                arr[1] = newDate
                arr[2] = newPrio

                console.log(arr)
            }
        })
    })
    regenerateTable()
}

function deleteRow(div) {
    const taskname = div.childNodes[0].innerText

    storageCopy.forEach(folder => {
        folder.tasks.forEach(arr => {
            if (arr.includes(taskname)) {
                let index = folder.tasks.indexOf(arr)
                folder.tasks.splice(index, 1)
            }
        })
    })
    regenerateTable()
}

function regenerateTable() {
    populateStorage(storageCopy)
    getTableContainer().innerHTML = ""

    storageCopy = getFromStorage()
    
    storageCopy.forEach(element => {
        createTableRow(element)
        setTableEventListeners()
    });
}