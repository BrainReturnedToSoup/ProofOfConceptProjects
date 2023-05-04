import './element-constructor-DOM-updater';

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
        this.booksList = [...bookObj];
        this.libraryOwner = LibraryOwner;
    }

    addToLibrary(bookObj) {
        if (this instanceof Library) {
            if (bookObj instanceof Book) {
                this.bookList.push(bookObj);
            } else {
                console.log(`ERROR: trying to add a non-book OBJ to ${this.libraryOwner} library book list`)
            }
        } else {
            console.log(`ERROR: not a valid library to add to`)
        }
    }

    displayLibrary() {
        if (this instanceof Library) {

            if (this.bookList.length > 0) {

                for (let bookObj of this.bookList) {
                    console.log(bookObj);
                }

            } else {
                console.log(`ERROR: no books within this library`);
            }
        } else {
            console.log(`ERROR: not a valid library to display`);
        }

    }

}

function initializeLibrary(LibraryOwner, ...bookProperties) {
    const newLibrary = new Library(LibraryOwner, new Book(...bookProperties));
    libraryList.push(newLibrary);
    createBookCardElement(newLibrary.booksList[0]);
}



