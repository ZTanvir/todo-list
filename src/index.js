import _ from 'lodash';
import "./style.css";
import 'normalize.css';
import { format, compareAsc } from 'date-fns'
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import { removeActiveClass,findActiveProject,genarateTodoHtml, clearDiv, renderTodoList } from './functions.js';

const projectForm = document.querySelector("#add-project");
const cancelBtnEl = document.querySelector(".btn-cancel");
const projectFieldEl = document.querySelector("#input-project-name");
const projectListEl = document.querySelector(".project-list");
const addProjectEl = document.querySelector(".add-project-text");
const projectField = document.querySelector(".add-project-field");
let projectBoardEl = document.querySelector(".project-board");
let projectsEl = document.querySelectorAll('.projects');

// btn
const addTaskBtn = document.querySelector(".add-task-btn");
const inputTodo = document.querySelector("#get-todo");

// All projects
let allProject = {};
// Project which one is active now
let activeProject = null;

// Show project input field when click on add project
addProjectEl.addEventListener("click", () => {
    projectField.classList.toggle("hidden");
})

// Add a project to the project section
projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let divEl = document.createElement("div");
    divEl.textContent = projectFieldEl.value;

     // check the project name contains space
     if(projectFieldEl.value.includes(" ")){
        //remove all spaces and make it a single project name
        let divideProjectname = projectFieldEl.value.split(" ").join("");
        divEl.dataset.project = divideProjectname;
    } else{
        divEl.dataset.project = projectFieldEl.value;
    }

    divEl.classList.add("projects");
    projectListEl.appendChild(divEl);
    console.log(divEl.dataset.project);
    // Add folder to project
    let projectName = divEl.dataset.project;
    allProject[projectName] = [];
 
    console.log(allProject);
    projectField.classList.toggle("hidden");

    // reset the form
    projectForm.reset();

    // select all html element inside project
    projectsEl = document.querySelectorAll(".projects");

    // add active class when click on a project 
    projectsEl.forEach((project)=>{
        project.addEventListener("click",(e)=>{
            removeActiveClass(projectsEl);
            project.classList.add("project-active");

            // change project name in the list
            let projectNameText = e.target.textContent;
            projectBoardEl.textContent = projectNameText;
            activeProject = findActiveProject(projectsEl);
            console.log("clicked project",activeProject);

            // when the project already contain todo list
            // Render it to the screen
            if(activeProject != null){
                console.log("render project-");
                console.log("");
                let projectListArray = allProject[activeProject];
                // render array item to the screen
                clearDiv(".show-task-list");
                for (let i = 0; i < projectListArray.length; i++) {
                    renderTodoList(".show-task-list", projectListArray[i].taskName, projectListArray[i].taskDate, projectListArray[i].taskPriority, projectListArray[i].taskDone, i);
                }
            }
        })
    })
    // render todolist if th
    console.log(projectsEl);
})

// Hide a project input field when click on cancel btn
cancelBtnEl.addEventListener("click", () => {
    projectField.classList.toggle("hidden");
})

// Create todo class
const Todo = (taskName, taskDate, taskPriority, taskDone) => {
    return { taskName, taskDate, taskPriority, taskDone };
}

// click on add todo list
inputTodo.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoName = document.querySelector("#task-name");
    const todoDate = document.querySelector("#pick-date");
    const todoPriority = document.querySelector("#priority");

    console.log("all projects-",projectsEl);
    
    // check which project is active
    activeProject = findActiveProject(projectsEl);
    console.log(activeProject);
    // genarateTodo object based on user input
    const genarateTodo = Todo(todoName.value, todoDate.value, todoPriority.value, false);
    if(activeProject != null){
        let projectListArray = allProject[activeProject];
        projectListArray.push(genarateTodo);
        // render array item to the screen
        clearDiv(".show-task-list");
        for (let i = 0; i < projectListArray.length; i++) {
            renderTodoList(".show-task-list", projectListArray[i].taskName, projectListArray[i].taskDate, projectListArray[i].taskPriority, projectListArray[i].taskDone, i);
        }
    }  
    console.log(allProject);
    // Reset todo input field
    inputTodo.reset();
})

// Change task board based on task durations
let allTask = document.querySelectorAll(".task-duration");
allTask.forEach((task)=>{
    task.addEventListener("click",(e)=>{
        console.log(task);
        let taskName = task.dataset.tasktype;
        if(taskName === "all"){
            projectBoardEl.textContent = "All Tasks";

        }else if(taskName === "today"){
            projectBoardEl.textContent = "Today";

        }else if(taskName === "weekly"){
            projectBoardEl.textContent = "Next 7 Days";

        }else if(taskName === "important"){
            projectBoardEl.textContent = "Important";
        }
    })
})


// const dates = [
//     new Date(1995, 6, 2),
//     new Date(1987, 1, 11),
//     new Date(1989, 6, 10),
// ]
// console.log(dates.sort(compareAsc))

// taskList.appendChild(genarateTodoHtml("abcd", "10 feb", "urgent", false, 0));
// taskList.appendChild(genarateTodoHtml("abcd", "10 feb", "urgent", true, 1));

// taskList.appendChild(genarateTodoHtml("abcd", "10 feb", "urgent", false, 2));

export {allProject,activeProject};