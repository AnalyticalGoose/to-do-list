export default function returnFolders() {
    if (storageAvailable("localStorage")) {                 
        return getFromStorage()
    }
    else {
        console.log("storage not available")
    }
}

function storageAvailable(type) {
    let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
        e instanceof DOMException &&
        (e.code === 22 || 
            e.code === 1014 || 
            e.name === "QuotaExceededError" || 
            e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        storage &&
        storage.length !== 0
    );
  }
}

function getFromStorage() {
    const storedFolders = localStorage.getItem("folders")
    if (!storedFolders) {
        populateStorage();
    }
    else {
        return JSON.parse(storedFolders)
    }
}

function populateStorage() {
    localStorage.clear()
    localStorage.setItem("folders", JSON.stringify(defaultFolders))   
}

const defaultFolders = 
    [{
        name : "Personal",
        tasks: [
            ["Study hard!", "01-06-2023", null],
            ["Wash Car", "26-05-2023", "Medium"],
            ["Defeat Evil", null, "High"]
        ]
    },
    {   name : "Work",
        tasks: [
            ["Work hard!", null, "Low"],
            ["Don't get fired", "01-01-2065", "High"],
            ["Placate boss", null, null]
        ]
    }]