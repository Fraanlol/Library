let button = document.querySelectorAll('.addImg');
let form = document.querySelector('.addBook');

button.forEach(key => {
    key.addEventListener('click', () => {

        form.classList.toggle('addBookShow');
        key.style.visibility = 'hidden'
        menuButton.style.visibility="hidden";
        
    })
})


let closeButton = document.querySelector('.closeAddButton');

closeButton.addEventListener('click', () => {
    form.classList.toggle('addBookShow');
    button.forEach(key => {
        key.style.visibility = 'visible'
    })
    menuButton.style.visibility="visible";
})

