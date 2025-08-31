import { eventBus } from "./eventBus.js"
import { todoModel } from "./Models/todoModel.js";
import { projectModel } from "./Models/projectModel.js";

export const storage = (function() {


    function setProjectIntoStorage(project) {
        localStorage.setItem(localStorage.length, JSON.stringify(project));
    }

    function getProjectOutOfStorage(index) {
        const gottenProject = JSON.parse(localStorage.getItem(index));
        return gottenProject;
    }

    function updateProject(project){
        const array = getProjectsList();
        for (let i = 0 ; i < array.length ; i++ ){
            if(array[i].projectId === project.projectId){
                localStorage.removeItem(i);
                localStorage.setItem(i, JSON.stringify(project)); 
            }

        }
    }

    function getProjectById(projectId){
        const array = getProjectsList();
        for (let i = 0 ; i < array.length ; i++ ){
            if(array[i].projectId === projectId){
                return rehydrateProject(JSON.parse(localStorage.getItem(i)));;
            }
        }
    }

    function rehydrateProject(gottenProject){
        const rehydratedTodos = [];
        
        for (let todo of gottenProject.projectTodos) {
            rehydratedTodos.push(rehydrateTodo(todo));
        }

        return projectModel.createProject({
            name: gottenProject.projectName, 
            description: gottenProject.projectDescription, 
            id: gottenProject.projectId,
            todos: rehydratedTodos,
        });
    }

    function rehydrateTodo(gottenTodo){
        return todoModel.createTodo({
            givenTitle: gottenTodo.title, 
            givenDescription: gottenTodo.description, 
            id: gottenTodo.todoId,
            projectId: gottenTodo.parentId,
            givenDate: gottenTodo.dueDate,
            givenPriority: gottenTodo.priority,
            givenNotes: gottenTodo.notes,
            givenCompletion: gottenTodo.isCompleted,
            givenChecklist: gottenTodo.checklist,
            defaultPriorityLevels: gottenTodo.priorityLevels
        });
    }

    function getProjectsList() {
        const array = [];
        for (let i = 0 ; i < localStorage.length ; i++ ){
            array.push(rehydrateProject(getProjectOutOfStorage(i)));
        }
        return array;
    }

    function deleteTodoFromProject(todoId, projectId) {
        const proj = getProjectById(projectId);
        proj.projectTodos.splice(proj.projectTodos.findIndex(todo => todo.todoId === todoId), 1);
        updateProject(proj);
    }

    function deleteAllProjects(){
        localStorage.clear();
    }

    return {
        setProjectIntoStorage,
        updateProject,
        deleteTodoFromProject,
        deleteAllProjects,
        getProjectById,
        getProjectsList
    }

})();