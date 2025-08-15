// project class
// has name and description
// stores todo objects
// can add new todo objects into already created project objects?
import { todoModel } from "./todoModel.js"

export const projectModel = (function(){

    const createProject = function(name, description = '') {
    
        // const projectId = crypto.randomUUID();
        let projectName = name;
        let projectDescription = description;
        const projectTodos = [];
     
        const editName = (newName) => { projectName = newName; };
        const editDescription = (newDescription) => { projectDescription = newDescription; };
        const addTodo = (newTodo) => { projectTodos.push(newTodo); };
        const createNewTodo = (title, description) => { return todoModel.createTodo(title, description); };
        const deleteTodo = (todoObj) => { projectTodos[projectTodos.indexOf(todoObj)] };

        return {
            get projectName() { return projectName; },
            get projectDescription() { return projectDescription; },
            get projectTodos() { return projectTodos; },
            editName,
            editDescription,
            addTodo,
            createNewTodo,
            deleteTodo,
        }
    }

    function createDefaultProject(){
        const defaultProject = createProject('Your Project, but with a slightly longer title', 'Your first project');
        const defaultTodo = defaultProject.createNewTodo('To do a habibi');
        defaultTodo.editDueDate(new Date(2026, 11, 31));
        defaultTodo.editPriority(3);
        defaultProject.projectTodos.push(defaultTodo);
        return defaultProject;
    }



    return {
        createProject,
        createDefaultProject,
    }

})();