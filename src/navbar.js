var button = document.querySelector('#toggle-menu-button');
var menu = document.querySelector('#toggle-menu');
var open = document.querySelector('#open');
var close = document.querySelector('#close');

button.addEventListener('click', (e) => {
    menu.classList.toggle('hidden');
    open.classList.toggle('hidden');
    close.classList.toggle('hidden');
});