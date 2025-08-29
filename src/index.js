import { eventBus } from "./eventBus.js"
import { projectModel } from "./Models/projectModel.js"
import { projectDOM } from "./DOM/projectDOM.js"
import "./css/normalize.css"
import "./css/base.css"
import "./css/projects.css"
import "./css/todos.css"

(() => {

    const headerText = document.querySelector('.header-text');
    headerText.textContent = 'TODO LIST';

    projectDOM.loadBaseProjectElements();
    projectDOM.addDefaultProjectCard();

})();

eventBus.subscribe('todoDeleted', ({todoId, projectId}) => {
    const project = projectModel.projectsList.find(p => p.projectId === projectId );    
    project.deleteTodo(todoId);
});

eventBus.subscribe('todoAdded', ({todoObject, projectId}) => {
    const project = projectModel.projectsList.find(p => p.projectId === projectId );    
    project.addTodo(todoObject);    
});


