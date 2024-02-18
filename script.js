const library = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    isRead() {
        this.read = !this.read
    }
}

function addBookToLibrary() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('auth').value;
    let pages = document.getElementById('pagNo').value;
    let read = document.getElementById('read').checked;

    const newBook = new Book(title, author, pages, read);
    library.push(newBook);
}

const newButton = document.querySelector('#nBtn');
const addDialog = document.querySelector('#addDialog');
newButton.addEventListener('click', () => {
    addDialog.showModal();
});

const confirmBtn = document.querySelector('#confirmBtn');
confirmBtn.addEventListener('click', (event) => {
    addBookToLibrary();
    addDialog.close();
    event.preventDefault();
    display();
});

function display() {
    const dispContainer = document.querySelector('.displayContainer');
    dispContainer.innerHTML = '';
    
    library.forEach((book, index) => {
        const newDisp = document.createElement('div');
        newDisp.innerHTML = `<p>Book Title: ${book.title}</p>` +
                            `<p>Book Author: ${book.author}</p>` +
                            `<p>Book Is Read: ${book.read}</p>` +
                            `<p>Book Pages: ${book.pages}</p>` +
                            `<button class="deleteBtn" data-index="${index}">Delete</button>` +
                            `<button class="readBtn" data-index="${index}">Read</button>`;
        dispContainer.appendChild(newDisp);

        const deleteBtn = newDisp.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', () => {
            const index = parseInt(deleteBtn.getAttribute('data-index'));
            deleteBook(index);          
        });

        const readBtn = newDisp.querySelector('.readBtn');
        readBtn.addEventListener('click', () => {
            const index = parseInt(readBtn.getAttribute('data-index'));
            library[index].isRead();
            display();
        });
    });
}

function deleteBook(index) {
    library.splice(index, 1);
    display();
}