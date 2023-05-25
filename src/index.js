import storageAvailable from "./storage"

const addFolderBtn = document.querySelector('.add-folder-container') 
const inputContainer = document.querySelector('.input-container')
const cancelFolderBtn = document.querySelector('.button-cancel')
const newTaskBtn = document.querySelector('.add-task-button')
const closeModalBtn = document.querySelector('.close-modal')
const modal = document.querySelector('.modal')


addFolderBtn.addEventListener('click', function() {
    addFolderBtn.setAttribute('id', 'hide')
    inputContainer.removeAttribute('id', 'hide')
})

cancelFolderBtn.addEventListener('click', function() {
    addFolderBtn.removeAttribute('id', 'hide')
    inputContainer.setAttribute('id', 'hide')
})

newTaskBtn.addEventListener('click', function() {
    modal.showModal();
})

closeModalBtn.addEventListener('click', function() {
    modal.close();
})



console.log(storageAvailable())