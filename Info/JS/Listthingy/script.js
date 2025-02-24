document.addEventListener("DOMContentLoaded", () => {
  const dataTable = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];
  const toggleButton = document.getElementById("toggleButton");
  const saveButton = document.getElementById("saveButton");
  const addDataForm = document.getElementById("addDataForm");
  let editMode = false;
  let data = [];

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/data");
    data = await response.json();
    renderTable();
  };

  const renderTable = () => {
    dataTable.innerHTML = "";
    data.forEach((item, index) => {
      const row = dataTable.insertRow();
      Object.values(item).forEach((value, colIndex) => {
        const cell = row.insertCell();
        if (editMode) {
          const input = document.createElement("input");
          input.type = "text";
          input.value = value;
          input.dataset.index = index;
          input.dataset.colIndex = colIndex;
          cell.appendChild(input);
        } else {
          cell.textContent = value;
        }
      });
    });
  };

  toggleButton.addEventListener("click", () => {
    editMode = !editMode;
    saveButton.style.display = editMode ? "block" : "none";
    renderTable();
  });

  saveButton.addEventListener("click", async () => {
    const inputs = dataTable.getElementsByTagName("input");
    for (let input of inputs) {
      const index = input.dataset.index;
      const colIndex = input.dataset.colIndex;
      data[index][Object.keys(data[index])[colIndex]] = input.value;
    }
    await fetch("http://localhost:3000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    editMode = false;
    saveButton.style.display = "none";
    renderTable();
  });

  addDataForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const newData = {
      id: document.getElementById("idInput").value,
      username: document.getElementById("usernameInput").value,
      name: document.getElementById("nameInput").value,
      surname: document.getElementById("surnameInput").value,
    };
    data.push(newData);
    await fetch("http://localhost:3000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    renderTable();
    addDataForm.reset();
  });

  fetchData();
});
