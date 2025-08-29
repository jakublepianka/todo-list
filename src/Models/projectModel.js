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
        
        const defaultProject = createProject('Your project', 'This is a place for a description of this project');
        const defaultTodo = defaultProject.createNewTodo('To buy milk', 'This is a place for a description of this TODO');

        defaultTodo.editDueDate(new Date(2026, 11, 31));
        defaultTodo.editPriority(3);
        defaultTodo.editNotes('A place for your notes. You can write a lot of letters in here');
        defaultTodo.createCheckbox('I am a subtask 1');
        defaultTodo.createCheckbox('I am a subtask 2');
        
        defaultProject.addTodo(defaultTodo);
        addProjectToProjectsList(defaultProject);
        return defaultProject;
    }

    function addProjectToProjectsList(project){
        projectsList.push(project);
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