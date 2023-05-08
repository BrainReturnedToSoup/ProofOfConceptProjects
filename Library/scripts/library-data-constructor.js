export { librariesManager, Book }

class Book {

    constructor(Title, Author, PagesLeft, ReadYetBool) {
        this.title = Title;
        this.author = Author;
        this.pagesLeft = PagesLeft;
        this.readYet = ReadYetBool;
    }

    removePagesLeft() {
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

class librariesManager{

    constructor() {
        this.libraryData = new Map();
    }

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

            const targetLibrary = this.libraryData.get(libraryOwner);
            let bookDeleted = false;

            for (let bookIndex in targetLibrary) {

                if (bookDeleted) break;


                for (let property in targetLibrary[bookIndex]) {

                    if (targetLibrary[bookIndex][property]) {
                        targetLibrary.splice(bookIndex, 1);
                        bookDeleted = true;
                        break;
                    }

                }

            }

            bookDeleted ?
                console.log(`The Book ${bookTitle} was deleted`) :
                console.log(`ERROR: cannot remove book : BOOK NOT FOUND : RECEIVED ${bookTitle}`);

        } else {

            return console.log(`ERROR: cannot remove library : LIBRARY NOT FOUND : RECEIVED ${libraryOwner}`);

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


// allLibraries object example
//   {
//      libraryData => {
//      owner: [{book1}, {book2}, {book3}, ...]
//      owner2: [{book1}, {book2}, {book3}, ...]
//      }
//   }







