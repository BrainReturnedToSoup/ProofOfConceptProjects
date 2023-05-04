import './library-data-constructor'
//compare the libraryList array to the RepresentingTheDOM array in order to dynamically change the DOM on each event


class DOMstateAndLibraryList {
    constructor() {
        this.libraryList = [];
        this.DOMstate = [];
    }

    initializeLibrary(LibraryOwner, ...bookProperties) {
        this.libraryList.push(new Library(LibraryOwner, new Book(...bookProperties)));
    }

    deleteLibrary(LibraryOwnerValue) {

        for(let i = 0; i < libraryList.length; i++) {
            if(this.libraryList[i].libraryOwner === LibraryOwnerValue) {
                this.libraryList.splice(i, 1);
            }
        }
    
        console.log(`The library for ${this.LibraryOwner} was not found`);
    
    }

    compareStates() {

    }

}

const comparisonObj = new DOMstateAndLibraryList;

//to encapsulate book cards, try assigning a custom class attribute to all associated elements on a book card, perhaps using the book title as the
//name but replace spacing with and underscore along with adding one at the end like this "The_Hobbit_", this way to target corresponding elements,
//use the title value and alter it to the class format equivalent