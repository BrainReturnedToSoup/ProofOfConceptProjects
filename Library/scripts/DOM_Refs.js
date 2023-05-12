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

    bookElementTags = {

        container: 'div',

        title: 'h1',
        author: 'h2',
        totalPages: 'h3',
        currentPage: 'h3',
        pagesLeft: 'h3',
        readYet: 'h3',

        buttonContainer: 'div',

        currentPageDownButton: 'button',
        currentPageUpButton: 'button',
        readYetToggleButton: 'button',
        deleteBookButton: 'button'

    },

    bookElementButtonText = {

        currentPageDownButton: '- Page',
        currentPageUpButton: '+ Page',
        readYetToggleButton: 'Read?',
        deleteBookButton: 'X'

    },

    bookElementTemplateText = {

        author: 'By:',
        totalPages: 'Total Pages:',
        currentPage: 'Current Page:',
        pagesLeft: 'Pages Left:'

    },

    addBookElementClasses = {

        addBookContainer: 'Add-Book-Container',
        defaultPlusSign: 'Add-Book-Plus-Sign-Default',
        hoverPlusSign: 'Add-Book-Plus-Sign-Hover',

        addBookFormContainer: 'Add-Book-Form-Container',

        addBookForm: '',

        addBookSubmitButton: '',

        titleInputContainer: 'Input-Wrapper',
        titleInputLabel: '',
        titleInputForm: '',

        authorInputContainer: 'Input-Wrapper',
        authorInputLabel: '',
        authorInputForm: '',

        totalPagesInputContainer: 'Input-Wrapper',
        totalPagesInputLabel: '',
        totalPagesInputForm: '',

        currentPageInputContainer: 'Input-Wrapper',
        currentPageInputLabel: '',
        currentPageInputForm: '',

        radioSelectionContainer: 'Input-Wrapper-Radio-Container',
        radioSelectionLegend: '',

        radioButtonsContainer: 'Input-Wrapper-Radio-Buttons',
        radioButtonLabelYes: '',
        radioButtonFormYes: '',
        radioButtonLabelNo: '',
        radioButtonFormNo: ''

    },

    addBookElementTags = {

        addBookContainer: 'div',
        defaultPlusSign: 'img',
        hoverPlusSign: 'img',

        addBookFormContainer: 'div',

        addBookForm: 'form',

        addBookSubmitButton: 'button',

        titleInputContainer: 'div',
        titleInputLabel: 'label',
        titleInputForm: 'input',

        authorInputContainer: 'div',
        authorInputLabel: 'label',
        authorInputForm: 'input',

        totalPagesInputContainer: 'div',
        totalPagesInputLabel: 'label',
        totalPagesInputForm: 'input',

        currentPageInputContainer: 'div',
        currentPageInputLabel: 'label',
        currentPageInputForm: 'input',

        radioSelectionContainer: 'div',
        radioSelectionLegend: 'legend',

        radioButtonsContainer: 'div',
        radioButtonLabelYes: 'label',
        radioButtonFormYes: 'input',
        radioButtonLabelNo: 'label',
        radioButtonFormNo: 'input'
    },

    addBookForAttribute = {

        titleInputLabel : 'title',
        authorInputLabel: 'author',
        totalPagesInputLabel: 'totalPages',
        currentPageInputLabel: 'currentPage',

        radioButtonLabelYes: 'readYet',
        radioButtonLabelNo: 'readYet'

    },

    addBookTypeAttribute = {

        addBookSubmitButton: 'submit',

        titleInputForm: 'text',
        authorInputForm: 'text',
        totalPagesInputForm: 'number',
        currentPageInputForm: 'number',

        radioButtonFormYes: 'radio',
        radioButtonFormNo: 'radio'

    },

    addBookNameAttribute = {

        titleInputForm: 'title',
        authorInputForm: 'author',
        totalPagesInputForm: 'totalPages',
        currentPageInputForm: 'currentPage',

        radioButtonFormYes: 'readYet',
        radioButtonFormNo: 'readYet'
    },

    addBookValueAttribute = {

        radioButtonFormYes: 'I have read this book',
        radioButtonFormNo: 'I have not read this book'

    },

    addBookIDAttribute = {

        titleInputForm: 'title',
        authorInputForm: 'author',
        totalPagesInputForm: 'totalPages',
        currentPageInputForm: 'currentPage',

        radioButtonFormYes: 'haveRead',
        radioButtonFormNo: 'haveRead'

    },

    addBookTextContent = {

        addBookSubmitButton: 'Add Book',

        titleInputLabel: 'Title',
        authorInputLabel: 'Author',
        totalPagesInputLabel: 'Total Pages',
        currentPageInputLabel: 'Current Page',

        radioSelectionLegend: 'Read Yet?',

        radioButtonLabelYes: 'Yes',
        radioButtonLabelNo: 'No'
        
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




export {

    bookElementClasses,
    addBookElementClasses,
    addBookElementTags,
    addBookForAttribute,
    addBookTypeAttribute,
    addBookNameAttribute,
    addBookValueAttribute,
    addBookIDAttribute,
    addBookTextContent,
    addBookElementRefs,
    clickableBookElementClasses,
    clickableAddBookElementClasses,
    bookElementTags,
    bookElementButtonText,
    bookElementTemplateText

}