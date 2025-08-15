// todos factory
// has title, description, dueDate, priority, notes, checklist
// is stored within a project

export const todoModel = (function(){

    const createTodo = function(title, description = ''){
        
        const todoId = crypto.randomUUID();
        let todoTitle = title;
        let todoDescription = description;
        let todoDueDate;
        let todoPriority;
        let todoNotes;
        let isCompleted = false;
        const todoChecklist = [];

        const priorityLevels = {
            0: 'low',
            1: 'medium',
            2: 'high',
            3: 'very high',
        };

        const editTitle = (newTitle) => { todoTitle = newTitle; };
        const editDescription = (newDescription) => { todoDescription = newDescription; };
        const editDueDate = (newDate) => { todoDueDate = newDate.toLocaleDateString("pl-PL"); };
        const editPriority = (priorityLevel) => {
            if(!(/(^[0-3])$/.test(priorityLevel))){
                return console.log("error wrong priority level (MAKE SEPERATE LOGGER OR MESSAGE MODULE (?))");
            } 
            todoPriority = priorityLevels[priorityLevel];
        }
        const editNotes = (newText) => { todoNotes = newText; };
        const toggleTodoCompletion = () => { isCompleted = !isCompleted; };
        
        const createCheckbox = (text) => {
            return {
                // id: crypto.randomUUID(),
                description: text,
                isTrue: false,
            }
        };
        const addCheckbox = (checkboxObj) => { todoChecklist.push(checkboxObj); };
        const toggleCheckboxCompletion = (checkboxObj) => { todoChecklist[todoChecklist.indexOf(checkboxObj)].isTrue = !todoChecklist[todoChecklist.indexOf(checkboxObj)].isTrue; }; 
        const deleteCheckbox = (checkboxObj) => { todoChecklist.splice(todoChecklist.indexOf(checkboxObj), 1); };

        return {
            // get todoId() { return todoId; },
            get todoTitle() { return todoTitle; },
            get todoDescription() { return todoDescription; },
            get todoDueDate() { return todoDueDate; },
            get todoPriority() { return todoPriority; },
            get todoNotes() { return todoNotes; },
            get todoChecklist() { return todoChecklist; },
            get isCompleted() { return isCompleted; },
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

