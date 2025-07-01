document.addEventListener("DOMContentLoaded", () => {
  loadTasks();


  document.querySelectorAll(".task-drop").forEach(wrapper => {
    wrapper.addEventListener("dragover", ev => ev.preventDefault());

    wrapper.addEventListener("drop", ev => {
      ev.preventDefault();
      const taskId = ev.dataTransfer.getData("text/plain");
      const task = document.getElementById(taskId);

      const columnId = wrapper.dataset.column;
      const dropZone = document.getElementById(columnId);
      dropZone.appendChild(task);

      updateTaskColor(task, columnId);
      renumberTasks();
      saveTasks();
    });
  });


  const addBtn = document.getElementById("add-btn");
  if (addBtn) {
    addBtn.addEventListener("click", addTask);
  }
});

function drag(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.id);
}

function addTask() {
  const input = document.getElementById("task-input");
  const text = input.value.trim();
  if (text === "") return;

  const taskId = "task-" + Date.now();
  const totalTasks = document.querySelectorAll(".task-container div").length;
  const numberedText = `${totalTasks + 1}. ${text}`;
  const taskElement = createTaskElement(taskId, numberedText, "todo");

  document.getElementById("todo").appendChild(taskElement);
  input.value = "";
  saveTasks();
}

function createTaskElement(id, text, columnId) {
  const div = document.createElement("div");
  div.id = id;
  div.className = `p-3 rounded shadow cursor-move flex justify-between items-center ${getColorByColumn(columnId)}`;
  div.draggable = true;
  div.addEventListener("dragstart", drag);

  const span = document.createElement("span");
  span.textContent = text;

  const delBtn = document.createElement("button");
delBtn.className = "ml-2";


const icon = document.createElement("img");
icon.src = "./delete_icon.png";
icon.alt = "Delete";
icon.className = "w-5 h-5"; 

delBtn.appendChild(icon);

delBtn.addEventListener("click", () => {
  div.remove();
  renumberTasks();
  saveTasks();
});

div.appendChild(span);
div.appendChild(delBtn);

return div;

}

function getColorByColumn(columnId) {
  switch (columnId) {
    case "todo":
      return "bg-red-100";
    case "inprogress":
      return "bg-blue-100";
    case "done":
      return "bg-green-100";
    default:
      return "bg-gray-100";
  }
}

function updateTaskColor(taskElement, columnId) {
  taskElement.classList.remove("bg-red-100", "bg-blue-100", "bg-green-100");
  taskElement.classList.add(getColorByColumn(columnId));
}

function renumberTasks() {
  const allTasks = document.querySelectorAll(".task-container div span");
  allTasks.forEach((span, index) => {
    const parts = span.textContent.split(". ");
    const taskText = parts.length > 1 ? parts.slice(1).join(". ") : span.textContent;
    span.textContent = `${index + 1}. ${taskText}`;
  });
}

function saveTasks() {
  const columns = ["todo", "inprogress", "done"];
  const data = {};

  columns.forEach(colId => {
    const col = document.getElementById(colId);
    const tasks = [];
    col.querySelectorAll("div").forEach(task => {
      const taskId = task.id;
      const taskText = task.querySelector("span").textContent;
      tasks.push({ id: taskId, text: taskText });
    });
    data[colId] = tasks;
  });

  localStorage.setItem("taskBoard", JSON.stringify(data));
}

function loadTasks() {
  const data = JSON.parse(localStorage.getItem("taskBoard"));
  if (!data) return;

  Object.keys(data).forEach(colId => {
    const col = document.getElementById(colId);
    col.innerHTML = "";
    data[colId].forEach(task => {
      const taskEl = createTaskElement(task.id, task.text, colId);
      col.appendChild(taskEl);
    });
  });

  renumberTasks();
}
