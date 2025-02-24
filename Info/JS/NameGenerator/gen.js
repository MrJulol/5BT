const nameDisplay = document.getElementById("name-display");
const nameList = document.getElementById("name-list");

let nameHistory = [];
let currentHistoryIndex = -1;

window.addEventListener("load", () => {
  (JSON.parse(localStorage.getItem("nameList")) || []).forEach((name) => {
    addNameToList(name, false);
  });
});

const generateRandomName = () => {
  const names = [
    "Lorik",
    "Luca",
    "Elias",
    "Ivan",
    "Florian",
    "Alex",
    "Felix",
    "Fabian",
    "Maria",
    "Leo",
    "Ilja",
    "Julian",
  ];
  return names[Math.floor(Math.random() * names.length)];
};

const addNameToList = (name, save = true) => {
  const existingName = Array.from(nameList.children).find(
    (li) => li.textContent === name
  );
  if (existingName) {
    existingName.classList.add("highlight-yellow");
    setTimeout(() => existingName.classList.remove("highlight-yellow"), 1000);
    return;
  }

  const listItem = document.createElement("li");
  listItem.textContent = name;
  listItem.addEventListener("click", () => {
    listItem.classList.add("highlight-red");
    setTimeout(() => {
      listItem.remove();
      updateLocalStorage();
    }, 500);
  });

  listItem.classList.add("highlight-green");
  nameList.appendChild(listItem);
  setTimeout(() => listItem.classList.remove("highlight-green"), 1000);

  if (save) {
    updateLocalStorage();
  }
};

const updateLocalStorage = () => {
  localStorage.setItem(
    "nameList",
    JSON.stringify(Array.from(nameList.children).map((li) => li.textContent))
  );
};

const removeLastNameFromList = () => {
  if (nameList.lastChild) {
    const lastChild = nameList.lastChild;
    lastChild.classList.add("highlight-red");
    setTimeout(() => {
      lastChild.remove();
      updateLocalStorage();
    }, 500);
  }
};

document.addEventListener("keydown", (event) => {
  if (event.key === "g" || event.key === "G") {
    const newName = generateRandomName();
    nameDisplay.textContent = newName;
    nameHistory.push(newName);
    currentHistoryIndex = nameHistory.length - 1;
    addNameToList(newName);
  }

  if (event.key === "ArrowUp") {
    if (currentHistoryIndex > 0) {
      currentHistoryIndex--;
      nameDisplay.textContent = nameHistory[currentHistoryIndex];
    }
  }

  if (event.key === "ArrowDown") {
    if (currentHistoryIndex < nameHistory.length - 1) {
      currentHistoryIndex++;
      nameDisplay.textContent = nameHistory[currentHistoryIndex];
    }
  }
  if (event.key === "ArrowRight") {
    const currentName = nameDisplay.textContent;
    if (!currentName.match("[G]")) addNameToList(currentName);
  }

  if (event.key === "ArrowLeft") {
    removeLastNameFromList();
  }
  if (event.key === "D" || event.key === "d") {
    nameList.innerHTML = "";
    nameDisplay.innerHTML = "Press [G] to generate a name";
    nameHistory = [];
    updateLocalStorage();
  }
});
