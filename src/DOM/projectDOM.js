import { projectModel } from "../Models/projectModel";

export const projectDOM = (function(){

    // const newProj = projectModel.createDefaultProject();
    // const newtodoer = newProj.createNewTodo('habibi', 'origami');
    // console.log(newtodoer);
    // newProj.addTodo(newtodoer);


    const content = document.querySelector('#content');
    const contentHeader = document.createElement('div');
    const contentTitle = document.createElement('h2');
    const contentBody = document.createElement('div');

    contentHeader.classList.add('content-header');
    contentTitle.classList.add('content-title');
    contentBody.classList.add('content-body');


    function addProjectsElements(){

        contentTitle.textContent = 'Your Projects';

        content.appendChild(contentHeader);
        contentHeader.appendChild(contentTitle);
        content.appendChild(contentBody);

    } 

    function addNewProjectCard(newProject){

        const projectCard = document.createElement('div');
        const projectHeader = document.createElement('div');
        const projectTitle = document.createElement('h3');
        

        const projectBody = document.createElement('div');
        const projectDescriptionContainer = document.createElement('div');
        const projectDescriptionText = document.createElement('h4');
        const projectTodolistContainer = document.createElement('div');

        projectCard.classList.add('project-card');
        projectHeader.classList.add('project-header');
        projectTitle.classList.add('project-title');
        projectBody.classList.add('project-body');


        projectDescriptionContainer.classList.add('project-description-container');
        projectDescriptionText.classList.add('project-description-text');
        projectTodolistContainer.classList.add('project-todolist-container');

        projectTitle.textContent = newProject.projectName;

        const createExpandBtn = () => {

            const expandBtn = document.createElement('button');
            expandBtn.classList.add('project-expand');
            expandBtn.textContent = 'V';
            let isClicked = false;
    
            expandBtn.addEventListener("click", () => {
                isClicked = !isClicked;
                if (isClicked) {
                    
                    projectDescriptionText.textContent = newProject.projectDescription;
                    loadTodolist(newProject, projectTodolistContainer);
                    
                } else {

                    projectDescriptionContainer.classList = 'project-description-container';
                    projectDescriptionText.textContent = '';

                    projectTodolistContainer.replaceChildren();
                }
            });
        
            return expandBtn;
        };

        const createOpenBtn = () => {
            const projectOpen = document.createElement('button');
            projectOpen.classList.add('project-open');
            projectOpen.textContent = 'O';   

            projectOpen.addEventListener("click", () => {
                
            });

            return projectOpen;
        };

        contentBody.appendChild(projectCard);
        
        projectCard.appendChild(projectHeader);
        projectCard.appendChild(projectBody);
        
        projectHeader.appendChild(projectTitle);
        projectHeader.appendChild(createExpandBtn());
        projectHeader.appendChild(createOpenBtn());
        
        projectBody.appendChild(projectDescriptionContainer);
        projectBody.appendChild(projectTodolistContainer);

        projectDescriptionContainer.appendChild(projectDescriptionText);
    
    }
    

    function addDefaultProjectCard(){
        addNewProjectCard(projectModel.createDefaultProject());
    }

    function loadTodolist(project, targetEl) {

        const todoList = document.createElement('ul');

        todoList.classList.add('project-todolist');

        targetEl.appendChild(todoList);

        project.projectTodos.forEach(todo => {
            const item = document.createElement('li');
            const title = document.createElement('span');
            const dueDate = document.createElement('span');
            const priority = document.createElement('span');

            item.classList.add('project-todo-item');
            title.classList.add('project-todo-title');
            dueDate.classList.add('project-todo-date');
            priority.classList.add('project-todo-priority');

            title.textContent = todo.todoTitle;
            dueDate.textContent = todo.todoDueDate;
            priority.textContent = todo.todoPriority;

            todoList.appendChild(item);
            item.appendChild(title);
            item.appendChild(dueDate);
            item.appendChild(priority);

        });

    }

    const addNewProjectButton = () => {
        
        const addProjectBtn = document.createElement('button');
        const icon = document.createElement('p');
        
        addProjectBtn.classList.add('project-add');
        icon.classList.add('project-add-icon');
        icon.textContent = '+';

        contentBody.appendChild(addProjectBtn);
        addProjectBtn.appendChild(icon);

        addProjectBtn.addEventListener("click", () => {
            if (contentBody.getElementsByClassName('form-card').length >= 1) {
                icon.classList = '';
                icon.classList.add('project-add-icon-info');        
                icon.textContent = 'Form is ready';
                setTimeout(() => {
                    icon.classList = '';
                    icon.classList.add('project-add-icon');
                    icon.textContent = '+';               
                }, 1500);

                return;
            }
            
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
        const descriptionError = document.createElement('span');

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
                formCard.remove();                
                addNewProjectCard(submittedProject);
            
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
        formDescriptionItem.appendChild(descriptionError);

        formContainer.appendChild(formSubmitContainer);
        formSubmitContainer.appendChild(addSubmitFormButton());
        formSubmitContainer.appendChild(addCancelFormButton());
    
    };

    const deleteExpandBtn = () => {


    };

    const createShrinkBtn = () => {

    };




       // function addSidebarLayout() {
       
    //     const sidebar = document.createElement('div');
    //     const sidebarHeader = document.createElement('div');
    //     const sidebarHeaderTitle = document.createElement('h2');
        
    // }
    
    




    return {
        addProjectsElements,
        addNewProjectCard,
        addDefaultProjectCard,
        addNewProjectButton,
        addNewProjectForm
    }
})();