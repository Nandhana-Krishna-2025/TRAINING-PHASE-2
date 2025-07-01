fetch('data.json')
  .then(response => response.json())
  .then(fileData => {
    const container = document.getElementById("file-tree");
    buildFileTree(fileData, container);
  })
  .catch(error => console.error('Error loading JSON:', error));

function buildFileTree(node, parentElement) {
  const item = document.createElement("div");
  item.textContent = node.name;

  if (node.type === "folder") {
    item.classList.add("folder");
  }

  parentElement.appendChild(item);

  if (node.type === "folder" && node.children) {
    const childContainer = document.createElement("div");
    childContainer.classList.add("indent");
    parentElement.appendChild(childContainer);

    for (const child of node.children) {
      buildFileTree(child, childContainer); 
    }
  }
}
