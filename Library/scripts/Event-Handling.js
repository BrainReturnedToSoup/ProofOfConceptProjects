const eventHandlers = {

    clickEvent:  function(event) {

    },

    submitEvent: function(event) {

    }

},

eventTargetFunctionality = {

    createNewLibrary: function() {

    },

    createAndAddBook: function() {

    },

    deleteBook: function () {

    },

    PageLeftUp: function () {

    },

    PageLeftDown: function () {

    }

},

navBarButtonClasses = {
    newLibraryButton: 'New-Library',
    addBookToALibraryButton: 'Add-Book',
    removeBookfromALibraryButton: 'Remove-Book'
},

bookCardButtonClasses = {
    xButton: 'X-Button',
    addPagesLeftButton: 'Increment-Page-Left-Value',
    subPagesLeftButton: 'Decrement-Page-Left-Value'
}

document.addEventListener('click', eventHandlers.clickEvent);
document.addEventListener('submit', eventHandlers.submitEvent);