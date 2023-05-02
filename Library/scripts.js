class Book {

    constructor(Title, Author, PagesLeft, ReadYetBool, LibraryOwner) {
        this.title = Title;
        this.author = Author;
        this.pagesLeft = PagesLeft;
        this.readYet = ReadYetBool;
    }

}

class Library {

    constructor(LibraryOwner, ...bookObj) {
        this.array = [...bookObj];
        this.libraryOwner = LibraryOwner;
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

function initializeLibrary(LibraryOwner, ...bookProperties) {
    return new Library(new Book(LibraryOwner, ...bookProperties));
}

