import { hometabLoad } from "./hometab.js";
import { menutabLoad } from "./menutab.js";
import { abouttabLoad } from "./abouttab.js";
import { contacttabLoad } from "./contacttab.js";
import "./styles.css";

const navBar = (function(){
    
    const content = document.getElementById('content');

    const homeBtn = document.querySelector('#home-button');
    const menuBtn = document.querySelector('#menu-button');
    const aboutBtn = document.querySelector('#about-button');
    const contactBtn = document.querySelector('#contact-button');

    hometabLoad.setTab();

    function changeToHome(){
        homeBtn.addEventListener("click", () => {
            content.replaceChildren();
            hometabLoad.setTab();
        });
    }

    const changeToMenu = function(){
        menuBtn.addEventListener("click", () => {
            content.replaceChildren();
            menutabLoad.setTab();
        })
    }

    function changeToAbout(){
        aboutBtn.addEventListener("click", () => {
            content.replaceChildren();
            abouttabLoad.setTab();
        });
    }

    function changeToContact(){
        contactBtn.addEventListener("click", () => {
            content.replaceChildren();
            contacttabLoad.setTab();
        })
    }

    function initButtons(){
        changeToHome();
        changeToMenu();
        changeToAbout();
        changeToContact();
    }

    return {
        initButtons,
    }

})();


navBar.initButtons();
