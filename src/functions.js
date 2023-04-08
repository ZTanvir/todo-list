import { activeProject, allProject} from "./index.js";
import {modal,modalForm,modalTaskName,modalTaskdate,modalTaskPriority} from "./index.js";
import deleteImg from './assets/images/delete.svg';
import editImg from './assets/images/edit.svg';


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
    let faDelImg = document.createElement("img"); 
    faDelImg.src = deleteImg;
    faDelImg.alt = "delete todo";
    faDelImg.classList.add("delete-todo");
    faDelImg.setAttribute("data-activeproject",activeProject);
    faDelImg.setAttribute("title","Delete Task");
    faDelImg.addEventListener("click",(e)=>{
        // let taskIndex = Number(e.target.dataset.taskdelindex);
        let taskActiveProject = e.target.dataset.activeproject;
        // find the index of an array,remove the item;
        /* 
            Alternative solution
            * search array by task name and find the index of the array
            * Then remove the index.
            * Array.index of method can do this
            * bug - if two list has same name ,when we want to delete the last
            * created task,it will remove the first one 
        */
        let todoNode = e.target.parentNode.parentNode;
        let taskContent = todoNode.firstChild.lastChild.firstChild.textContent;
        let taskIndex = allProject[taskActiveProject].map(item => item.taskName).indexOf(taskContent);
        allProject[taskActiveProject].splice(taskIndex,1);
        // remove html element
        e.target.parentNode.parentNode.remove();
        localStorage.setItem("allproject",JSON.stringify(allProject));
    })


    // edit 
    let faEditImg = document.createElement("img");
    faEditImg.src = editImg;
    faEditImg.alt = "edit todo";
    faEditImg.setAttribute("title","Edit Task"); 
    faEditImg.classList.add("edit-todo");
    faEditImg.setAttribute("data-edittaskindex",taskSerial);
    faEditImg.setAttribute("data-activeproject",activeProject);
    faEditImg.addEventListener("click",(e)=>{
        modal.showModal();

        let oldTaskName = e.target.parentNode.parentNode.firstChild.lastChild.firstChild;
        let oldTaskDate = e.target.parentNode.parentNode.lastChild.firstChild;
        let oldTaskPriority = e.target.parentNode.parentNode.lastChild.firstChild.nextElementSibling;

        // insert task data to update task form fields
        modalTaskName.setAttribute("value",oldTaskName.textContent);
        modalTaskdate.setAttribute("value",oldTaskDate.textContent);
        let modalTaskArr = [...modalTaskPriority];
        modalTaskArr.forEach(item =>{
            if(item.value == oldTaskPriority.textContent){
                item.setAttribute("selected",true);
            }
        })
        
        // this event will run once
        modalForm.addEventListener("submit",(event)=>{
            let taskActiveProject = e.target.dataset.activeproject;
            
            // find the index of an array,remove the item;
            let todoNode = e.target.parentNode.parentNode;
            let taskContent = todoNode.firstChild.lastChild.firstChild.textContent;
            let taskIndex = allProject[taskActiveProject].map(item => item.taskName).indexOf(taskContent);
            
            // update task with new data
            // {taskName: 'q', taskDate: '2023-04-01', taskPriority: 'normal', taskDone: false}
            allProject[taskActiveProject][taskIndex]['taskName'] = modalTaskName.value;
            allProject[taskActiveProject][taskIndex]['taskDate'] = modalTaskdate.value;
            allProject[taskActiveProject][taskIndex]['taskPriority'] = modalTaskPriority.value;
            
            // update the node -> but it just replace the value
            // didn't render the task
           
            oldTaskName.textContent = modalTaskName.value;
            oldTaskDate.textContent = modalTaskdate.value;
            oldTaskPriority.textContent = modalTaskPriority.value;

            localStorage.setItem("allproject",JSON.stringify(allProject));
        },{once : true});
        // reset the form
        modalForm.reset();        
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
    otherDiv.appendChild(faDelImg);
    otherDiv.appendChild(faEditImg);

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
            localStorage.setItem("allproject",JSON.stringify(allProject));
        }else if (!isCheckboxChecked){
            checkboxName.style.textDecoration = "none";
            // update the taskdone of the todolist
            let projectListArray = allProject[checkboxProject];
            projectListArray[checkBoxIndex].taskDone = false;
            localStorage.setItem("allproject",allProject);
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

// Find match between localstorage keyname and function parameter
function searchLocalstorageIndex (indexName){
    for (let index = 0; index < localStorage.length; index++) {
        if(localStorage.key(index) === indexName){
            return true;
        }        
    }
    return false;
}


export { removeActiveClass,findActiveProject, clearDiv, renderTodoList,searchLocalstorageIndex };