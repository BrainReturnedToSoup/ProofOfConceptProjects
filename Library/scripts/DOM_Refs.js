const bookElementClasses = {

    container: 'Book-Card',

    title: 'Book-Card-Title',
    author: 'Book-Card-Author',
    totalPages: 'Book-Card-Total-Pages',
    currentPage: 'Book-Card-Current-Page',
    pagesLeft: 'Book-Card-Pages-Left',
    readYet: 'Book-Card-Read-Yet',

    buttonContainer: 'Book-Card-Button-Container',

    currentPageDownButton: 'Book-Card-Current-Page-Down',
    currentPageUpButton: 'Book-Card-Current-Page-Up',
    readYetToggleButton: 'Book-Card-Read-Yet-Change',
    deleteBookButton: 'Book-Card-Delete-Book'

},

    addBookElementClasses = {

        addBookContainer: 'Add-Book-Container',
        defaultPlusSign: 'Add-Book-Plus-Sign-Default',
        hoverPlusSign: 'Add-Book-Plus-Sign-Hover',

        addBookFormContainer: 'Add-Book-Form-Container'

    },

    addBookElementRefs = {

        addBookContainerElement: document.getElementsByClassName(addBookElementClasses.addBookContainer)[0],
        defaultPlusSignElement: document.getElementsByClassName(addBookElementClasses.defaultPlusSign)[0],
        hoverPlusSignElement: document.getElementsByClassName(addBookElementClasses.hoverPlusSign)[0],

        addBookFormContainerElement: document.getElementsByClassName(addBookElementClasses.addBookFormContainer)[0]

    },

    clickableBookElementClasses = {

        currentPageDownButton: bookElementClasses.currentPageDownButton,
        currentPageUpButton: bookElementClasses.currentPageUpButton,
        readYetToggleButton: bookElementClasses.readYetToggleButton,
        deleteBookButton: bookElementClasses.deleteBookButton,

    },

    clickableAddBookElementClasses = {

        addBookContainer: addBookElementClasses.addBookContainer,
        defaultPlusSign: addBookElementClasses.defaultPlusSign,
        hoverPlusSign: addBookElementClasses.hoverPlusSign,

    }

    export { bookElementClasses, addBookElementClasses, addBookElementRefs, clickableBookElementClasses, clickableAddBookElementClasses }