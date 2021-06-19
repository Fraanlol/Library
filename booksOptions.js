let booksContainer = document.querySelector('.books');
let bookOptions = document.querySelector('.bookMenu');

let arrayOfBooks = [];

class Book{
    constructor(bookName, authorName, pages, pagesReaded){
        this.bookName = bookName;
        this.authorName = authorName;
        this.pages = pages;
        this.pagesReaded = pagesReaded;
        this.img = 'Images/Book.svg';
        this.eraseButton = 'Images/bxs-message-square-x.svg';
        this.addImg = 'Images/add.svg';
        this.subtractButton = 'Images/subtract.svg';
        this.readed = pages == pagesReaded ? true:false;
    }
    readStatus(){
        if(this.pages == this.pagesReaded){
            this.readed = true;
        } else{
            this.readed = false;
        }
    }
}
function checkIfExists(book){
    if(arrayOfBooks.some(key => key.bookName === book.bookName)){
        alert('That book already exists')
        return false;
    } else{
    arrayOfBooks.push(book);
    saveStorage();
    createNewBook(book);
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
    let menuButtons = document.createElement('div');
    let eraseImg = document.createElement('img');
    let subtractPageImg = document.createElement('img');
    let addPageImg = document.createElement('img');


    mainDiv.classList.add('bookContainer');
    bookImg.classList.add('bookDeco');
    titleContainer.classList.add('titleOfBook');
    totalPagesContainer.classList.add('totalPages');
    authorContainer.classList.add('author');
    separator.classList.add('bar');
    readedPagesContainer.classList.add('readedPages');
    pagesContainer.classList.add('pagesContainer');
    authorContainers.classList.add('authorContainer');
    eraseImg.classList.add('eraseBook');
    addPageImg.classList.add('addPageButton');
    subtractPageImg.classList.add('subtractPageButton');
    menuButtons.classList.add('bookMenu');

    bookImg.setAttribute('src', book.img);
    eraseImg.setAttribute('src', book.eraseButton);
    addPageImg.setAttribute('src', book.addImg);
    subtractPageImg.setAttribute('src', book.subtractButton);

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
    menuButtons.appendChild(eraseImg);
    menuButtons.appendChild(addPageImg);
    menuButtons.appendChild(subtractPageImg);
    booksContainer.appendChild(mainDiv);

    eraseImg.addEventListener('click',(e)=>{eraseBook(book,e)});
    addPageImg.addEventListener('click', (e) =>{addPageReaded(book,e)});
    subtractPageImg.addEventListener('click', (e) => {subtractPageReaded(book,e)})
    stats();
}

function eraseBook(book,e){
    booksContainer.removeChild(e.target.parentElement.parentElement);
    removeFromLibrary(book.bookName);
    stats();
    localStorage.clear();
    saveStorage();
}

function addPageReaded(book,e){
    let maxPages = book.pages;
    let readedPages = e.target.parentNode.previousElementSibling.lastElementChild;
    let numberR = parseInt(readedPages.innerText);
    numberR < maxPages ? numberR++:null
    book.pagesReaded = numberR;
    readedPages.innerText = `${numberR} Readed`;
    arrayOfBooks.map((key)=>key.readStatus());
    stats();
    localStorage.clear();
    saveStorage();
}

function subtractPageReaded(book,e){
    let readedPages = e.target.parentNode.previousElementSibling.lastElementChild;
    let numberR = parseInt(readedPages.innerText);
    numberR > 0 ? numberR--:null
    book.pagesReaded=numberR;
    readedPages.innerText = `${numberR} Readed`;
    arrayOfBooks.map((key)=>key.readStatus());
    stats();
    localStorage.clear();
    saveStorage();
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

function stats(){
    document.querySelectorAll('#lBooks').forEach( key => {key.innerText = arrayOfBooks.length;})
    document.querySelectorAll('#rPages').forEach( key => {key.innerText = arrayOfBooks.map((key)=>key.pagesReaded).reduce((a,b)=>a+b,0);})
    document.querySelectorAll('#rBooks').forEach( key => { key.innerText = arrayOfBooks.filter((key)=>key.readed==true).length;})
    document.querySelectorAll('#nrBooks').forEach(key => { key.innerText = arrayOfBooks.filter((key)=>key.readed==false).length;})
}
let a;
function saveStorage(){
    localStorage.setItem('library', JSON.stringify(arrayOfBooks));
}
a = JSON.parse(localStorage.getItem('library'));
if(!localStorage.getItem('library')){
    console.log('no existe')
} else{
    a.forEach(key => {
        checkIfExists(new Book(key.bookName,key.authorName,key.pages,key.pagesReaded))
    })
}