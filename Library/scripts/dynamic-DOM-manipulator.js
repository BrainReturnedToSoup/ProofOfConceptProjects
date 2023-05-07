import { Library, Book } from './library-data-constructor' 

class LibraryManager {

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

        let currentLibraryIndex = 0, currentBookIndex = 0;

        const compareLibraries = () => {

            let maxLengthOfStateArray;

            if (this.libraryList.length > this.DOMstate.length) {
                maxLengthOfStateArray = this.libraryList.length;
            } else {
                maxLengthOfStateArray = this.DOMstate.length;
            }

            while (maxLengthOfStateArray > currentLibraryIndex) {

                let totalDifferences, libraryOwnerDifferences = [];

                let libraryOwnerDataSide = this.libraryList[currentLibraryIndex].libraryOwner,
                    libraryOwnerDOMSide = this.DOMstate[currentLibraryIndex].libraryOwner,
                    libraryBookListDataSide = this.libraryList[currentLibraryIndex].bookList,
                    libraryBookListDOMside = this.DOMstate[currentLibraryIndex].bookList;

                let maxBookListLength;

                if (libraryBookListDataSide.length > libraryBookListDOMside.length) {
                    maxBookListLength = libraryBookListDataSide.length;
                } else {
                    maxBookListLength = libraryBookListDOMside.length;
                }

                if (libraryOwnerDataSide !== libraryOwnerDOMSide) {
                    libraryOwnerDifferences.push({ libraryOwnerDif: libraryOwnerDataSide });
                    this.DOMstate[currentLibraryIndex].libraryOwner = this.libraryList[currentLibraryIndex].libraryOwner;
                }

                while (maxBookListLength > currentBookIndex) {

                    const bookDifferences = compareBooks(libraryBookListDataSide, libraryBookListDOMside);

                    let referenceTitle;

                    if (libraryBookListDataSide[currentBookIndex].title !== undefined) {
                        referenceTitle = libraryBookListDataSide[currentBookIndex].title;
                    } else {
                        referenceTitle = libraryBookListDOMside[currentBookIndex].title;
                    }

                    totalDifferences = bookDifferences.concat(libraryOwnerDifferences);

                    if (totalDifferences.length > 0) {
                        packageAndSendData(referenceTitle, totalDifferences);
                    }

                    currentBookIndex++;
                    totalDifferences = undefined;
                    libraryOwnerDifferences = [];

                }

                currentLibraryIndex++;
                currentBookIndex = 0;

            }

        }

        const compareBooks = (dataLibraryBookList, DOMLibraryBookList) => {

            let bookDiff = []

            const bookInfoDataSide = dataLibraryBookList[currentBookIndex], bookInfoDOMSide = DOMLibraryBookList[currentBookIndex]

            switch (true) {

                case (bookInfoDataSide.title !== bookInfoDOMSide.title):
                    bookDiff.push({ titleDif: bookInfoDataSide.title });
                    this.DOMstate[currentLibraryIndex].bookList[currentBookIndex].title = this.libraryList[currentLibraryIndex].bookList[currentBookIndex].title;
                    //fallthrough

                case (bookInfoDataSide.author !== bookInfoDOMSide.author):
                    bookDiff.push({ authorDif: bookInfoDataSide.author });
                    this.DOMstate[currentLibraryIndex].bookList[currentBookIndex].author = this.libraryList[currentLibraryIndex].bookList[currentBookIndex].author;
                    //fallthrough

                case (bookInfoDataSide.pagesLeft !== bookInfoDOMSide.pagesLeft):
                    bookDiff.push({ pagesLeftDif: bookInfoDataSide.pagesLeft });
                    this.DOMstate[currentLibraryIndex].bookList[currentBookIndex].pagesLeft = this.libraryList[currentLibraryIndex].bookList[currentBookIndex].pagesLeft;
                    //fallthrough

                case (bookInfoDataSide.readYet !== bookInfoDOMSide.readYet):
                    bookDiff.push({ readYetDif: bookInfoDataSide.readYet });
                    this.DOMstate[currentLibraryIndex].bookList[currentBookIndex].readYet = this.libraryList[currentLibraryIndex].bookList[currentBookIndex].readYet;
                    //fallthrough

            }

            return bookDiff;

        }

        const packageAndSendData = (inputRefTitle, libraryDifs) => {

            const dataInstructions = libraryDifs.reduce((acc, curr) => {
                return Object.assign(acc, curr);
            })

            dataInstructions.refTitle = inputRefTitle.replace(/ /g, '_') + '_';

            DOMChangesInterpreter(dataInstructions);

        }

        return compareLibraries();

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
        class: 'Increment-Page-Left-Value',
        textContent: '- Page Read'
    },

    decrementButton: {
        element: 'button',
        class: 'Decrement-Page-Left-Value',
        textContent: '+ Page Read'
    }

}

const mainElement = document.querySelector('main');

function bookCardElementConstructor(refTitle) {

    if (refTitle === undefined || refTitle === null || refTitle === '') return console.log('ERROR: need valid refTitle before book card construction');

    let bookCellCreated = false, bookCellElementTemplate;

    for (const key in bookCardElements) {

        if (key == 'bookCell') {

            bookCellElementTemplate = document.createElement(bookCardElements[key].element);
            bookCellElementTemplate.setAttribute('class', bookCardElements[key].class);
            bookCellElementTemplate.classList.add(`${refTitle}`);
            bookCellCreated = !bookCellCreated;

        } else {

            if (bookCellElement === false) return console.log('ERROR: parent element "book cell" not initialized in bookCardElementConstructor() scope');

            let childElement = document.createElement(bookCardElements[key].element);
            childElement.setAttribute('class', bookCardElements[key].class);
            childElement.classList.add(`${refTitle}`);
            bookCellElementTemplate.appendChild(childElement);

        }

    }

    return bookCellElementTemplate;

}

function DOMChangesInterpreter(instructionsData) {

    const definedOrUndefined = {
        defined: 0,
        undefined: 0
    }

    for (let key in instructionsData) {
        if (instructionsData[key] === undefined) {
            definedOrUndefined.undefined++;
        } else if (instructionsData[key] !== undefined) {
            definedOrUndefined.defined++;
        }
    }

    if (instructionsData.refTitle !== undefined && definedOrUndefined.undefined === 5) {
        removeBookCardFromDOM(instructionsData.refTitle);
    } else if (definedOrUndefined.defined === 6) {
        addBookCardToDOM(instructionsData);
    } else {
        updateInfoOnDOM(instructionsData);
    }

}

const elementTargetClass = {
    titleDif: 'Book-Title-Name',
    authorDif: 'Book-Author-Name',
    pagesLeftDif: 'Pages-Left-Value',
    readYetDif: 'Read-Yet-Value',
    libraryOwnerDif: 'Library-Owner-Name'
}

function updateInfoOnDOM(instructionsData) {

    const bookTargetClass = instructionsData.refTitle

    for(let key in instructionsData) {
        let targetElement = document.querySelector(`.${elementTargetClass[key]}.${bookTargetClass}`);
        targetElement.textContent = instructionsData[key];
    }

}

function addBookCardToDOM(completeCardInfo) {

    let newBookCard = bookCardElementConstructor(completeCardInfo.refTitle)
    for(let key in completeCardInfo) {
        if(key !== 'refTitle') {
        let targetElement = newBookCard.querySelector(`.${elementTargetClass[key]}`);
        targetElement.textContent = completeCardInfo[key];
        }
    }

    mainElement.appendChild(newBookCard);

}

function removeBookCardFromDOM(refTitle) {
    document.querySelector(`.Book-Cell.${refTitle}`).remove();
}

