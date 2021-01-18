let menuButton = document.querySelector('.showMenu');
let menu = document.querySelector('.containerTrackingMobile');

menuButton.addEventListener('click', () => {

    menu.classList.toggle('containerTrackingMobileShow');
    menuButton.style.visibility="hidden";
    
    button.forEach(key => {
        key.style.visibility = 'hidden'
    })
})

let closeMenu = document.querySelector('.closeMenu');

closeMenu.addEventListener('click', () => {
    menuButton.style.visibility="visible";
    menu.classList.toggle('containerTrackingMobileShow');

    button.forEach(key => {
        key.style.visibility = 'visible'
    })
})
