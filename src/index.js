import _ from 'lodash';
import "./style.css";
import 'normalize.css';
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

// Show project input field when click on add project
addProjectEl.addEventListener("click", () => {
    projectField.classList.toggle("hidden");
})
// Add a project to the list when click on add btn
addBtnEl.addEventListener("click", () => {
    let divEl = document.createElement("div");
    divEl.textContent = projectFieldEl.value;
    projectListEl.appendChild(divEl);
    //Clear project name
    projectFieldEl.value = '';
    projectField.classList.toggle("hidden");
})
// Hide a project input field when click on cancel btn
cancelBtnEl.addEventListener("click", () => {
    projectField.classList.toggle("hidden");
})