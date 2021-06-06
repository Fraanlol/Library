let menuButton = document.querySelector('.showMenu');
let menu = document.querySelector('.containerTrackingMobile');
let closeMenu = document.querySelector('.closeMenu');

menuButton.addEventListener('click', () => { 
    menu.classList.toggle('containerTrackingMobileShow');
    toggleButtons();
})

closeMenu.addEventListener('click', () => {
    menu.classList.toggle('containerTrackingMobileShow');
    toggleButtons();
})

function toggleButtons(){
    menuButton.style.visibility= menuButton.style.visibility==="visible" ? 'hidden':'visible';
    button.forEach(key => {
        key.style.visibility =  key.style.visibility === 'visible' ? 'hidden' : 'visible'
    })
}