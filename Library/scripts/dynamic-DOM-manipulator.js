import './library-data-constructor' //constructor of objects that represent an individual library and individual books which are stored in the libraryList property

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
                return;
            }
        }

        return console.log(`The library for ${this.LibraryOwner} was not found`);

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
        textContent: 'X'
    },

    libraryOwnerHeader: {
        element: 'h1',
        class: 'Library-Owner',
        textContent: 'Library Owner:'
    },

    libraryOwnerName: {
        element: 'h1',
        class: 'Library-Owner-Name'
    },

    bookTitleHeader: {
        element: 'h1',
        class: 'Book-Title',
        textContent: 'Title'
    },

    bookTitleName: {
        element: 'div',
        class: 'Book-Title-Name'
    },

    bookAuthorHeader: {
        element: 'h2',
        class: 'Book-Author',
        textContent: 'By'
    },

    bookAuthorName: {
        element: 'div',
        class: 'Book-Author-Name'
    },

    bookPagesLeftHeader: {
        element: 'h2',
        class: 'Book-Pages-Left',
        textContent: 'Pages Left'
    },

    bookPagesLeftValue: {
        element: 'div',
        class: 'Pages-Left-Value'
    },

    bookReadYetHeader: {
        element: 'h3',
        class: 'Book-Read-Yet',
        textContent: 'Read Before?'
    },

    bookReadYetValue: {
        element: 'div',
        class: 'Read-Yet-Value'
    },

    incrementButton: {
        element: 'button',
        class: 'Increment-Page-Value',
        textContent: '+ Page Read'
    },

    decrementButton: {
        element: 'button',
        class: 'Decrement-Page-Value',
        textContent: '- Page Read'
    }

}

function bookCardElementConstructor(title) {

    if (title === undefined || title === null || title === '') return console.log('ERROR: Need book valid title before book card construction');

    const identifierClass = title.replaceAll(/ /, '_') + '_';
    let bookCellCreated = false, bookCellElementTemplate;

    for (const key in bookCardElements) {

        if (key == 'bookCell') {

            bookCellElementTemplate = document.createElement(bookCardElements[key].element);
            bookCellElementTemplate.setAttribute('class', bookCardElements[key].class);
            bookCellElementTemplate.classList.add(`${title}`);
            bookCellCreated = !bookCellCreated;

        } else {

            if (bookCellElement === false) return console.log('ERROR: parent element book cell not created in bookCardElementConstructor()');

            let childElement = document.createElement(bookCardElements[key].element);
            childElement.setAttribute('class', bookCardElements[key].class);
            childElement.classList.add(`${title}`);
            bookCellElementTemplate.appendChild(childElement);

        }

    }

    return bookCellElementTemplate;

}

//creates a template book card element with all necessary elements within it, along with a unique identifier to all associated elements specific to the title
//of the book, though the relevant data still needs to be added to each of the value elements


function allValuesSetter (Title) {

}


const comparisonObj = new DOMstateAndLibraryList;

//to encapsulate book cards, try assigning a custom class attribute to all associated elements on a book card, perhaps using the book title as the
//name but replace spacing with and underscore along with adding one at the end like this "The_Hobbit_", this way to target corresponding elements,
//use the title value and alter it to the class format equivalent