// project class
// has name and description
// stores todo objects
// can add new todo objects into already created project objects?
import { todoModel } from "./todoModel.js"

export const projectModel = (function(){

    const projectsList = [];

    const createProject = function(name, description = '') {
    
        const projectId = crypto.randomUUID();
        let projectName = name;
        let projectDescription = description;
        const projectTodos = [];
     
        const editName = (newName) => { projectName = newName; };
        const editDescription = (newDescription) => { projectDescription = newDescription; };
        const addTodo = (newTodo) => { projectTodos.push(newTodo); };
        const createNewTodo = (title, description) => { return todoModel.createTodo(title, description); };
        const deleteTodo = (todoId) => { projectTodos.splice(projectTodos.indexOf(todoId), 1); };

        return {
            get projectId() { return projectId; },
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
        
        const defaultProject = createProject('Your Project, but the this time the title is long', 'Your first project');
        const defaultTodo = defaultProject.createNewTodo('To do a habibi', 'Here i would like to place a somewhat detailed description of a task');

        defaultTodo.editDueDate(new Date(2026, 11, 31));
        defaultTodo.editPriority(3);
        defaultTodo.editNotes('To do a habibi and remberaaaaaaaaaaaaaaaaaaa uuuuuuu it\'s a very long note');
        defaultTodo.createCheckbox('before habibi to do origami');
        defaultTodo.createCheckbox('After origami do a girobi');
        
        addTodoToProjectsTodos(defaultProject.projectTodos, defaultTodo);
        addProjectToProjectsList(defaultProject);
        return defaultProject;
    }

    function addProjectToProjectsList(project){
        projectsList.push(project);
    }

    function addTodoToProjectsTodos(projectsTodos, todo){
        projectsTodos.push(todo);
    }

    function deleteProjectFromProjectsList(project){
        projectsList.splice(projectsList.indexOf(project), 1);
    }

    function deleteAllProjects(){
        projectsList.splice(0, projectsList.length);
    }

    return {
        get projectsList() { return projectsList },
        createProject,
        createDefaultProject,
        deleteProjectFromProjectsList,
        deleteAllProjects,
        addProjectToProjectsList,
    }

})();