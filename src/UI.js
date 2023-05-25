import { getFoldersContainer } from ".";

export default function generateUI(folders) {
    folders.forEach(element => {
        populateFoldersContainer(element)
    });
}

function populateFoldersContainer(element) {
    
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