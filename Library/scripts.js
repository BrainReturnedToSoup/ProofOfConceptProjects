class Book {

    constructor(Title, Author, PagesLeft, ReadYetBool, LibraryOwner) {
        this.title = Title;
        this.author = Author;
        this.pagesLeft = PagesLeft;
        this.readYet = ReadYetBool;
        this.libraryOwner = LibraryOwner;
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

