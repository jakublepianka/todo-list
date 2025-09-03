import { eventBus } from "../eventBus.js"
import { todoModel } from "./todoModel.js"

export const projectModel = (function(){

    const projectsList = [];

    const createProject = function({
        name, 
        description = '', 
        id = crypto.randomUUID(), 
        todos = []
    }){
    
        const projectId = id;
        let projectName = name;
        let projectDescription = description;
        const projectTodos = [...todos];
     
        const editDescription = (newDescription) => {
            projectDescription = newDescription; 
            publishUpdate();
        };
        const addTodo = (newTodo) => { projectTodos.push(newTodo); };
        const createNewTodo = ({title, todoDescription, parentId}) => { 
            return todoModel.createTodo({
                givenTitle: title,
                givenDescription: todoDescription, 
                projectId: parentId
            }); 
        };
        const deleteTodo = (todoId) => { projectTodos.splice(projectTodos.indexOf(todoId), 1); };

        function publishUpdate(){
            const projectObject = {
                get projectId() { return projectId; },
                get projectName() { return projectName; },
                get projectDescription() { return projectDescription; },
                get projectTodos() { return projectTodos; },
                editDescription,
                addTodo,
                createNewTodo,
                deleteTodo
            };

            eventBus.publish('projectModified', {
                projObj: projectObject,
                projectId: projectId
            });
        }

        return {
            get projectId() { return projectId; },
            get projectName() { return projectName; },
            get projectDescription() { return projectDescription; },
            get projectTodos() { return projectTodos; },
            editDescription,
            addTodo,
            createNewTodo,
            deleteTodo,
        }
    }

    function createDefaultProject(){
        
        const defaultProject = createProject({name: 'Your project', description: 'This is a place for a description of this project'});
        const defaultTodo = defaultProject.createNewTodo({
            title: 'To buy milk', 
            todoDescription: 'This is a place for a description of this TODO',
            parentId: defaultProject.projectId,
        });

        defaultTodo.editDueDate(new Date(2026, 11, 31));
        defaultTodo.editPriority(3);
        defaultTodo.editNotes('A place for your notes. You can write a lot of letters in here');
        defaultTodo.createCheckbox('I am a subtask 1');
        defaultTodo.createCheckbox('I am a subtask 2');

        defaultProject.addTodo(defaultTodo);
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