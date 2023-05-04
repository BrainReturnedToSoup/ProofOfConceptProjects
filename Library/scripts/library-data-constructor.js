class Book {

    constructor(Title, Author, PagesLeft, ReadYetBool, LibraryOwner) {
        this.title = Title;
        this.author = Author;
        this.pagesLeft = PagesLeft;
        this.readYet = ReadYetBool;
    }

    removePagesLeft() {
        if(this.pagesLeft > 0) {
        this.pagesLeft--;
        }
    }

    addPagesLeft() {
        this.pagesLeft++;
    }

    changeReadYet() {
        if(this.readYet === undefined || null || '') return;
        this.readYet = !this.readYet;
    }

}

class Library {

    constructor(LibraryOwner, ...bookObj) {
        this.booksList = [...bookObj];
        this.libraryOwner = LibraryOwner;
    }

    addToLibrary(...bookProperties) {
        this.booksList.push(new Book(...bookProperties));
    }

    removeFromLibrary(Title) {
        for(let i = 0; i < this.booksList.length; i++) {
            if(this.booksList[i].title === Title) {
                this.booksList.splice(i, 1);
                return;
            }
        }
        console.log(`ERROR: ${Title} was not found in ${this.libraryOwner}'s list of books`);
    }

    displayLibrary() {
        if (this.booksList.length > 0) {

            for (let book of this.booksList) {
                console.log(book);
            }

        } else {
            console.log(`ERROR: no books within this library`);
        }
    }

}

// libraryObjExample = {
//      libraryOwner: 'Steve'
//      bookList: [
//          {
//              title: 'The Hobbit',
//              author: 'J.R.R. Tolkien',
//              pagesLeft: 124,
//              readYet: false
//          },
//          {...},
//          {...}
//      ]
// }






