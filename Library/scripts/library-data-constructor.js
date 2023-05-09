class Book {

    constructor(Title, Author, PagesLeft, ReadYetBool) {
        this.title = Title;
        this.author = Author;
        this.pagesLeft = PagesLeft;
        this.readYet = ReadYetBool;
    }

    //Book constructs an object that will represent one book, which this book will have unique properties with their associated values
    // Book object example
    //  {
    //      title = 'The Great Gatsby',
    //      author = 'F. Scott Fitzgerald,
    //      pagesLeft = 123,
    //      readYet = false
    //  }

    subPagesLeft() {
        this.pagesLeft < 0 ?
            console.log(`ERROR: trying to decrease pages left to below zero`) :
            this.pagesLeft--
    }

    addPagesLeft() {
        this.pagesLeft++;
    }

    changeReadYet() {
        typeof this.readYet !== 'boolean' ?
            console.log(`ERROR: readYet property is not a boolean, reads ${this.readYet}`) :
            this.readYet = !this.readYet
    }

}

class librariesManager {

    constructor() {
        this.libraryData = new Map();
    }

    //librariesManager constructs an object that has a Map data structure within it named libraryData
    //A key in the map should represent the owner of the library
    //The value of said key will be an array containing objects as its elements, which each object represents a single book
    // allLibraries object example
    //   {
    //      libraryData => {
    //      libraryOwner: [{book1}, {book2}, {book3}, ...]
    //      libraryOwner2: [{book1}, {book2}, {book3}, ...]
    //      }
    //   }

    addBookToLibrary(libraryOwner, ...bookProperties) {
        this.libraryData.has(libraryOwner) ?
            this.libraryData.get(libraryOwner).push(new Book(...bookProperties)) :
            console.log(`ERROR: cannot add book to library : LIBRARY NOT FOUND : `);
    }

    newLibrary(libraryOwner, ...bookProperties) {
        this.libraryData.has(libraryOwner) ?
            console.log(`ERROR: cannot create a new library : LIBRARY ALREADY EXISTS : RECEIVED ${libraryOwner}`) :
            this.libraryData.set(libraryOwner, [new Book(...bookProperties)]);
    }

    removeBookFromLibrary(libraryOwner, bookTitle) {

        if (this.libraryData.has(libraryOwner)) {
            //checks if the Map for all libraries contains a library with the owner libraryOwner
            const targetLibrary = this.libraryData.get(libraryOwner);
            //if it does, then set targetLibrary equal to the library of that library owner
            let bookDeleted = false;
            //represents state of if the target book was deleted

            for (let bookIndex in targetLibrary) {

                if (bookDeleted) break;
                //the book loop will break if the book has already been deleted when the loop restarts

                const bookPropertyKeys = Object.keys(targetLibrary[bookIndex]);
                //create a variable containing all of the present properties of the current book

                if (bookPropertyKeys.includes('title') && targetLibrary[bookIndex].title === bookTitle) {
                    //checks if the title property of the current book isn't undefined as well as if that property matches the bookTitle arg
                    //if it does we know the right book has been found

                    targetLibrary.splice(bookIndex, 1);
                    //the book is completely removed from its spot in the books array corresponding to the library

                    bookDeleted = true;
                    //changes the book deleted state to true so the loop doesn't continue
                }

            }

            //condition check for either after to book is deleted or the loop finishes
            bookDeleted ?
                console.log(`The Book ${bookTitle} was deleted`) :
                console.log(`ERROR: cannot remove book : BOOK NOT FOUND : RECEIVED ${bookTitle}`);

        } else {

            return console.log(`ERROR: cannot remove from library : LIBRARY NOT FOUND : RECEIVED ${libraryOwner}`);

        }

    }

    changeBookPropertyValue(libraryOwner, bookTitle, property, value) {

        if (this.libraryData.has(libraryOwner)) {
            //checks if the Map for all libraries contains a library with the owner libraryOwner  

            const targetLibrary = this.libraryData.get(libraryOwner);
            //if it does, then set targetLibrary equal to the library of that library owner

            let bookPropertyChanged = false;
            //represents state of if the target book property was changed

            for (let bookIndex in targetLibrary) {

                if (bookPropertyChanged) break;
                //the book loop will break if the book property corresponding to the specific book has found and altered

                const bookPropertyKeys = Object.keys(targetLibrary[bookIndex]);
                //create a variable containing all of the present properties of the current book

                if (bookPropertyKeys.includes('title') && bookPropertyKeys.includes(property) && targetLibrary[bookIndex].title === bookTitle) {

                    switch (true) {
                        case property === 'pagesLeft' && value === 'add':
                            //Increase the amount of pages left to read on this specific book
                            targetLibrary[bookIndex].addPagesLeft();
                            bookPropertyChanged = true;
                            break;
                        case property === 'pagesLeft' && value === 'sub':
                            //Lower the amount of pages left to read on this specific book
                            targetLibrary[bookIndex].subPagesLeft();
                            bookPropertyChanged = true;
                            break;
                        case targetLibrary[bookIndex].pagesLeft === 0:
                            //will change readYet property to true if the pagesLeft reaches 0, because the book has been read, this value wont change even if pagesLeft value goes up
                            if(!targetLibrary[bookIndex].readYet) {
                            targetLibrary[bookIndex].changeReadYet();
                            bookPropertyChanged = true;
                            }
                            break;
                    }

                }

            }

            //condition check for either after the specific book property was changed or the loop finishes
            bookPropertyChanged ?
                console.log(`The Book ${bookTitle} ${property} property changed to ${value}`) :
                console.log(`ERROR: cannot change book property : BOOK NOT FOUND : RECEIVED ${bookTitle}`);

        } else {

            return console.log(`ERROR: cannot change book property : LIBRARY NOT FOUND : RECEIVED ${libraryOwner}`);

        }

    }

    deleteLibrary(libraryOwner) {

        this.libraryData.has(libraryOwner) ?
            this.libraryData.delete(libraryOwner) :
            console.log(`ERROR: cannot delete library : LIBRARY NOT FOUND : RECEIVED ${libraryOwner}`);
    }

    cLogLibrary(libraryOwner) {

        this.libraryData.has(libraryOwner) ?
            console.log(this.libraryData.get(libraryOwner)) :
            console.log(`ERROR: could not display library : LIBRARY NOT FOUND : RECEIVED ${libraryOwner}`);

    }

    cLogAllLibraries() {
        console.log(this.libraryData)
    }

}

export { librariesManager, Book }






