import { projectModel } from "../Models/projectModel";
import { todoDOM } from "./todoDOM";
import viewImage from "../assets/icons/book.png"
import arrowImage from "../assets/icons/up-arrow.png"
import plusImage from "../assets/icons/plus.png"
import editImage from "../assets/icons/edit.png"

export const projectDOM = (function(){

    const content = document.querySelector('#content');
    const contentHeader = document.createElement('div');
    const contentTitle = document.createElement('h2');
    const contentBody = document.createElement('div');

    contentHeader.classList.add('content-header');
    contentTitle.classList.add('content-title');
    contentBody.classList.add('content-body');

    function loadBaseProjectElements(){

        contentTitle.textContent = 'Your Projects';


        content.appendChild(contentHeader);
        contentHeader.appendChild(contentTitle);
        content.appendChild(contentBody);
        if(contentHeader.getElementsByClassName('clear-button').length !== 0) return;
        createAddProjectButton()
        addClearButton();
    } 

    function addClearButton(){

        const clearButton = document.createElement('button');
        
        clearButton.classList.add('clear-button');

        clearButton.textContent = 'Delete all projects';

        clearButton.addEventListener("click", () => {
            
            projectModel.deleteAllProjects();
            contentBody.replaceChildren();
            createAddProjectButton();
            clearButton.remove();

        });

        contentHeader.appendChild(clearButton);

    }

    function loadProjectCard(newProject){

        const projectCard = document.createElement('div');
        const projectHeader = document.createElement('div');
        const projectTitle = document.createElement('h3');

        const projectBody = document.createElement('div');

        const projectDescriptionContainer = document.createElement('div');
        const projectTodolistContainer = document.createElement('div');

        projectCard.classList.add('project-card');
        projectHeader.classList.add('project-header');
        projectTitle.classList.add('project-title');
        projectBody.classList.add('project-body');

        projectDescriptionContainer.classList.add('project-description-container');
        projectTodolistContainer.classList.add('project-todolist-container');

        projectTitle.textContent = newProject.projectName;

        function loadDescriptionForm() {

            const descriptionForm = document.createElement('div');
            const textArea = document.createElement('textarea');
    
            descriptionForm.classList.add('description-form');
            textArea.classList.add('description-textarea');
            
            textArea.style.width = '100%';
            
    
            if (newProject.description === '') { 
                textArea.placeholder = 'Project\'s Description here!';
            } else {
                textArea.textContent = newProject.projectDescription;
            }
    
            textArea.addEventListener("input", () => {
                    textArea.style.height = "auto";
                    textArea.style.height = textArea.scrollHeight + 16 + "px";
            });
    
            const createSubmitButton = () => {
    
                const submitBtn = document.createElement('button');
                submitBtn.classList.add('description-submit-button');
                submitBtn.textContent = 'Confirm';
    
                submitBtn.addEventListener("click", (event) => {
    
                    event.target.parentNode.remove();                            
                    newProject.editDescription(textArea.value);
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
                
            projectDescriptionContainer.appendChild(descriptionForm);
            descriptionForm.appendChild(textArea);
            descriptionForm.appendChild(createSubmitButton());
            descriptionForm.appendChild(createCancelButton());
    
            textArea.style.height = "auto";
            textArea.style.height = textArea.scrollHeight + 16 + "px";

        }

        const createDescriptionEditButton = () => {

            const editBtn = document.createElement('button');
            const editIcon = document.createElement('img');

            editBtn.classList.add('description-edit-button');
            editIcon.classList.add('description-edit-icon');                    

            editBtn.type = 'submit';
            editIcon.src = editImage;

            editBtn.addEventListener("click", (event) => {

                const parentElement = event.currentTarget.parentNode;

                parentElement.remove();
                loadDescriptionForm();
                return;

            });

            editBtn.appendChild(editIcon);
            
            return editBtn;

        };

        function loadDescription(){

            if (projectDescriptionContainer.getElementsByClassName('project-description-wrapper').length > 0) return;
            const projectDescriptionWrapper = document.createElement('div');
            const projectDescriptionText = document.createElement('h4');

            projectDescriptionText.classList.add('project-description-text');
            projectDescriptionWrapper.classList.add('project-description-wrapper');

            projectDescriptionText.textContent = newProject.projectDescription;

            projectBody.appendChild(projectDescriptionContainer);
            projectDescriptionContainer.appendChild(projectDescriptionWrapper);
            projectDescriptionWrapper.appendChild(projectDescriptionText);
            projectDescriptionWrapper.appendChild(createDescriptionEditButton());


            return projectDescriptionContainer;
        }

        function loadTodolist(project) {

            const todoList = document.createElement('ul');
    
            todoList.classList.add('project-todolist');
    
            if(projectTodolistContainer.getElementsByClassName('project-todolist').length > 0) return;
            projectTodolistContainer.appendChild(todoList);
    
            project.projectTodos.forEach(todo => {
                const item = document.createElement('li');
                const titleSpan = document.createElement('span');
                const dueDateSpan = document.createElement('span');
                const prioritySpan = document.createElement('span');
    
                item.classList.add('project-todo-item');
                titleSpan.classList.add('project-todo-title');
                dueDateSpan.classList.add('project-todo-date');
                prioritySpan.classList.add('project-todo-priority');
                
                titleSpan.textContent = todo.title;
                dueDateSpan.textContent = todo.dueDate;
                prioritySpan.textContent = todo.priority
    
                todoList.appendChild(item);
                item.appendChild(titleSpan);
                item.appendChild(dueDateSpan);
                item.appendChild(prioritySpan);
    
            });
        }

        const createExpandBtn = () => {

            const expandBtn = document.createElement('button');
            const expandIcon = document.createElement('img');

            expandBtn.classList.add('project-expand-button');
            expandIcon.classList.add('project-expand-icon')

            expandIcon.src = arrowImage;
            expandIcon.style.transform = "rotate(-180deg) translateY(-4px)";

            let isClicked = false;
    
            expandBtn.addEventListener("click", () => {
                isClicked = !isClicked;
                if (isClicked) {
                    
                    expandIcon.style.transform = '';

                    loadDescription();
                    projectBody.appendChild(projectTodolistContainer);
                    loadTodolist(newProject);
                    
                } else {

                    expandIcon.style.transform = "rotate(-180deg) translateY(-4px)";

                    projectDescriptionContainer.replaceChildren();
                    projectTodolistContainer.replaceChildren();
                }
            });
        
            expandBtn.appendChild(expandIcon);

            return expandBtn;
        };

        const createOpenBtn = () => {
            const projectOpen = document.createElement('button');
            const projectOpenIcon = document.createElement('img');

            projectOpen.classList.add('project-open-button');
            projectOpenIcon.classList.add('project-open-icon');

            projectOpenIcon.src = viewImage;
            projectOpenIcon.style.transform = "translateY(4px)";

            projectOpen.addEventListener("click", () => {
                content.replaceChildren();
                todoDOM.loadProjectsTodoCards(newProject);
            });

            projectOpen.appendChild(projectOpenIcon);
            return projectOpen;
        };

        contentBody.appendChild(projectCard);
        
        projectCard.appendChild(projectHeader);
        projectCard.appendChild(projectBody);
        
        projectHeader.appendChild(projectTitle);
        projectHeader.appendChild(createExpandBtn());
        projectHeader.appendChild(createOpenBtn());        
    
    }

    function addDefaultProjectCard(){
        loadProjectCard(projectModel.createDefaultProject());
    }



    function loadAllExistingProjects(projectsList){
        if (contentBody.getElementsByClassName('project-card').length !== 0) return;
        projectsList.forEach(project => {
            loadProjectCard(project);
        });
    }

    function loadEverything(){
        loadBaseProjectElements();
        loadAllExistingProjects(projectModel.projectsList);
    }

    const createAddProjectButton = () => {
        
        const addProjectBtn = document.createElement('button');
        const addIcon = document.createElement('img');
        const btnText = document.createElement('p');
        
        addProjectBtn.classList.add('project-add');
        addIcon.classList.add('project-add-icon');
        btnText.classList.add('project-add-text');

        addIcon.src = plusImage;

        contentBody.appendChild(addProjectBtn);
        addProjectBtn.appendChild(addIcon);
        addProjectBtn.appendChild(btnText);

        addProjectBtn.addEventListener("click", () => {
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

            if(contentHeader.getElementsByClassName('clear-button').length === 0) addClearButton();
            addNewProjectForm();
        });

        return addProjectBtn;
    };

    const addNewProjectForm = () => {
        
        const formCard = document.createElement('div');
        const formContainer = document.createElement('div');

        const formHeader = document.createElement('div');
        const formTitle = document.createElement('h3');

        const form = document.createElement('form');

        const formList = document.createElement('ul');

        const formNameItem = document.createElement('li');
        const formDescriptionItem = document.createElement('li');

        const nameLabel = document.createElement('label');
        const nameInput = document.createElement('input');
        const nameError = document.createElement('span');

        const descriptionLabel = document.createElement('label');
        const descriptionInput = document.createElement('textarea');

        const formSubmitContainer = document.createElement('div');

        formCard.classList.add('form-card');
        formContainer.classList.add('form-container');
        formHeader.classList.add('form-header');
        formTitle.classList.add('form-title');
        formList.classList.add('form-list');
        formNameItem.classList.add('form-item');
        formDescriptionItem.classList.add('form-item');
        formSubmitContainer.classList.add('form-submit-container');

        nameLabel.setAttribute("for", "project_name");
        nameInput.setAttribute("id", "project_name");
        nameInput.type = 'text';

        descriptionLabel.setAttribute("for", "project_description");
        descriptionInput.setAttribute("id", "project_description");

        formTitle.textContent = 'Add a new project!';

        nameLabel.textContent = 'Project Name';
        descriptionLabel.textContent = 'Project Description'; 

        const addSubmitFormButton = () => {
            const formSubmitBtn = document.createElement('button');
            formSubmitBtn.classList.add('form-submit');
            formSubmitBtn.type = 'submit';
            formSubmitBtn.textContent = 'Create Project';

            formSubmitBtn.addEventListener("click", () => {
                if(!(/(^[a-zA-Z\^s]\w+)/.test(nameInput.value))) {
                    nameError.textContent = 'can\'t be empty, must be letters!'
                    return;
                }

                nameError.textContent = '';
                const submittedProject = projectModel.createProject(nameInput.value, descriptionInput.value);
                projectModel.addProjectToProjectsList(submittedProject);
                formCard.remove();                
                loadProjectCard(submittedProject);
                console.log(projectModel.projectsList);
            
            });
        
            return formSubmitBtn;
        };

        const addCancelFormButton = () => {
            const formCancelBtn = document.createElement('button');
            formCancelBtn.classList.add('form-cancel');
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
        
        formList.appendChild(formNameItem);
        formList.appendChild(formDescriptionItem);

        formNameItem.appendChild(nameLabel);
        formNameItem.appendChild(nameInput);
        formNameItem.appendChild(nameError);

        formDescriptionItem.appendChild(descriptionLabel);
        formDescriptionItem.appendChild(descriptionInput);

        formContainer.appendChild(formSubmitContainer);
        formSubmitContainer.appendChild(addSubmitFormButton());
        formSubmitContainer.appendChild(addCancelFormButton());
    
    };

    return {
        loadBaseProjectElements,
        loadProjectCard,
        addDefaultProjectCard,
        addNewProjectForm,
        loadEverything
    }
})();