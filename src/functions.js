// Genarate html based on todo list 
const genarateTodoHtml = (taskName, taskDate, taskPriority, taskComplete, taskSerial) => {
    // make the label and checkbox unique for each todo list task

    let taskUniqueId = `${taskName}${taskSerial}`;
    // checkbox
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", taskUniqueId);

    // checkbox label
    let label = document.createElement("label");
    label.setAttribute("for", taskUniqueId)

    // div task name
    let paraTodoName = document.createElement("p");
    paraTodoName.textContent = taskName;
    paraTodoName.classList.add("taskName");

    // When task is compelete 
    // add line through to the text
    if (taskComplete == true) {
        paraTodoName.style.textDecoration = "line-through";
    }

    // div task date
    let divTodoDate = document.createElement("div");
    divTodoDate.textContent = taskDate;

    // btn task priority
    let btnTodoPriority = document.createElement("button");
    btnTodoPriority.textContent = taskPriority;

    // delete 
    let faDelete = document.createElement("i");
    faDelete.classList.add("fa-solid", "fa-delete-left");
    faDelete.setAttribute("title", "Delete Todo");

    // edit 
    let faEdit = document.createElement("i");
    faEdit.classList.add("fa-solid", "fa-pen-to-square");
    faEdit.setAttribute("title", "Edit Todo");

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
    label.appendChild(paraTodoName);

    // insert all item to a single div
    div.appendChild(checkboxDiv);
    div.appendChild(otherDiv);
    div.setAttribute("data-index", taskSerial);

    return div;
}
// Remove nodes from a parent node
const clearDiv = (domElement) => {
    const taskList = document.querySelector(domElement);
    while (taskList.lastChild) {
        taskList.removeChild(taskList.lastChild);
    }
}
const renderTodoList = (domElement, taskName, taskDate, taskPriority, taskComplete, taskSerial) => {
    const taskList = document.querySelector(domElement);
    taskList.appendChild(genarateTodoHtml(taskName, taskDate, taskPriority, taskComplete, taskSerial));

}
export { genarateTodoHtml, clearDiv, renderTodoList };