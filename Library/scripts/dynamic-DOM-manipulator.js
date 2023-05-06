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

        if (typeof LibraryOwnerValue === 'string')
            for (let i = 0; i < this.libraryList.length; i++) {
                if (this.libraryList[i].libraryOwner === LibraryOwnerValue) {
                    this.libraryList.splice(i, 1);
                    return;
                }
            }

        return console.log(`The library for ${LibraryOwnerValue} was not found`);

    }

    compareDOMstate() {

        let currentLibraryIndex = 0;
        let currentBookIndex = 0;

        function compareLibraries() {

            while (this.libraryList.length > currentLibraryIndex) {

                let libraryDifferences, libraryOwnerDifferences = [];

                if (this.libraryList[currentLibraryIndex].libraryOwner !== this.DOMstate[currentLibraryIndex].libraryOwner) {
                    libraryOwnerDifferences.push({ libraryOwnerDif: this.libraryList[currentLibraryIndex].libraryOwner });
                    this.DOMstate[currentLibraryIndex].libraryOwner = this.libraryList[currentLibraryIndex].libraryOwner;
                }

                while (this.libraryList[currentLibraryIndex].bookList.length > currentBookIndex) {

                    const bookDifferences = compareBooks(this.libraryList[currentLibraryIndex].bookList, this.DOMstate[currentLibraryIndex].bookList)
                    let referenceTitle;
                    if (this.libraryList[currentLibraryIndex].bookList[currentBookIndex].title !== undefined) {
                        referenceTitle = this.libraryList[currentLibraryIndex].bookList[currentBookIndex].title;
                    } else {
                        referenceTitle = this.DOMstate[currentLibraryIndex].bookList[currentBookIndex].title;
                    }

                    libraryDifferences = bookDifferences.concat(libraryOwnerDifferences);

                    if (libraryDifferences.length > 0) {
                        packageAndSendData(referenceTitle, libraryDifferences);
                    }

                    currentBookIndex++;
                    libraryDifferences = undefined;
                    libraryOwnerDifferences = [];

                }

                currentLibraryIndex++;
                currentBookIndex = 0;

            }

        }

        function compareBooks(dataLibraryBookList, DOMLibraryBookList) {

            let bookDiff = []

            switch (false) {

                case (dataLibraryBookList[currentBookIndex].title === DOMLibraryBookList[currentBookIndex].title):
                    bookDiff.push({ titleDif: dataLibraryBookList[currentBookIndex].title });
                    this.DOMstate[currentLibraryIndex].bookList[currentBookIndex].title = this.libraryList[currentLibraryIndex].bookList[currentBookIndex].title;
                    fallthrough;

                case (dataLibraryBookList[currentBookIndex].author === DOMLibraryBookList[currentBookIndex].author):
                    bookDiff.push({ authorDif: dataLibraryBookList[currentBookIndex].author });
                    this.DOMstate[currentLibraryIndex].bookList[currentBookIndex].author = this.libraryList[currentLibraryIndex].bookList[currentBookIndex].author;
                    fallthrough;

                case (dataLibraryBookList[currentBookIndex].pagesLeft === DOMLibraryBookList[currentBookIndex].pagesLeft):
                    bookDiff.push({ pagesLeftDif: dataLibraryBookList[currentBookIndex].pagesLeft });
                    this.DOMstate[currentLibraryIndex].bookList[currentBookIndex].pagesLeft = this.libraryList[currentLibraryIndex].bookList[currentBookIndex].pagesLeft;
                    fallthrough;

                case (dataLibraryBookList[currentBookIndex].readYet === DOMLibraryBookList[currentBookIndex].readYet):
                    bookDiff.push({ readYetDif: dataLibraryBookList[currentBookIndex].readYet });
                    this.DOMstate[currentLibraryIndex].bookList[currentBookIndex].readYet = this.libraryList[currentLibraryIndex].bookList[currentBookIndex].readYet;
                    fallthrough;

            }

            return bookDiff;

        }

        function packageAndSendData(inputRefTitle, libraryDifs) {

            const refTitleObj = { refTitle: inputRefTitle.replaceAll(/ /, '_') + '_' }
            const dataInstructions = libraryDifs.reduce((acc, curr) => {
                return Object.assign(acc, curr);
            }, refTitleObj)

            DOMChangeHandler(dataInstructions);

        }

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

const mainElement = document.querySelector('main');

function bookCardElementConstructor(title) {

    if (title === undefined || title === null || title === '') return console.log('ERROR: Need book valid title before book card template construction');

    const identifierClass = title.replaceAll(/ /, '_') + '_';
    let bookCellCreated = false, bookCellElementTemplate;

    for (const key in bookCardElements) {

        if (key == 'bookCell') {

            bookCellElementTemplate = document.createElement(bookCardElements[key].element);
            bookCellElementTemplate.setAttribute('class', bookCardElements[key].class);
            bookCellElementTemplate.classList.add(`${identifierClass}`);
            bookCellCreated = !bookCellCreated;

        } else {

            if (bookCellElement === false) return console.log('ERROR: parent element "book cell" not initialized in bookCardElementConstructor() scope');

            let childElement = document.createElement(bookCardElements[key].element);
            childElement.setAttribute('class', bookCardElements[key].class);
            childElement.classList.add(`${identifierClass}`);
            bookCellElementTemplate.appendChild(childElement);

        }

    }

    return bookCellElementTemplate;

}

function DOMChangeHandler(instructionsData) {

    const definedOrUndefined = {
        defined: 0,
        undefined: 0
    }

    for(let key in instructionsData) {
        if(instructionsData[key] === undefined) {
            definedOrUndefined.undefined++;
        } else if(instructionsData[key] !== undefined) {
            definedOrUndefined.defined++;
        }
    }

    if(instructionsData.refTitle !== undefined && definedOrUndefined.undefined === 5) {
        removeBookCardFromDOM(instructionsData.refTitle);
    } else if(definedOrUndefined.defined === 6) {
        addBookCardToDOM(instructionsData);
    } else {
        updateInfoOnDOM(instructionsData);
    }

}

function updateInfoOnDOM() {



}

function addBookCardToDOM(completeCardInfo) {



}

function removeBookCardFromDOM(titleReference) {

    const identifierClass = titleReference.replaceAll(/ /, '_') + '_';
    document.querySelector(`.Book-Cell.${identifierClass}`).remove();

}

