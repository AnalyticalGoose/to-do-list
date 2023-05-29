import { getFoldersContainer } from ".";
import { getTableContainer } from ".";

export default function generateUI(folders) {
    folders.forEach(element => {
        createFolder(element)
        createTableRow(element)
        setEventListeners()
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

        console.log(arr)

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

function setEventListeners() {
    const checkboxes = document.querySelectorAll('input.checkbox')

    checkboxes.forEach (checkbox => {
        checkbox.addEventListener('click', function(e) {
            e.stopImmediatePropagation()
            fadeRow(e.target.parentElement)
        })
    })
}

function fadeRow(div) {
    if (div.classList.contains('fade')) {
        div.classList.remove('fade')
    }
    else div.classList.add('fade')
}