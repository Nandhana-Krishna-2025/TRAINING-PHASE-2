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

    
    if (targetColumn.id === "column-3") {
      
      draggedItem.classList.remove("bg-blue-100");
      draggedItem.classList.add("bg-green-100");
    } else {
    
      draggedItem.classList.remove("bg-green-100");
      draggedItem.classList.add("bg-blue-100");
    }
    if (targetColumn.id === "column-1") {
      
      draggedItem.classList.remove("bg-blue-100");
      draggedItem.classList.add("bg-red-100");
    } else {
    
      draggedItem.classList.remove("bg-red-100");
      draggedItem.classList.add("bg-blue-100");
    }

  }
}
