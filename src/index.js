import { eventBus } from "./eventBus.js"
import { projectModel } from "./Models/projectModel.js"
import { projectDOM } from "./DOM/projectDOM.js"
import { storage } from "./storage.js"
import "./css/normalize.css"
import "./css/base.css"
import "./css/projects.css"
import "./css/todos.css"



(() => {

    const headerText = document.querySelector('.header-text');
    headerText.textContent = 'TODO LIST';

    projectDOM.loadEverything();

    (function fillProjectsList(){

        const projectsList = projectModel.projectsList;
        projectsList.splice(0, projectsList.length);
        const gottenProjectsList = storage.getProjectsList();
        for (let project of gottenProjectsList){
            projectModel.addProjectToProjectsList(project);
        }

    })();

})();

eventBus.subscribe('todoDeleted', ({todoId, projectId}) => {
    const project = projectModel.projectsList.find(p => p.projectId === projectId );    
    storage.deleteTodoFromProject(todoId, projectId);
    project.deleteTodo(todoId);

});

eventBus.subscribe('todoAdded', ({todoObject, projectId}) => {
    const project = projectModel.projectsList.find(p => p.projectId === projectId );
    project.addTodo(todoObject);
    storage.updateProject(project);
});


eventBus.subscribe('todoModified', ({todoObj, projectId}) => {
    const project = projectModel.projectsList.find(p => p.projectId === projectId );
    project.projectTodos.splice(project.projectTodos.indexOf(todoObj.todoId), 1, todoObj);
    storage.updateProject(project);
});