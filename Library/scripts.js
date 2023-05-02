class Book {

    constructor(Title, Author, PagesLeft, ReadYetBool) {
        this.title = Title;
        this.author = Author;
        this.pagesLeft = PagesLeft;
        this.readYet = ReadYetBool;
    }

}

class Library {

    constructor(...bookObj) {
        this.array = [...bookObj];
    }

    addToLibrary(bookObj) {
        this.array.push(bookObj);
    }
    displayLibrary() {
        for(let bookObj of this.array) {
            console.log(bookObj);
        }
    }

}

function initializeLibrary(...bookProperties) {
    return new Library(new Book(...bookProperties));
}

const myLibrary = initializeLibrary('The Hobbit', 'J.R.R. Tolkien', 234, false);
myLibrary.addToLibrary(new Book('The True Meaning of Smekday', 'Adam Rex', 0, true))

