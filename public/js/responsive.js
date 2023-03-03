let navBtn = document.getElementById('navMenuBtn');
let navMenu = document.getElementById('hbMenuContent');

navBtn.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
});
