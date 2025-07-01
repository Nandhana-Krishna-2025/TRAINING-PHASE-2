window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[draggable="true"]').forEach(item => {
    item.addEventListener('dragstart', drag);
  });

  document.querySelectorAll('.rounded-xl').forEach(column => {
    column.addEventListener('dragover', allowDrop);
    column.addEventListener('drop', drop);
  });

  document.getElementById("reset-btn").addEventListener("click", resetGame);
});



const correctMapping = {
  "item-1": "column-2", 
  "item-2": "column-2", 
  "item-3": "column-2", 
  "item-4": "column-3", 
  "item-5": "column-2", 
};

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const draggedItem = document.getElementById(data);
  const targetColumn = ev.target.closest(".rounded-xl");
  const innerContainer = targetColumn.querySelector(".space-y-4");

  if (innerContainer && draggedItem) {
    innerContainer.appendChild(draggedItem);

    
    draggedItem.classList.remove("bg-red-100", "bg-blue-100", "bg-green-100");

    if (targetColumn.id === "column-1") {
      draggedItem.classList.add("bg-red-100");
    } else if (targetColumn.id === "column-2") {
      draggedItem.classList.add("bg-blue-100");
    } else if (targetColumn.id === "column-3") {
      draggedItem.classList.add("bg-green-100");
    }

    checkWin();
  }
}

function checkWin() {
  for (const itemId in correctMapping) {
    const item = document.getElementById(itemId);
    const expectedColumnId = correctMapping[itemId];
    const currentColumn = item.closest(".rounded-xl");

    if (!currentColumn || currentColumn.id !== expectedColumnId) {
      return; 
    }
  }

  setTimeout(() => {
    alert("🎉 You Win!");
  }, 100); 
}

function resetGame() {
  const column1 = document.getElementById("column-1").querySelector(".space-y-4");

  for (const itemId in correctMapping) {
    const item = document.getElementById(itemId);
    if (item && column1) {
      column1.appendChild(item);
      item.classList.remove("bg-blue-100", "bg-green-100");
      item.classList.add("bg-red-100");
    }
  }
}
