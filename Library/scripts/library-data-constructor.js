class Book {

    constructor(Title, Author, PagesLeft, ReadYetBool) {
        this.title = Title;
        this.author = Author;
        this.pagesLeft = PagesLeft;
        this.readYet = ReadYetBool;
    }

    removePagesLeft() {
        if(this.pagesLeft < 0) return console.log(`ERROR: trying to decrease pages left to below zero`);
        this.pagesLeft--;
    }

    addPagesLeft() {
        this.pagesLeft++;
    }

    changeReadYet() {
        if (typeof this.readYet !== 'boolean') return console.log(`ERROR: readYet property is not a boolean, reads ${this.readYet}`);
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

        if (typeof Title === string) {

            for (let i = 0; i < this.booksList.length; i++) {

                if (this.booksList[i].title === Title) {
                    this.booksList.splice(i, 1);
                    return;
                }
                
            }

            console.log(`ERROR: ${Title} was not found in ${this.libraryOwner}'s list of books`);

        }

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

// libraryObjectExample = {
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






