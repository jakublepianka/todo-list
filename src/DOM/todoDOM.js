import { eventBus } from "../eventBus";
import { projectDOM } from "./projectDOM";
import { todoModel } from "../Models/todoModel"
import { projectModel } from "../Models/projectModel"
import editImage from "../assets/icons/edit.png"
import leaveImage from "../assets/icons/logout.png"
import deleteImage from "../assets/icons/trash.png"
import arrowImage from "../assets/icons/up-arrow.png"
import plusImage from "../assets/icons/plus.png"
import minusImage from "../assets/icons/minus.png"
import submitImage from "../assets/icons/check.png"
import cancelImage from "../assets/icons/cross.png"

export const todoDOM = (function(){

    const content = document.querySelector('#content');
    const contentHeader = document.createElement('div');
    const contentTitle = document.createElement('h2');
    
    const contentBody = document.createElement('div');

    contentHeader.classList.add('content-header');
    contentTitle.classList.add('content-title');
    contentBody.classList.add('content-body');

    
    function loadBaseTodoElements(project){

        contentTitle.textContent = project.projectName;

        content.appendChild(contentHeader);
        contentHeader.appendChild(contentTitle);

        content.appendChild(contentBody);

        contentBody.appendChild(createAddTodoButton(project));

        if(contentHeader.getElementsByClassName('leave-button').length !== 0) return;
        createLeaveButton();

    } 

    function loadProjectsTodoCards(project){    

        loadBaseTodoElements(project);
        
        if(contentBody.getElementsByClassName('todo-card').length !== 0) return;
        project.projectTodos.forEach(todo => {

            loadTodoCard(todo, project);
        });
    }

    function loadTodoCard(todo, project){

        const todoCard = document.createElement('div');
        const todoHeader = document.createElement('div');
        const todoTitle = document.createElement('h3');

        const todoBody = document.createElement('div');
    
        const todoFooter = document.createElement('div');

        todoCard.classList.add('todo-card');
        todoHeader.classList.add('todo-header');
        todoTitle.classList.add('todo-title');
        todoBody.classList.add('todo-body');

        todoFooter.classList.add('todo-footer');

        todoTitle.textContent = todo.title;

        const createDeleteBtn = () => {

            const deleteBtn = document.createElement('button');
            const deleteIcon = document.createElement('img');
    
            deleteBtn.classList.add('todo-delete-button');
            deleteIcon.classList.add('todo-delete-icon');
    
            deleteIcon.src = deleteImage;
            
            deleteBtn.addEventListener("click", () => {
    
                eventBus.publish('todoDeleted', {
                    todoId: todo.todoId,
                    projectId: project.projectId,
                });
                todoCard.remove();
    
            });
    
            deleteBtn.appendChild(deleteIcon);
    
            return deleteBtn;

        };


        function expandCard(){

            const todoPropertiesContainer = document.createElement('div');
            const propertiesList = document.createElement('ul');

            todoPropertiesContainer.classList.add('todo-properties-container');
            propertiesList.classList.add('properties-list');
            
            todoBody.className = '';
            todoBody.classList.add('todo-body-show');

            function loadProperties() {
                
                const dateAndPriorityItem = document.createElement('li');

                dateAndPriorityItem.classList.add('todo-date-priority-item');


                const createPropertiesEditButton = () => {

                    const editBtn = document.createElement('button');
                    const editIcon = document.createElement('img');

                    editBtn.classList.add('property-edit-button');
                    editIcon.classList.add('property-edit-icon');                    

                    editBtn.type = 'submit';
                    editIcon.src = editImage;

                    editBtn.addEventListener("click", (event) => {

                        const parentElement = event.currentTarget.parentNode;

                        if(parentElement.className == 'description-item'){

                            loadDescriptionForm();
                            parentElement.remove();
                            return;
                        }
                        if(parentElement.className == 'notes-item'){
                            
                            loadNotesForm();
                            parentElement.remove();
                            return;
                        } 
                        if(parentElement.className == 'date-box'){
                            
                            loadDateForm();
                            parentElement.remove();
                            return;
                        }
                        if(parentElement.className == 'priority-box'){
                            
                            loadPriorityForm();
                            parentElement.remove();
                            return;
                        }
                        return;

                    });

                    editBtn.appendChild(editIcon);
                    
                    return editBtn;
                    
                };

                function loadDescriptionForm() {

                    const descriptionFormItem = document.createElement('li');
                    const textArea = document.createElement('textarea');
            
                    descriptionFormItem.classList.add('description-form-item');
                    textArea.classList.add('description-textarea');
                    
                    textArea.style.width = '100%';
                    

                    if (todo.description === '') { 
                        textArea.placeholder = 'Todo\'s Description here!';
                    } else {
                        textArea.textContent = todo.description;
                    }

                    textArea.addEventListener("input", () => {
                            textArea.style.height = "auto";
                            textArea.style.height = textArea.scrollHeight + 16 + "px";
                            // textArea.style.width = "100%"; 
                    });

                    const createSubmitButton = () => {

                        const submitBtn = document.createElement('button');
                        submitBtn.classList.add('description-submit-button');
                        submitBtn.textContent = 'Confirm';

                        submitBtn.addEventListener("click", (event) => {

                            event.target.parentNode.remove();                            
                            todo.editDescription(textArea.value);
                            loadDescription();

                        });
                        return submitBtn;
                    }
                        
                    const createCancelButton = () => {
                        
                        const cancelBtn = document.createElement('button');
                        cancelBtn.classList.add('description-cancel-button');
                        cancelBtn.textContent = 'Cancel';

                        cancelBtn.addEventListener("click", (event) => {

                            event.target.parentNode.remove();
                            loadDescription();

                        });

                        return cancelBtn;
                    }
                        
                    propertiesList.appendChild(descriptionFormItem);
                    descriptionFormItem.appendChild(textArea);
                    descriptionFormItem.appendChild(createSubmitButton());
                    descriptionFormItem.appendChild(createCancelButton());

                    textArea.style.height = "auto";
                    textArea.style.height = textArea.scrollHeight + 16 + "px";

                }

                function loadDescription() {

                    const todoDescriptionItem = document.createElement('li');
                    const todoDescriptionText = document.createElement('h4');

                    todoDescriptionItem.classList.add('description-item');
                    todoDescriptionText.classList.add('description-text');

                    todoDescriptionText.textContent = `${todo.description}`;
                    
                    todoDescriptionItem.appendChild(todoDescriptionText);
                    todoDescriptionItem.appendChild(createPropertiesEditButton());

                    propertiesList.appendChild(todoDescriptionItem);
                    
                }

                function loadNotesForm() {

                    const notesFormItem = document.createElement('li');
                    const textArea = document.createElement('textarea');
            
                    notesFormItem.classList.add('notes-form-item');
                    textArea.classList.add('notes-textarea');
                    
                    if (todo.notes === '' || todo.notes === undefined) { 
                        textArea.placeholder = 'Here shall be notes for your todo!';
                    } else {
                        textArea.textContent = todo.notes;
                    }

                    textArea.addEventListener("input", () => {
                        textArea.style.height = "auto";
                        textArea.style.height = textArea.scrollHeight + 16 + "px"; 
                    });
                    
                    const createSubmitButton = () => {

                        const submitBtn = document.createElement('button');
                        submitBtn.classList.add('notes-submit-button');
                        submitBtn.textContent = 'Confirm';

                        submitBtn.addEventListener("click", (event) => {

                            event.target.parentNode.remove();                            
                            todo.editNotes(textArea.value);
                            loadNotes();

                        });
                        return submitBtn;
                    }
                    
                    const createCancelButton = () => {
                        
                        const cancelBtn = document.createElement('button');
                        cancelBtn.classList.add('notes-cancel-button');
                        cancelBtn.textContent = 'Cancel';

                        cancelBtn.addEventListener("click", (event) => {

                            event.target.parentNode.remove();
                            loadNotes();

                        });

                        return cancelBtn;
                    }

                    propertiesList.appendChild(notesFormItem);
                    notesFormItem.appendChild(textArea);
                    notesFormItem.appendChild(createSubmitButton());
                    notesFormItem.appendChild(createCancelButton());

                    textArea.style.height = "auto";
                    textArea.style.height = textArea.scrollHeight + 16 + "px";


                }

                function loadNotes(){

                    const notesItem = document.createElement('li');
                    notesItem.classList.add('notes-item');
                    notesItem.textContent = `${todo.notes}`;
                    notesItem.appendChild(createPropertiesEditButton());

                    propertiesList.appendChild(notesItem);

                }
                
                function loadDateForm(){

                    const dateFormBox = document.createElement('div');
                    const dateInput = document.createElement('input');

                    dateFormBox.classList.add('date-form-box');
                    dateInput.classList.add('date-input');
                    
                    dateInput.type = 'date';

                    const createSubmitButton = () => {

                        const submitBtn = document.createElement('button');
                        const submitIcon = document.createElement('img');

                        submitBtn.classList.add('date-submit-button');
                        submitIcon.classList.add('date-submit-button-icon');
                        submitIcon.src = submitImage;

                        submitBtn.addEventListener("click", (event) => {

                            const parentElement = event.currentTarget.parentNode;

                            if (dateInput.value === "") {
                                parentElement.remove();                            
                                loadDate();
                                return;
                            }
                            // if (dateAndPriorityItem.getElementsByClassName('date-form-box').length > 0
                            // || dateAndPriorityItem.getElementsByClassName('date-box').length > 0) return;

                            parentElement.remove();                            
                            todo.editDueDate(dateInput.value);
                            loadDate();

                        });

                        submitBtn.appendChild(submitIcon);

                        return submitBtn;
                    }
                    
                    const createCancelButton = () => {
                        
                        const cancelBtn = document.createElement('button');
                        const cancelIcon = document.createElement('img');

                        cancelBtn.classList.add('date-cancel-button');
                        cancelIcon.classList.add('date-cancel-button-icon');
                        cancelIcon.src = cancelImage;

                        cancelBtn.addEventListener("click", (event) => {

                            const parentElement = event.currentTarget.parentNode;

                            // if (dateAndPriorityItem.getElementsByClassName('date-form-box').length > 0
                            // || dateAndPriorityItem.getElementsByClassName('date-box').length > 0) return;

                            parentElement.remove();
                            loadDate();

                        });

                        cancelBtn.appendChild(cancelIcon);

                        return cancelBtn;
                    }

                    dateAndPriorityItem.appendChild(dateFormBox);
                    dateFormBox.appendChild(dateInput);
                    dateFormBox.appendChild(createSubmitButton());
                    dateFormBox.appendChild(createCancelButton());

                }

                function loadDate(){

                    const dateBox = document.createElement('div');
                    const dateText = document.createElement('p');

                    dateBox.classList.add('date-box');
                    dateText.classList.add('date-text');
                    dateText.textContent = `${todo.dueDate}`;

                    dateAndPriorityItem.appendChild(dateBox);
                    dateBox.appendChild(dateText);
                    dateBox.appendChild(createPropertiesEditButton());

                }

                function loadPriorityForm() {

                    const priorityFormBox = document.createElement('div');
                    const prioritySelect = document.createElement('select');

                    priorityFormBox.classList.add('priority-form-box');
                    prioritySelect.classList.add('priority-select');

                    const defaultOption = document.createElement('option');
                    defaultOption.name = 'choose_priority';
                    defaultOption.textContent = 'Choose priority';

                    prioritySelect.appendChild(defaultOption);

                    for (const priorityLevel in todo.priorityLevels ){
                        
                        let priorityWord = todo.priorityLevels[priorityLevel];

                        const option = document.createElement('option');
                        option.name = priorityLevel;
                        option.id = priorityWord.split(' ').join("").toLowerCase();
                        option.textContent = todo.priorityLevels[priorityLevel];
                        
                        prioritySelect.appendChild(option);

                    }

                    prioritySelect.addEventListener("change", (event) => {

                        const options = prioritySelect.querySelectorAll('option');

                        options.forEach(option => {

                            if (event.target.value == option.textContent ) {
                               todo.editPriority(option.name);
                               loadPriority();
                               event.target.parentNode.remove();
                            }

                        });


                    });

                    dateAndPriorityItem.appendChild(priorityFormBox);
                    priorityFormBox.appendChild(prioritySelect);

                }

                function loadPriority(){

                    const priorityBox = document.createElement('div');
                    const priorityText = document.createElement('p');

                    priorityBox.classList.add('priority-box')
                    priorityText.classList.add('priority-text')

                    priorityText.textContent = `${todo.priority}`;

                    dateAndPriorityItem.setAttribute("id", `${todo.priority.split(' ').join("").toLowerCase()}`);            
                    
                    dateAndPriorityItem.appendChild(priorityBox);
                    priorityBox.appendChild(priorityText);
                    priorityBox.appendChild(createPropertiesEditButton());

                }

                
                todoBody.appendChild(todoPropertiesContainer);
                todoPropertiesContainer.appendChild(propertiesList);
                loadDescription();
                propertiesList.appendChild(dateAndPriorityItem);
                loadDate();
                loadPriority();
                loadNotes();

            }

            function loadChecklist() {
                
                const checklistContainer = document.createElement('div');
                const checklistList = document.createElement('ul');
                const checklistListInfo = document.createElement('li');


                checklistContainer.classList.add('checklist-container');
                checklistList.classList.add('checklist-list');
                checklistListInfo.classList.add('checklist-list-info');
                checklistListInfo.textContent = 'Subtasks';


                const createAddCheckboxButton = () => {

                    const addCheckBoxBtn = document.createElement('button');
                    addCheckBoxBtn.classList.add('add-checkbox-button');
                    addCheckBoxBtn.textContent = '+';

                    addCheckBoxBtn.addEventListener("click", () => {

                        if(checklistContainer.getElementsByClassName('checkbox-form-container').length !== 0) {
                            return;
                        }
                        checklistContainer.appendChild(createCheckboxForm());
                    });

                    return addCheckBoxBtn;
                };

                todoBody.appendChild(checklistContainer);
                checklistContainer.appendChild(checklistList);
                checklistList.appendChild(checklistListInfo);
                checklistContainer.appendChild(createAddCheckboxButton());
            
                todo.checklist.forEach(checkbox => {
                    loadCheckboxToChecklist(checkbox);
                    checklistListInfo.textContent = '';

                });

                function loadCheckboxToChecklist(checkbox){

                    const checkboxItem = document.createElement('li');
                    const checkboxInput = document.createElement('input');
                    const checkboxLabel = document.createElement('label');

                    checkboxItem.classList.add('checkbox-item');

                    checkboxInput.type = 'checkbox';
                    checkboxLabel.textContent = `${checkbox.checkboxDescription}`;
                    
                    checkboxLabel.setAttribute("for", `${checkbox.checkboxDescription}`);
                    checkboxInput.setAttribute("id", `${checkbox.checkboxDescription}`);

                    const createDeleteCheckboxButton = () => {

                        const deleteBtn = document.createElement('button');
                        const deleteIcon = document.createElement('img');

                        deleteBtn.classList.add('checkbox-delete-button');
                        deleteIcon.classList.add('checkbox-delete-icon');

                        deleteIcon.src = minusImage;

                        deleteBtn.addEventListener("click", (event) => {

                            const parentElement = event.currentTarget.parentNode;
                            todo.deleteCheckbox(checkbox);
                            parentElement.remove();

                            if (checklistList.getElementsByClassName('checkbox-item').length === 0) {
                                
                                checklistListInfo.textContent = 'Subtasks';
                                checklistList.appendChild(checklistListInfo);
                            }

                        });

                        deleteBtn.appendChild(deleteIcon);
                        return deleteBtn;

                    };


                    checkboxInput.addEventListener("click", () => {
                        
                        checkbox.isTrue = !checkbox.isTrue;
                        checkboxLabel.className = '';
                        
                        if(checkbox.isTrue){
                            
                            checkboxLabel.classList.add('checked');
                            return;
                        }     
                        
                    });

                    checklistList.appendChild(checkboxItem);
                    checkboxItem.appendChild(checkboxInput);
                    checkboxItem.appendChild(checkboxLabel);
                    checkboxItem.appendChild(createDeleteCheckboxButton());

                }

                const createCheckboxForm = () => {

                    const checkboxFormContainerWrapper = document.createElement('div'); 
                    const checkboxFormContainer = document.createElement('div');
                    const formTextInput = document.createElement('input');

                    checkboxFormContainerWrapper.classList.add('checkbox-form-container-wrapper');
                    checkboxFormContainer.classList.add('checkbox-form-container');
                    formTextInput.setAttribute("for", "checkbox_name");
                    formTextInput.placeholder = "text";
                    
                    const createSubmitButton = () => {

                        const formSubmit = document.createElement('button');
                        const submitIcon = document.createElement('img');

                        formSubmit.setAttribute("id", "checkbox_name");
                        formSubmit.classList.add('submit-checkbox-button');
                        submitIcon.classList.add('submit-checkbox-button-icon');
                        formSubmit.type = 'submit';

                        submitIcon.src = submitImage;

                        formSubmit.addEventListener("click", () => {
                            
                            if (formTextInput.value == ''){
                                formTextInput.placeholder = "Can't be empty!!!";
                                return;
                            }                      
                            todo.createCheckbox(formTextInput.value);
                            loadCheckboxToChecklist(todo.checklist[todo.checklist.length - 1]);
                            checkboxFormContainerWrapper.remove();
                            checklistListInfo.remove();
                        });

                        formSubmit.appendChild(submitIcon);

                        return formSubmit;
                    }

                    const createCancelButton = () => {
                        
                        const cancelBtn = document.createElement('button');
                        const cancelIcon = document.createElement('img');

                        cancelBtn.classList.add('cancel-checkbox-button');
                        cancelIcon.classList.add('cancel-checkbox-button-icon');
                        cancelIcon.src = cancelImage;

                        cancelBtn.addEventListener("click", () => {

                            checkboxFormContainerWrapper.remove();


                        });

                        cancelBtn.appendChild(cancelIcon);

                        return cancelBtn;
                    }

                    checkboxFormContainerWrapper.appendChild(checkboxFormContainer);
                    checkboxFormContainer.appendChild(formTextInput);
                    checkboxFormContainer.appendChild(createSubmitButton());
                    checkboxFormContainer.appendChild(createCancelButton());
                    return checkboxFormContainerWrapper;

                };

                

                

            }

            loadProperties();
            loadChecklist();
            
            
        }

        const createExpandBtn = () => {

            const expandBtn = document.createElement('button');
            const expandIcon = document.createElement('img');

            expandBtn.classList.add('todo-expand-button');
            expandIcon.classList.add('todo-expand-icon');

            expandIcon.src = arrowImage;
            expandIcon.style.transform = "rotate(-180deg) translateY(-2px)";

            let isClicked = false;
    
            expandBtn.addEventListener("click", () => {
                isClicked = !isClicked;
                if (isClicked) {
                    
                    expandCard();
                    expandIcon.style.transform = 'translateY(1px)';

                } else {

                    todoBody.className = '';
                    todoBody.classList.add('todo-body');
                    todoBody.replaceChildren();
                    expandIcon.style.transform = "rotate(-180deg) translateY(-3px)";

                }
            });
        
            expandBtn.appendChild(expandIcon);

            return expandBtn;
        };

        const createCompletionBtn = () => {
            
            const completionStateBtn = document.createElement('button');

            completionStateBtn.classList.add('completion-button-incomplete');

            todo.isCompleted ? completionStateBtn.textContent = 'Completed!' 
            : completionStateBtn.textContent = 'Mark as completed';

            completionStateBtn.addEventListener("click", () => {

                if(todoBody.id === 'showing-again') return;

                todo.toggleTodoCompletion();
                
                if(todo.isCompleted) {
                    completionStateBtn.className = '';
                    completionStateBtn.classList.add('completion-button-complete');
                    completionStateBtn.textContent = 'Completed!'
                    todoBody.id = '';
                    todoBody.id = 'completed'
                    todoTitle.id = '';
                    todoTitle.id = 'completed'
                    return;
                }

                completionStateBtn.className = '';
                completionStateBtn.classList.add('completion-button-incomplete');    
                completionStateBtn.textContent = 'Mark as completed';
                todoBody.id = 'showing-again'
                todoTitle.id = 'showing-again'

                setTimeout(() => {
                    todoBody.id = '';
                    todoTitle.id = '';

                }, 300);

            });

            return completionStateBtn;

        };


        contentBody.appendChild(todoCard);
        
        todoCard.appendChild(todoHeader);
        todoCard.appendChild(todoBody);
        todoCard.appendChild(todoFooter);
        
        todoHeader.appendChild(todoTitle);
        todoHeader.appendChild(createCompletionBtn());
        todoHeader.appendChild(createDeleteBtn());

        todoFooter.appendChild(createExpandBtn());
    
    }

    
    const createAddTodoButton = (project) => {

        const addTodoBtn = document.createElement('button');
        const addIcon = document.createElement('img');
        const btnText = document.createElement('p');

        addTodoBtn.classList.add('todo-add-button');
        addIcon.classList.add('todo-add-icon');
        btnText.classList.add('todo-add-text');

        addIcon.src = plusImage;


        addTodoBtn.addEventListener("click", () => {
            if (contentBody.getElementsByClassName('form-card').length >= 1) {
                addIcon.src = '';
                
                if(btnText.textContent) return;
                btnText.textContent = 'Form is ready';

                setTimeout(() => {
                    btnText.textContent = ''
                    addIcon.src = plusImage;
                }, 1500);

                return;
            
            }

            addNewTodoForm(project);
        });

        addTodoBtn.appendChild(addIcon);
        addTodoBtn.appendChild(btnText);

        return addTodoBtn;
    };

    function addNewTodoForm(project) {
            
        const formCard = document.createElement('div');
        const formContainer = document.createElement('div');

        const formHeader = document.createElement('div');
        const formTitle = document.createElement('h3');

        const form = document.createElement('form');

        const formList = document.createElement('ul');

        const formTitleItem = document.createElement('li');
        const formDescriptionItem = document.createElement('li');

        const titleLabel = document.createElement('label');
        const titleInput = document.createElement('input');
        const titleError = document.createElement('span');

        const descriptionLabel = document.createElement('label');
        const descriptionInput = document.createElement('textarea');

        const formSubmitContainer = document.createElement('div');

        formCard.classList.add('form-card');
        formContainer.classList.add('form-container');
        formHeader.classList.add('form-header');
        formTitle.classList.add('form-title');
        formList.classList.add('form-list');
        formTitleItem.classList.add('form-item');
        formDescriptionItem.classList.add('form-item');
        formSubmitContainer.classList.add('form-submit-container');

        titleLabel.setAttribute("for", "todo_name");
        titleInput.setAttribute("id", "todo_name");
        titleInput.type = 'text';

        descriptionLabel.setAttribute("for", "todo_description");
        descriptionInput.setAttribute("id", "todo_description");

        formTitle.textContent = 'Add a new todo!';

        titleLabel.textContent = 'Todo title';
        descriptionLabel.textContent = 'Todo Description'; 

        const addSubmitFormButton = () => {
            const formSubmitBtn = document.createElement('button');
            formSubmitBtn.classList.add('form-submit');
            formSubmitBtn.type = 'submit';
            formSubmitBtn.textContent = 'Create Todo';

            formSubmitBtn.addEventListener("click", () => {
                if(!(/(^[a-zA-Z\^s]\w+)/.test(titleInput.value))) {
                    titleError.textContent = 'can\'t be empty, must be letters!'
                    return;
                }

                titleError.textContent = '';

                const submittedTodo = project.createNewTodo(titleInput.value, descriptionInput.value || undefined);

                eventBus.publish('todoAdded', {
                    todoObject: submittedTodo,
                    projectId: project.projectId,
                });

                formCard.remove();
                loadTodoCard(submittedTodo, project);
            
            });
        
            return formSubmitBtn;
        };

        const addCancelFormButton = () => {
            const formCancelBtn = document.createElement('button');
            formCancelBtn.classList.add('form-cancel-button');
            formCancelBtn.textContent = 'Cancel';

            formCancelBtn.addEventListener("click", () => {
                formCard.remove();
            });

            return formCancelBtn;
        };

        contentBody.appendChild(formCard);
        formCard.appendChild(formContainer);
        formContainer.appendChild(formHeader);
        formHeader.appendChild(formTitle);
        
        formContainer.appendChild(form);
        form.appendChild(formList);
        
        formList.appendChild(formTitleItem);
        formList.appendChild(formDescriptionItem);

        formTitleItem.appendChild(titleLabel);
        formTitleItem.appendChild(titleInput);
        formTitleItem.appendChild(titleError);

        formDescriptionItem.appendChild(descriptionLabel);
        formDescriptionItem.appendChild(descriptionInput);

        formContainer.appendChild(formSubmitContainer);
        formSubmitContainer.appendChild(addSubmitFormButton());
        formSubmitContainer.appendChild(addCancelFormButton());
    
    };    


    const createLeaveButton = () => {

        const leaveButton = document.createElement('button');
        const leaveIcon = document.createElement('img');

        leaveButton.classList.add('leave-button');
        leaveIcon.classList.add('leave-icon');

        leaveIcon.src = leaveImage;

        leaveButton.addEventListener("click", () => {
            content.replaceChildren();
            contentBody.replaceChildren();
            projectDOM.loadEverything();
        });

        contentHeader.appendChild(leaveButton);
        leaveButton.appendChild(leaveIcon);

    }



    return {
        loadProjectsTodoCards,
        createAddTodoButton
    }

})();