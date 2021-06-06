let form = document.querySelector('.addBook');
let closeButton = document.querySelector('.closeAddButton');
let button = document.querySelectorAll('.addImg');

button.forEach(key => {
    key.addEventListener('click', () => {
        form.classList.toggle('addBookShow');
        toggleButtons();
    })  
})

closeButton.addEventListener('click', () => {
    form.classList.toggle('addBookShow');
    toggleButtons();
})

