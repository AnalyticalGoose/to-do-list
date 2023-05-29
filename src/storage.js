function returnFolders() {
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

function populateStorage(folders = defaultFolders) {
    localStorage.clear()
    localStorage.setItem("folders", JSON.stringify(folders))   
}

const defaultFolders = 
    [{
        name : "Personal",
        tasks: [
            ["Study hard!", "2023-06-01", null],
            ["Wash Car", "2023-05-26", "Medium"],
            ["Defeat Evil", null, "High"]
        ]
    },
    {   name : "Work",
        tasks: [
            ["Work hard!", null, "Low"],
            ["Don't get fired", "2065-01-01", "High"],
            ["Placate boss", null, null]
        ]
    }]

export { returnFolders, populateStorage, getFromStorage }