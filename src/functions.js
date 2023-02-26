// Genarate html based on todo list 
const genarateTodoHtml = (taskName, taskDate, taskPriority, taskSerial) => {
    // checkbox
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", "task");
    // checkbox label
    let label = document.createElement("label");
    label.setAttribute("for", "task")
    // div task name
    let divTodoName = document.createElement("div");
    divTodoName.textContent = taskName;
    // div task date
    let divTodoDate = document.createElement("div");
    divTodoDate.textContent = taskDate;
    // btn task priority
    let btnTodoPriority = document.createElement("button");
    btnTodoPriority.textContent = taskPriority;

    // delete 
    let faDelete = document.createElement("i");
    faDelete.classList.add("fa-solid", "fa-delete-left");
    // edit 
    let faEdit = document.createElement("i");
    faEdit.classList.add("fa-solid", "fa-pen-to-square");

    // contain checkbox and id
    let checkboxDiv = document.createElement("div");
    checkboxDiv.classList.add("todo-left-side");
    checkboxDiv.appendChild(checkBox);
    checkboxDiv.appendChild(label);

    // contain date,prority,edit,delete
    let otherDiv = document.createElement("div");
    otherDiv.classList.add("todo-right-side");
    otherDiv.appendChild(divTodoDate);
    otherDiv.appendChild(btnTodoPriority);
    otherDiv.appendChild(faDelete);
    otherDiv.appendChild(faEdit);

    // div that contain all todo element
    let div = document.createElement("div");
    div.classList.add("todo-list");

    // insert task name to label
    label.appendChild(divTodoName);

    // insert all item to a single div
    div.appendChild(checkboxDiv);
    div.appendChild(otherDiv);
    div.setAttribute("data-index", taskSerial);

    return div;
}
// Remove nodes from a parent node
const clearDiv = (htmlElement) => {
    while (htmlElement.lastChild) {
        htmlElement.removeChild(htmlElement.lastChild);
    }
}

export { genarateTodoHtml, clearDiv };