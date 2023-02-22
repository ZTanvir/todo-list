import _ from 'lodash';
import "./style.css";
import 'normalize.css';
import { format, compareAsc } from 'date-fns'
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

const addBtnEl = document.querySelector(".btn-add");
const cancelBtnEl = document.querySelector(".btn-cancel");
const projectFieldEl = document.querySelector("#input-project-name");
const projectListEl = document.querySelector(".project-list");
const addProjectEl = document.querySelector(".add-project-text");
const projectField = document.querySelector(".add-project-field");
// btn
const addTaskBtn = document.querySelector(".add-task-btn");
const inputTodo = document.querySelector("#get-todo");

// All projects
let allProject = {};

// Show project input field when click on add project
addProjectEl.addEventListener("click", () => {
    projectField.classList.toggle("hidden");
})

// Add a project to the list when click on add btn
addBtnEl.addEventListener("click", () => {
    let divEl = document.createElement("div");
    divEl.textContent = projectFieldEl.value;
    divEl.dataset.project = projectFieldEl.value;
    projectListEl.appendChild(divEl);
    console.log(divEl.dataset.project);
    // Add folder to project
    let projectName = divEl.dataset.project;
    allProject[projectName] = [];
    console.log(allProject);
    //Clear project name
    projectFieldEl.value = '';
    projectField.classList.toggle("hidden");
})

// Hide a project input field when click on cancel btn
cancelBtnEl.addEventListener("click", () => {
    projectField.classList.toggle("hidden");
})

const todoList = [];
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

    // genarateTodo based on user input
    const genarateTodo = Todo(todoName.value, todoDate.value, todoPriority.value, false);
    todoList.push(genarateTodo);
    console.log(todoList);
    console.log(typeof (todoList[0].taskDate));


})
// Remove nodes from a parent node
const clearDiv = (htmlElement) => {
    while (htmlElement.lastChild) {
        htmlElement.removeChild(htmlElement.lastChild);
    }
}
// Genarate html based on todo list 
const genarateTodoHtml = (taskName, taskDate, taskPriority) => {
    // checkbox
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    // div task name
    let divTodoName = document.createElement("div");
    divTodoName.textContent = taskName;
    // div task date
    let divTodoDate = document.createElement("div");
    divTodoDate.textContent = taskDate;
    // btn task priority
    let btnTodoPriority = document.createElement("button");
    btnTodoPriority.textContent = taskPriority;
    // edit 
    let faEdit = document.createElement("i");
    faEdit.classList.add("fa-solid", "fa-pen-to-square");
    // delete 
    let faDelete = document.createElement("i");
    faDelete.classList.add("fa-solid", "fa-delete-left");

    // div that contain all todo element
    let div = document.createElement("div");

}

const renderTodoList = () => {
    const taskList = document.querySelector(".show-task-list");
    clearDiv(taskList);
}
renderTodoList();
// const dates = [
//     new Date(1995, 6, 2),
//     new Date(1987, 1, 11),
//     new Date(1989, 6, 10),
// ]
// console.log(dates.sort(compareAsc))
