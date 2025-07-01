document.addEventListener("DOMContentLoaded", () => {
  loadTasks();

  const addBtn = document.getElementById("add-btn");
  if (addBtn) {
    addBtn.addEventListener("click", addTask);
  }
});

function addTask() {
  const input = document.getElementById("task-input");
  const text = input.value.trim();
  if (text === "") return;

  const taskId = "task-" + Date.now();
  const totalTasks = document.querySelectorAll(".task-container div").length;
  const numberedText = `${totalTasks + 1}. ${text}`;
  const taskElement = createTaskElement(taskId, numberedText);

  document.getElementById("todo").appendChild(taskElement);
  input.value = "";
  saveTasks();
}

function createTaskElement(id, text) {
  const div = document.createElement("div");
  div.id = id;
  div.className = "p-3 rounded shadow flex justify-between items-center bg-blue-100";

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

function renumberTasks() {
  const allTasks = document.querySelectorAll(".task-container div span");
  allTasks.forEach((span, index) => {
    const parts = span.textContent.split(". ");
    const taskText = parts.length > 1 ? parts.slice(1).join(". ") : span.textContent;
    span.textContent = `${index + 1}. ${taskText}`;
  });
}

function saveTasks() {
  const todoCol = document.getElementById("todo");
  const tasks = [];

  todoCol.querySelectorAll("div").forEach(task => {
    const taskId = task.id;
    const taskText = task.querySelector("span").textContent;
    tasks.push({ id: taskId, text: taskText });
  });

  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function loadTasks() {
  const data = JSON.parse(localStorage.getItem("todoTasks"));
  if (!data) return;

  const col = document.getElementById("todo");
  col.innerHTML = "";
  data.forEach(task => {
    const taskEl = createTaskElement(task.id, task.text);
    col.appendChild(taskEl);
  });

  renumberTasks();
}
