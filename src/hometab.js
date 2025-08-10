import logo from "./logo.png";
import michelinStar from "./michelinstar.png";
import badge from "./badge.png";
import vege from "./vege.png";
import restaurantInside from "./restaurant-inside.jpg";

export const hometabLoad = (function(){

    function changeBgClass(){
        const bg = document.getElementById('background');
        bg.removeAttribute('class');
        bg.classList.add('home');
        bg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${restaurantInside})`;
    }

    function changeContentClass(){
        const content = document.getElementById('content');
        content.removeAttribute('class');
        content.classList.add('home');
        
    }

    function setTab(){
        changeBgClass();
        changeContentClass();
        createHomeCard();
    }

    function createHomeCard(){
        const mainContainer = document.createElement('div');
        const mainHeader = document.createElement('div');
        const mainInfo = document.createElement('div');
        const mainFooter = document.createElement('div');

        const imgLogo = document.createElement('img');
        const imgMichelin = document.createElement('img');
        const imgBadge = document.createElement('img');
        const imgVege = document.createElement('img');

        mainContainer.classList.add('main-container');
        mainHeader.classList.add('main-header');
        mainInfo.classList.add('main-info');
        mainFooter.classList.add('main-footer');

        mainInfo.textContent = "Lorem ipsum dolor sit amet, \
                    consectetur adipiscing elit, \
                    sed do eiusmod tempor incididunt \
                    ut labore et dolore magna aliqua.";

        imgLogo.classList.add('logo');
        imgMichelin.classList.add('footer-image');
        imgBadge.classList.add('footer-image');
        imgVege.classList.add('footer-image');

        imgLogo.src = logo;

        imgMichelin.src = michelinStar;
        imgBadge.src = badge;
        imgVege.src = vege;

        function appendChildren() {
            content.appendChild(mainContainer);
            mainContainer.appendChild(mainHeader);
            mainContainer.appendChild(mainInfo);
            mainContainer.appendChild(mainFooter);
        
            mainHeader.appendChild(imgLogo);
            
            mainFooter.appendChild(imgMichelin);    
            mainFooter.appendChild(imgBadge);
            mainFooter.appendChild(imgVege);
        }

        appendChildren();
    }

    

    return {
        setTab
    }


})();