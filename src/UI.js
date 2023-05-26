import { getFoldersContainer } from ".";
import { getTableContainer } from ".";

export default function generateUI(folders) {
    folders.forEach(element => {
        createFolder(element)
        createTableRow(element)
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

// TO DO - generate tables with the remainder of object data
//       - add way to delete folders and content

function createTableRow(element) {
    
    element.tasks.forEach(arr => {
        const newRow = document.createElement('div');
        newRow.classList.add('task-row' ,`${arr[2]}`)
        
        // left 'compelte' checkbox
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        newRow.appendChild(checkbox)



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