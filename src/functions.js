import { activeProject, allProject } from "./index.js";
// Genarate html based on todo list 
const genarateTodoHtml = (taskName, taskDate, taskPriority, taskComplete, taskSerial) => {
    // make the label and checkbox unique for each todo list task

    let taskUniqueId = `${taskName}${taskSerial}`;
    // checkbox
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("data-checkboxindex",taskSerial);
    checkBox.setAttribute("data-checkboxproject",activeProject);


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
        checkBox.checked = true;
        paraTodoName.style.textDecoration = "line-through";
    }else if(taskComplete == false){
        checkBox.checked = false;
        paraTodoName.style.textDecoration = "none";
    }

    // div task date
    let divTodoDate = document.createElement("div");
    divTodoDate.textContent = taskDate;

    // btn task priority
    let btnTodoPriority = document.createElement("button");
    btnTodoPriority.textContent = taskPriority;

    // delete
    let faDelDiv = document.createElement("div"); 
    let faDelete = document.createElement("i");
    faDelete.classList.add("fa-solid", "fa-delete-left");
    faDelete.setAttribute("title", "Delete Todo");
    faDelete.classList.add("delete-todo");
    faDelDiv.appendChild(faDelete);
    faDelDiv.addEventListener("click",(e)=>{
        console.log("delete");
    })


    // edit 
    let faEditDiv = document.createElement("div"); 
    let faEdit = document.createElement("i");
    faEdit.classList.add("fa-solid", "fa-pen-to-square");
    faEdit.setAttribute("title", "Edit Todo");
    faEdit.classList.add("edit-todo");
    faEditDiv.appendChild(faEdit);
    faEditDiv.addEventListener("click",(e)=>{
        console.log("edit");
    })

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
    otherDiv.appendChild(faDelDiv);
    otherDiv.appendChild(faEditDiv);

    // div that contain all todo element
    let div = document.createElement("div");
    div.classList.add("todo-list");

    // insert task name to label
    label.appendChild(paraTodoName);

    // insert all item to a single div
    div.appendChild(checkboxDiv);
    div.appendChild(otherDiv);
    div.setAttribute("data-divindex", taskSerial);

    // done task when click on checkbox
    checkBox.addEventListener("click",(e)=>{
        let checkBoxIndex = Number(e.target.dataset.checkboxindex);
        let checkboxProject = e.target.dataset.checkboxproject;
        // checked if the checkbox is checked
        let isCheckboxChecked = e.target.checked;
        let checkboxName = e.target.parentNode.lastChild.lastChild;
        if(isCheckboxChecked){
            checkboxName.style.textDecoration = "line-through";
            // update the taskdone of the todolist
            let projectListArray = allProject[checkboxProject];
            projectListArray[checkBoxIndex].taskDone = true;
            // todoList[checkBoxIndex].taskDone =true;
        }else if (!isCheckboxChecked){
            checkboxName.style.textDecoration = "none";
            // update the taskdone of the todolist
            let projectListArray = allProject[checkboxProject];
            projectListArray[checkBoxIndex].taskDone = false;
        }
    })
    return div;
}
// Remove nodes from a parent node
const clearDiv = (domElement) => {
    const taskList = document.querySelector(domElement);
    while (taskList.lastChild) {
        taskList.removeChild(taskList.lastChild);
    }
}
// render todo list based on user input
const renderTodoList = (domElement, taskName, taskDate, taskPriority, taskComplete, taskSerial) => {
    const taskList = document.querySelector(domElement);
    taskList.appendChild(genarateTodoHtml(taskName, taskDate, taskPriority, taskComplete, taskSerial));

}
// remove class .project-active from html element
function removeActiveClass( htmlNodes ){
    htmlNodes.forEach((node)=>{
        node.classList.remove("project-active");
    })
}
// Check which project is active
function findActiveProject( projectListNodes ){
    let activeProject = null;
    projectListNodes.forEach((project)=>{
        if(project.classList.contains("project-active")){
            activeProject = project.dataset.project;
        };
    })
    return activeProject;
}

export { removeActiveClass,findActiveProject, genarateTodoHtml, clearDiv, renderTodoList };