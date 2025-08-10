import restaurantOutside from "./restaurant-outside.jpg";
import restaurantStaff from "./restaurant-staff.webp";
import logo from "./logo.png"

export const abouttabLoad = (function(){

    function changeBgClass(){
        const bg = document.getElementById('background');
        bg.removeAttribute('class');
        bg.classList.add('about');
        bg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${restaurantOutside})`;
    }

    function changeContentClass(){
        const content = document.getElementById('content');
        content.removeAttribute('class');
        content.classList.add('about');
    }

    function setTab(){
        changeBgClass();
        changeContentClass();
        createAboutCard();
    }
    
    function createAboutCard(){
        const aboutCard = document.createElement('div');
        aboutCard.classList.add('about-card');
        
        const aboutCardHeader = document.createElement('div');
        aboutCardHeader.classList.add('about-card-header');

        const aboutCardHeaderImage = document.createElement('img');
        aboutCardHeaderImage.classList.add('about-card-header-image');
        aboutCardHeaderImage.src = restaurantStaff;

        const aboutCardBody = document.createElement('div');
        aboutCardBody.classList.add('about-card-body');

        const aboutRestaurant = document.createElement('div');
        aboutRestaurant.classList.add('about-restaurant');
        aboutRestaurant.textContent = 'Welcome to Restaurant, \
        a cozy culinary haven where tradition meets creativity. \
        Nestled in the heart of the city, \
        Restaurant was founded with one goal in mind: \
        to serve delicious, honest food in a warm and inviting atmosphere. \
        Our menu is a carefully crafted blend of classic favorites and modern twists, \
        using only the freshest seasonal ingredients. Whether you\'re here for a quick lunch\
         or a relaxed dinner with friends, we want every visit to feel special.';

        const aboutStaff = document.createElement('div');
        aboutStaff.classList.add('about-staff');
        aboutStaff.textContent = 'Behind every great dish is a team that cares. \
        At Restaurant, our chefs bring passion and precision to every plate, \
        combining years of experience with a genuine love for the culinary arts. \
        Our front-of-house staff is just as dedicated — friendly, attentive, \
        and always ready to make your experience smooth and enjoyable. \
        From the kitchen to your table, we work together to make\
        Restaurant a place you\'ll want to return to again and again.';

        const aboutLogo = document.createElement('img');
        aboutLogo.classList.add('about-logo');
        aboutLogo.src = logo;
        
        content.appendChild(aboutLogo);
        content.appendChild(aboutCard);
        
        aboutCard.appendChild(aboutCardHeader);
        aboutCardHeader.appendChild(aboutCardHeaderImage);
        aboutCard.appendChild(aboutCardBody);
        aboutCardBody.appendChild(aboutRestaurant);
        aboutCardBody.appendChild(aboutStaff);
    }


    return {
        setTab
    }

})();