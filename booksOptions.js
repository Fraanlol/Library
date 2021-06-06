let booksContainer = document.querySelector('.books');
let bookOptions = document.querySelector('.bookMenu');

let arrayOfBooks = [];

class Book {
    constructor(bookName, authorName, pages, pagesReaded){
        this.bookName = bookName;
        this.authorName = authorName;
        this.pages = pages;
        this.pagesReaded = pagesReaded;
        this.img = 'Images/Book.svg';
    }
}

function checkIfExists(book){
    if(arrayOfBooks.some(key => key.bookName === book.bookName)){
        alert('That book already exists')
        return false;
    } else{
    arrayOfBooks.push(book);
    createNewBook(book)
    return true;
    }
}

function removeFromLibrary(title){
arrayOfBooks = arrayOfBooks.filter(item => item.bookName != title)
}

function capitalizeWords(word){
    let a = word.trim().toLowerCase().split(' ');
    let b = []
    a.forEach(key => {
        b.push(key[0].toUpperCase().concat(key.slice(1)))
    })
    return b.join(' ')
}

function getData(){
    let title = capitalizeWords(document.querySelector('#title').value);
    let author = capitalizeWords(document.querySelector('#author').value);
    let pages = Math.sqrt(document.querySelector('#pages').value**2);
    let pagesReaded = Math.sqrt(document.querySelector('#readed').value**2);
    if(pagesReaded > pages){
        pagesReaded = pages
    }
    return  checkIfExists(new Book(title,author,pages,pagesReaded));
}

function createNewBook(book){
    let mainDiv = document.createElement('div');
    let bookImg = document.createElement('img');
    let pagesContainer = document.createElement('div');
    let titleContainer = document.createElement('span');
    let totalPagesContainer = document.createElement('span');
    let separator = document.createElement('div');
    let authorContainers = document.createElement('div');
    let authorContainer = document.createElement('span');
    let readedPagesContainer = document.createElement('span');
    let menuButtons = bookOptions.cloneNode(true);

    mainDiv.classList.add('bookContainer');
    bookImg.classList.add('bookDeco');
    titleContainer.classList.add('titleOfBook');
    totalPagesContainer.classList.add('totalPages');
    authorContainer.classList.add('author');
    separator.classList.add('bar');
    bookImg.setAttribute('src', book.img);
    readedPagesContainer.classList.add('readedPages');
    pagesContainer.classList.add('pagesContainer');
    authorContainers.classList.add('authorContainer');

    titleContainer.innerText = book.bookName;    
    totalPagesContainer.innerText = `${book.pages} Pages`;
    separator.innerText = '|';
    authorContainer.innerText = book.authorName;
    readedPagesContainer.innerText = `${book.pagesReaded} Readed`;

    mainDiv.appendChild(bookImg);
        pagesContainer.appendChild(titleContainer);
        pagesContainer.appendChild(totalPagesContainer);
    mainDiv.appendChild(pagesContainer);
    mainDiv.appendChild(separator);
        authorContainers.appendChild(authorContainer);
        authorContainers.appendChild(readedPagesContainer);
    mainDiv.appendChild(authorContainers);
    mainDiv.appendChild(menuButtons);
    booksContainer.appendChild(mainDiv);
    buttons();
}


function buttons(){
    let closeButtons = document.querySelectorAll('.eraseBook');
    let addPageButton = document.querySelectorAll('.addPageButton');
    let minusPageButton = document.querySelectorAll('.subtractPageButton');

    closeButtons.forEach(key => {
    key.addEventListener('click', (e) => {
        booksContainer.removeChild(e.target.parentElement.parentElement);
        removeFromLibrary((e.target.parentElement.parentElement.firstChild.nextSibling.firstChild).innerText)
    })
})

addPageButton.forEach(key =>{
    key.addEventListener('click', (e) => {
        let a = e.target.parentNode.previousElementSibling.lastElementChild;
        let b = parseInt(a.innerText);
         b++
        a.innerText = `${b} Readed`
    })
})

minusPageButton.forEach(key =>{
    key.addEventListener('click', (e) => {
        let a = e.target.parentNode.previousElementSibling.lastElementChild;
        let b = parseInt(a.innerText);
         b--
        a.innerText = `${b} Readed`
    })
})
}


let createBookButton = document.querySelector('.formButton');
createBookButton.addEventListener('click', (e) => {
    a = [...document.querySelectorAll('.inputForm')];
    if (a.some(inputs => inputs.value.length <= 0)){
        a.forEach(key =>{
            if(key.value.length <= 0) {
                key.setAttribute('placeholder', 'Fill this field please');
            }
        })
    } else{
       
    getData();
    document.querySelector('.containerInput').reset();
    }
});

