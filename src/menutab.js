import foodBackground from "./food.jpg";

export const menutabLoad = (function(){

    const menuSectionTitles = ['APPETIZERS', 'MAIN DISHES', 'DESSERTS'];
    const appetizerNames = [
        'Classic Italian Bruschetta with Vine-Ripened Tomatoes and Fresh Basil',
        'Oven-Baked Stuffed Mushrooms Filled with Herbed Cream Cheese',
        'Golden Garlic Bread Slices Topped with Melted Mozzarella',
        'Caprese Salad Featuring Heirloom Tomatoes and Buffalo Mozzarella',
        'Crispy Fried Calamari Rings Served with Lemon Aioli'
    ];
    const mainDishesNames = [
        'Grilled Wild-Caught Salmon Fillet with Lemon Dill Sauce',
        'Creamy Chicken Alfredo Pasta Tossed with Fettuccine',
        'Traditional Beef Lasagna Layered with Ricotta and Mozzarella',
        'Stir-Fried Seasonal Vegetables in Ginger Soy Sauce',
        'Garlic Butter Shrimp Scampi with Linguine Pasta'
    ];
    const dessertNames = [
        'Classic Italian Tiramisu with Espresso',
        'New York Style Cheesecake with Fresh Strawberry Compote',
        'Warm Chocolate Lava Cake with Molten Center',
        'Silky Panna Cotta Infused with Madagascar Vanilla',
        'Artisan Italian Gelato Selection'
    ];

    const appetizerPrices = ['$7', '$8', '$6', '$9', '$10'];
    const mainDishPrices = ['$18', '$16', '$17', '$15', '$19'];
    const dessertPrices = ['$8', '$7', '$9', '$8', '$6'];

    const allNames = [appetizerNames, mainDishesNames, dessertNames];
    const allPrices = [appetizerPrices, mainDishPrices, dessertPrices];

    function changeBgClass(){
        const bg = document.getElementById('background');
        bg.removeAttribute('class');
        bg.classList.add('menu');
        bg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${foodBackground})`;
    }

    function changeContentClass(){
        const content = document.getElementById('content');
        content.removeAttribute('class');
        content.classList.add('menu');
    }

    function setTab(){
        changeBgClass();
        changeContentClass();
        createMenuCard();
    }

    function createMenuCard(){
        const menuCard = document.createElement('div');
        const menuCardHeader = document.createElement('div');
        const menuCardTitle = document.createElement('h3');
        const menuCardBody = document.createElement('div');
        
        menuCard.classList.add('menu-card');
        menuCardHeader.classList.add('menu-card-header');
        menuCardTitle.classList.add('menu-card-title');
        menuCardBody.classList.add('menu-card-body');
        
        menuCardTitle.textContent = 'MENU';

        content.appendChild(menuCard);
        menuCard.appendChild(menuCardHeader);
        menuCard.appendChild(menuCardBody);
        menuCardHeader.appendChild(menuCardTitle);

        function createSections() {

            menuSectionTitles.forEach((sectionTitle, sectionIndex) => {
            
                const menuSection = document.createElement('section');
                menuSection.classList.add('menu-section');
                
                const menuSectionTitle = document.createElement('h4');
                menuSectionTitle.classList.add('menu-section-title');
                menuSectionTitle.textContent = sectionTitle;

                const menuList = document.createElement('ul');
                menuList.classList.add('menu-list');

                menuCardBody.appendChild(menuSection);
                menuSection.appendChild(menuSectionTitle);
                menuSection.appendChild(menuList);

                allNames[sectionIndex].forEach((name, nameIndex) => {
                    
                    const menuItem = document.createElement('li');
                    const itemName = document.createElement('span');
                    const itemPrice = document.createElement('span');

                    menuItem.classList.add('menu-item');
                    itemName.classList.add('item-name');
                    itemPrice.classList.add('item-price');

                    itemName.textContent = name;
                    itemPrice.textContent = allPrices[sectionIndex][nameIndex];

                    menuList.appendChild(menuItem);
                    menuItem.appendChild(itemName);
                    menuItem.appendChild(itemPrice);  
                });
            });
        }
        createSections();
    }
    
    return {
        setTab
    }

})();
