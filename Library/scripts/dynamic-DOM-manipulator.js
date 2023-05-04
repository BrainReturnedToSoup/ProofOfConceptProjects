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

        for (let i = 0; i < libraryList.length; i++) {
            if (this.libraryList[i].libraryOwner === LibraryOwnerValue) {
                this.libraryList.splice(i, 1);
            }
        }

        console.log(`The library for ${this.LibraryOwner} was not found`);

    }

    compareStates() {   

    }

}

const bookCardElements = {

    bookCell: {
        element: 'div',
        class: 'Book-Cell'
    },

    xButton: {
        element: 'button',
        class: 'X-Button',
        innerText: 'X'
    },

    libraryOwnerHeader: {
        element: 'h1',
        class: 'Library-Owner',
        innerText: 'Library Owner:'
    },

    libraryOwnerName: {
        element: 'h1',
        class: 'Library-Owner-Name'
    },

    bookTitleHeader: {
        element: 'h1',
        class: 'Book-Title',
        innerText: 'Title'
    },

    bookTitleName: {
        element: 'div',
        class: 'Book-Title-Name'
    },

    bookAuthorHeader: {
        element: 'h2',
        class: 'Book-Author',
        innerText: 'By'
    },

    bookAuthorName: {
        element: 'div',
        class: 'Book-Author-Name'
    },

    bookPagesLeftHeader: {
        element: 'h2',
        class: 'Book-Pages-Left',
        innerText: 'Pages Left'
    },

    bookPagesLeftValue: {
        element: 'div',
        class: 'Pages-Left-Value'
    },

    bookReadYetHeader: {
        element: 'h3',
        class: 'Book-Read-Yet',
        innerText: 'Read Before?'
    },

    bookReadYetValue: {
        element: 'div',
        class: 'Read-Yet-Value'
    },

    incrementButton: {
        element: 'button',
        class: 'Increment-Page-Value',
        innerText: '+ Page Read'
    },

    decrementButton: {
        element: 'button',
        class: 'Decrement-Page-Value',
        innerText: '- Page Read'
    }

}

function bookCardElementConstructor(title) {

    if(title === undefined || null || '') return console.log('ERROR: Need book title before book card construction');

    const identifierClass = title.replaceAll(/ /, '_') + '_';
    let bookCellCreated = false;




}



const comparisonObj = new DOMstateAndLibraryList;

//to encapsulate book cards, try assigning a custom class attribute to all associated elements on a book card, perhaps using the book title as the
//name but replace spacing with and underscore along with adding one at the end like this "The_Hobbit_", this way to target corresponding elements,
//use the title value and alter it to the class format equivalent