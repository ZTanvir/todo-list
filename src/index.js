import _ from 'lodash';
import "./style.css";
import 'normalize.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';


(function createProject() {
    const addBtnEl = document.querySelector(".btn-add");
    const projectFieldEl = document.querySelector("#input-project-name");
    const projectListEl = document.querySelector(".project-list");

    addBtnEl.addEventListener("click", () => {
        let divEl = document.createElement("div");
        divEl.textContent = projectFieldEl.value;
        projectListEl.appendChild(divEl);
        //Clear project name
        projectFieldEl.value = '';
    })

})();
// document.body.appendChild(component());