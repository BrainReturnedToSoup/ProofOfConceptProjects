const elementClasses = {
    bookCell: 'Book-Cell',
    xButton: 'X-Button',
    libraryOwnerLabel: 'Library-Owner',
    libraryOwnerName: 'Library-Owner-Name',
    bookTitleLabel: 'Book-Title',
    bookTitleName: 'Book-Title-Name',
    bookAuthorLabel: 'Book-Author',
    bookAuthorName: 'Book-Author-Name',
    pagesLeftLabel: 'Book-Pages-Left',
    pagesLeftValue: 'Pages-Left-Value',
    readYetLabel: 'Book-Read-Yet',
    readYetValue: 'Read-Yet-Value',
    pageLeftUpButton: 'Increment-Page-Left-Value',
    pageLeftDownButton: 'Decrement-Page-Left-Value',
},

    elementTags = {
        bookCell: 'div',
        xButton: 'button',
        libraryOwnerLabel: 'h1',
        libraryOwnerName: 'div',
        bookTitleLabel: 'h1',
        bookTitleName: 'div',
        bookAuthorLabel: 'h2',
        bookAuthorName: 'div',
        pagesLeftLabel: 'h2',
        pagesLeftValue: 'div',
        readYetLabel: 'h3',
        readYetValue: 'div',
        pageLeftUpButton: 'button',
        pageLeftDownButton: 'button',
    },

    templateElementTextContent = {
        xButton: 'X',
        libraryOwnerLabel: 'Library Owner:',
        bookTitleLabel: 'Title',
        bookAuthorLabel: 'By',
        pagesLeftLabel: 'Pages Left',
        readYetLabel: 'Read Yet?',
        pageLeftUpButton: '- Page Read',
        pageLeftDownButton: '+ Page Read'
    },

    dataElementIdentifier = {
        libraryOwnerName: 'libraryOwner',
        bookTitleName: 'title',
        bookAuthorName: 'author',
        pagesLeftValue: 'pagesLeft',
        readYetValue: 'readYet'
    },

    domRefs = {
        mainElement: document.querySelector('main'),
        existingOwnersDropDown: document.querySelector('#Existing-Owners')
    }

function updateDOM() {

    domRefs.mainElement.innerHTML = '';

    for (const libraryOwner of infoToDisplay.libraryData.keys()) {
        createBookElements(libraryOwner, infoToDisplay.libraryData.get(libraryOwner));
    }

}

function createBookElements(libraryOwner, books) {

    for (const book of books) {

        let bookCell;
        const bookClass = book.title.replace(/\s+/g, '_') + '_';

        for (const element in elementClasses) {

            if(elementClasses[element] === 'Book-Cell') {
                
                bookCell = document.createElement(elementTags[element]); 
                bookCell.setAttribute('class', elementClasses[element]);
                bookCell.classList.add(bookClass);

            } else {

                const childElement = document.createElement(elementTags[element]);

                if(Object.keys(templateElementTextContent).includes(element) !== undefined ) {
                    childElement.textContent = templateElementTextContent[element];
                } else if(Object.keys(dataElementIdentifier).includes(element)) {
                    childElement.textContent = book[dataElementIdentifier[element]];
                }

                childElement.setAttribute('class', elementClasses[element]);
                childElement.classList.add(bookClass);
                bookCell.appendChild(childElement);
            }

        }

        bookCell !== undefined ?
            domRefs.mainElement.appendChild(bookCell) :
            console.log(`ERROR: cannot append book cell to main : READS UNDEFINED`);

        bookCell = undefined;

    }

}

function createOwnersDropDown(infoToDisplay) {

    domRefs.existingOwnersDropDown.innerHTML = ''

    for (const libraryOwner in infoToDisplay) {

        const optionElement = document.createElement('option');

        optionElement.setAttribute('value', `${libraryOwner}`);
        optionElement.textContent = libraryOwner;

        domRefs.existingOwnersDownDown.appendChild(optionElement);

    }

}

export { elementClasses, elementTags, templateElementTextContent, updateDOM, createBookElements }



