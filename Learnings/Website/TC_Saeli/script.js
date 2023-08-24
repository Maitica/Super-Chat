const burgerMenu = document.querySelector('.burger-menu');
const menuItems = document.querySelector('.menu-items');

burgerMenu.addEventListener('click', function() {
    menuItems.style.display = menuItems.style.display === 'block' ? 'none' : 'block';
});

const submenuItems = document.querySelector('.submenu-items');

menuItems.addEventListener('click', function(event) {
    const target = event.target;
    if (target.tagName === 'A' && target.nextElementSibling !== null) {
        event.preventDefault();
        target.nextElementSibling.style.display = target.nextElementSibling.style.display === 'block' ? 'none' : 'block';
    }
});