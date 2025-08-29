// todos factory
// has title, description, dueDate, priority, notes, checklist
// is stored within a project

export const todoModel = (function(){

    const createTodo = function(givenTitle, givenDescription = 'Task description'){
        
        const priorityLevels = {
            0: 'Low',
            1: 'Medium',
            2: 'High',
            3: 'Very high',
        };

        const todoId = crypto.randomUUID();
        let title = givenTitle;
        let description = givenDescription;
        let dueDate = new Date().toLocaleDateString("pl-PL");
        let priority = priorityLevels[0];
        let notes = 'This is a place for your notes';
        let isCompleted = false;
        const checklist = [];

        const editTitle = (newTitle) => { title = newTitle; };
        const editDescription = (newDescription) => { description = newDescription; };
        const editDueDate = (newDate) => { dueDate = new Date(newDate).toLocaleDateString("pl-PL"); };
        const editPriority = (priorityLevel) => {
            if(!(/(^[0-3])$/.test(priorityLevel))){
                return console.log("error wrong priority level (MAKE SEPERATE LOGGER OR MESSAGE MODULE (?))");
            } 
            priority = priorityLevels[priorityLevel];
        }
        const editNotes = (newText) => { notes = newText; };
        const toggleTodoCompletion = () => { isCompleted = !isCompleted; };
        const createCheckbox = (text) => {
            addCheckbox({
                checkboxDescription: text,
                isTrue: false,
            });
        };
        const addCheckbox = (checkboxObj) => { checklist.push(checkboxObj); };
        const toggleCheckboxCompletion = (checkboxObj) => { checklist[checklist.indexOf(checkboxObj)].isTrue = !checklist[checklist.indexOf(checkboxObj)].isTrue; }; 
        const deleteCheckbox = (checkboxObj) => { checklist.splice(checklist.indexOf(checkboxObj), 1); };

        return {
            get todoId() { return todoId; },
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

