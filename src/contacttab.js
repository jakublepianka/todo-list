import ig from "./instagram.png";
import fb from "./facebook.png";
import x from "./twitter.png";
import contactBg from "./contact-bg.jpg";

export const contacttabLoad = (function(){

    function changeBgClass(){
        const bg = document.getElementById('background');
        bg.removeAttribute('class');
        bg.classList.add('contact');
        bg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${contactBg})`;
    }

    function changeContentClass(){
        const content = document.getElementById('content');
        content.removeAttribute('class');
        content.classList.add('contact');
    }

    function setTab(){
        changeBgClass();
        changeContentClass();
        createContactCard();
    }

    function createContactCard() {
        const contactContainer = document.createElement('div');
        contactContainer.classList.add('contact-container');
        
        const contactHeader = document.createElement('div');
        contactHeader.classList.add('contact-header');

        const contactBody = document.createElement('div');
        contactBody.classList.add('contact-body');

        const contactFooter = document.createElement('div');
        contactFooter.classList.add('contact-footer');

        const contactTitle = document.createElement('h1');
        contactTitle.classList.add('contact-title');
        contactTitle.textContent = 'RESTAURANT'

        const infoCardTitles = ['COME VISIT US', 'RESERVATIONS', 'OPENING HOURS'];
        const infoCardContents = [
            'RESTAURANT\n\
            Słoneczna 42, 3rd Floor\n\
            Poznań, Poland',
            '+48 61 999 88 77\n\
            reservations@restaurant.pl',
            'Monday – Thursday: 12:00 – 22:00\n\
            Friday – Saturday: 12:00 – 23:30\n\
            Sunday: 12:00 – 21:30'
        ];

        
        const igLink = document.createElement('a');
        const fbLink = document.createElement('a');
        const xLink = document.createElement('a');
        
        const igIcon = document.createElement('img');
        const fbIcon = document.createElement('img');
        const xIcon = document.createElement('img');
        
        igLink.classList.add('social-media-link');
        fbLink.classList.add('social-media-link');
        xLink.classList.add('social-media-link');

        igLink.href = 'www.instagram.com';
        fbLink.href = 'www.facebook.com';
        xLink.href = 'www.x.com';

        igIcon.classList.add('social-media-icon');
        fbIcon.classList.add('social-media-icon');
        xIcon.classList.add('social-media-icon');

        igIcon.src = ig;
        fbIcon.src = fb;
        xIcon.src = x;

        content.appendChild(contactContainer);
        contactContainer.appendChild(contactHeader);
        contactHeader.appendChild(contactTitle);
        
        contactContainer.appendChild(contactBody);

        contactContainer.appendChild(contactFooter);
        contactFooter.appendChild(igLink);
        contactFooter.appendChild(fbLink);
        contactFooter.appendChild(xLink);
        igLink.appendChild(igIcon);
        fbLink.appendChild(fbIcon);
        xLink.appendChild(xIcon);


        infoCardTitles.forEach((infoCardTitle, infoCardIndex) => {
            const infoCard = document.createElement('div');
            const infoCardHeader = document.createElement('div');
            const infoCardBody = document.createElement('div');
    
            infoCard.classList.add('info-card');
            infoCardHeader.classList.add('info-card-header');
            infoCardBody.classList.add('info-card-body');

            infoCardHeader.textContent = infoCardTitle;
            infoCardBody.innerText = infoCardContents[infoCardIndex];
            
            contactBody.appendChild(infoCard);
            infoCard.appendChild(infoCardHeader);
            infoCard.appendChild(infoCardBody);

        });

    }


    return {
        setTab
    }

})();