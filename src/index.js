import _ from 'lodash';
import "./style.css";
import 'normalize.css';
import { differenceInDays,format} from 'date-fns'
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
let todoTaskListEl = document.querySelector(".show-task-list");
let allTask = document.querySelectorAll(".task-duration");
const modal = document.querySelector("#modal");
const modalForm = document.querySelector("#modal__form");
const modalTaskName = document.querySelector("#modal-task-name");
const modalTaskdate = document.querySelector("#modal-pick-date");
const modalTaskPriority = document.querySelector("#modal-priority");

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
    // Make the input todo form visiable
    inputTodo.style.display = "flex";
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
    // Add folder to project
    let projectName = divEl.dataset.project;
    allProject[projectName] = [];
 
    projectField.classList.toggle("hidden");

    // reset the form
    projectForm.reset();

    // select all html element inside project
    projectsEl = document.querySelectorAll(".projects");

    // add active class when click on a project 
    projectsEl.forEach((project)=>{
        project.addEventListener("click",(e)=>{
            // make the input todo visiable
            inputTodo.style.display = "flex";
            removeActiveClass(projectsEl);
            project.classList.add("project-active");

            // change project name in the list
            let projectNameText = e.target.textContent;
            projectBoardEl.textContent = projectNameText;
            activeProject = findActiveProject(projectsEl);

            // when the project already contain todo list
            // Render it to the screen
            if(activeProject != null){
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
})

// Hide a project input field when click on cancel btn
cancelBtnEl.addEventListener("click", () => {
    projectField.classList.toggle("hidden");
    projectForm.reset();
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

    // check which project is active
    activeProject = findActiveProject(projectsEl);
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
    // Reset todo input field
    inputTodo.reset();
})

// Change task board based on task durations
allTask.forEach((task)=>{
    task.addEventListener("click",(e)=>{
        // hide the input todo form
        inputTodo.style.display = "none";
        // date
        let todaysDate = new Date();
        const [year,month,day] = [todaysDate.getFullYear(),todaysDate.getMonth()+1,todaysDate.getDate()];
        // to formate 2022-03-19
        let formateToday = `${year}-0${month}-${day}`;
        // Check total todo projects available
        let projectSize = Object.keys(allProject).length;
        let taskName = e.target.dataset.tasktype;
        if(taskName === "all"){
            projectBoardEl.textContent = "All Tasks";
            clearDiv(".show-task-list");
            if(projectSize === 0){
                todoTaskListEl.textContent = "Yay! No Tasks!";
            }else if(projectSize !== 0){
                clearDiv(".show-task-list");
                for(let item in allProject){
                    let projectListArray = allProject[item];
                    activeProject = item;
                    for (let i = 0; i < projectListArray.length; i++) {
                        renderTodoList(".show-task-list", projectListArray[i].taskName, projectListArray[i].taskDate, projectListArray[i].taskPriority, projectListArray[i].taskDone, i);
                    }
                }   
            }
        }
        
        else if(taskName === "today"){
            projectBoardEl.textContent = "Today";
            clearDiv(".show-task-list");
            if(projectSize === 0){
                todoTaskListEl.textContent = "Yay! No Tasks!";
            }else if(projectSize !== 0){
                clearDiv(".show-task-list");

                // render task when the task date match with today
                for(let item in allProject){
                    let projectListArray = allProject[item];
                    activeProject = item;
                    for (let i = 0; i < projectListArray.length; i++) {
                        let todoDate = format(new Date(projectListArray[i].taskDate),'MM/dd/yyyy');
                        let todayDateFormate = format(new Date(formateToday),'MM/dd/yyyy');
                        console.log(todoDate,todayDateFormate);
                        if(todayDateFormate == todoDate){
                            renderTodoList(".show-task-list", projectListArray[i].taskName, projectListArray[i].taskDate, projectListArray[i].taskPriority, projectListArray[i].taskDone, i);
                        }
                    }
                }   
            }

        }
        
        else if(taskName === "weekly"){
            projectBoardEl.textContent = "Next 7 Days";

            clearDiv(".show-task-list");
            if(projectSize === 0){
                todoTaskListEl.textContent = "Yay! No Tasks!";
            }else if(projectSize !== 0){
                clearDiv(".show-task-list");

                // render task when the difference between task date is 7
                for(let item in allProject){
                    let projectListArray = allProject[item];
                    activeProject = item;
                    for (let i = 0; i < projectListArray.length; i++) {
                        let todoDate = new Date(projectListArray[i].taskDate);
                        let todayDateFormate = new Date(formateToday);
                           
                        let intervalFromToday = differenceInDays(
                            new Date(todoDate),
                            new Date(todayDateFormate)
                        )
                        if(intervalFromToday >= 0 && intervalFromToday <= 7){
                            renderTodoList(".show-task-list", projectListArray[i].taskName, projectListArray[i].taskDate, projectListArray[i].taskPriority, projectListArray[i].taskDone, i);
                        }
                    }
                }   
            }

        }
        else if(taskName === "important"){
            projectBoardEl.textContent = "Important";
            clearDiv(".show-task-list");
        }
    })
})

// close modal
let closeModalBtn = document.querySelector(".close-modal");
closeModalBtn.addEventListener("click",()=>{
    modal.close();
})

export {allProject,activeProject,modal,modalForm,modalTaskName,modalTaskdate,modalTaskPriority};