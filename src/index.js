import _ from 'lodash';
import "./style.css";
import 'normalize.css';
import { format, compareAsc } from 'date-fns'
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import { genarateTodoHtml, clearDiv } from './functions.js';

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

// Add a project to the project section
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
    console.log(todoList[0].taskDate);
    todoList[0].taskDone = true;

})


const renderTodoList = () => {
    const taskList = document.querySelector(".show-task-list");
    clearDiv(taskList);
    taskList.appendChild(genarateTodoHtml("abcd", "10 feb", "urgent", 0));
    taskList.appendChild(genarateTodoHtml("abcd", "10 feb", "urgent", 1));

    taskList.appendChild(genarateTodoHtml("abcd", "10 feb", "urgent", 2));

}
renderTodoList();
// const dates = [
//     new Date(1995, 6, 2),
//     new Date(1987, 1, 11),
//     new Date(1989, 6, 10),
// ]
// console.log(dates.sort(compareAsc))
