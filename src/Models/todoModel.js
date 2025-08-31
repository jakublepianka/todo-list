import { eventBus } from "../eventBus.js";

export const todoModel = (function(){

    const createTodo = function({
        givenTitle, 
        givenDescription = 'Task description', 
        id = crypto.randomUUID(),
        projectId = '',
        givenDate = new Date().toLocaleDateString("pl-PL"),
        givenPriority = 'Low',
        givenNotes = 'This is a place for your notes',
        givenCompletion = false,
        givenChecklist = [],
        defaultPriorityLevels = {
            0: 'Low',
            1: 'Medium',
            2: 'High',
            3: 'Very high',
        }
    }){
        
        const priorityLevels = defaultPriorityLevels; 
        
        const todoId = id;
        const parentId = projectId;
        let title = givenTitle;
        let description = givenDescription;
        let dueDate = givenDate;
        let priority = givenPriority;
        let notes = givenNotes;
        let isCompleted = givenCompletion;
        const checklist = givenChecklist;

        const editTitle = (newTitle) => { 
            title = newTitle; 
            publishUpdate();
        };
        const editDescription = (newDescription) => { 
            description = newDescription;
            publishUpdate();
        };
        const editDueDate = (newDate) => { 
            dueDate = new Date(newDate).toLocaleDateString("pl-PL");
            publishUpdate();

        };
        const editPriority = (priorityLevel) => {
            if(!(/(^[0-3])$/.test(priorityLevel))){
                return console.log("error wrong priority level (MAKE SEPERATE LOGGER OR MESSAGE MODULE (?))");
            } 
            priority = priorityLevels[priorityLevel];
            publishUpdate();

        }
        const editNotes = (newText) => { 
            notes = newText;
            publishUpdate();
        };
        const toggleTodoCompletion = () => { 
            isCompleted = !isCompleted;
            publishUpdate();
        };
        const createCheckbox = (text) => {
            addCheckbox({
                checkboxDescription: text,
                isTrue: false,
            });
            publishUpdate();

        };
        const addCheckbox = (checkboxObj) => { 
            checklist.push(checkboxObj);
            publishUpdate();
        };
        const toggleCheckboxCompletion = (checkboxObj) => { 
            checklist[checklist.indexOf(checkboxObj)].isTrue = !checklist[checklist.indexOf(checkboxObj)].isTrue;
            publishUpdate();
        }; 
        const deleteCheckbox = (checkboxObj) => { 
            checklist.splice(checklist.indexOf(checkboxObj), 1);
            publishUpdate();        
        };

        function publishUpdate(){
            const todoObject = {
                get todoId() { return todoId; },
                get parentId() { return parentId; },
                get title() { return title; },
                get description() { return description; },
                get dueDate() { return dueDate; },
                get priority() { return priority; },
                get notes() { return notes; },
                get checklist() { return checklist; },
                get isCompleted() { return isCompleted; },
                get priorityLevels() { return priorityLevels; },
                editTitle,
                editDescription,
                editDueDate,
                editNotes,
                editPriority,
                toggleTodoCompletion,
                createCheckbox,
                addCheckbox,
                toggleCheckboxCompletion,
                deleteCheckbox
            };

            console.log(todoObject);
            eventBus.publish('todoModified', {
                todoObj: todoObject,
                projectId: parentId
            });
        }

        return {
            get todoId() { return todoId; },
            get parentId() { return parentId; },
            get title() { return title; },
            get description() { return description; },
            get dueDate() { return dueDate; },
            get priority() { return priority; },
            get notes() { return notes; },
            get checklist() { return checklist; },
            get isCompleted() { return isCompleted; },
            get priorityLevels() { return priorityLevels; },
            editTitle,
            editDescription,
            editDueDate,
            editNotes,
            editPriority,
            toggleTodoCompletion,
            createCheckbox,
            addCheckbox,
            toggleCheckboxCompletion,
            deleteCheckbox
        }
    };


    return {
        createTodo
    }

})();

