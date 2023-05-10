import { Books } from './Books_Data_Interface.js'

const dataManipulation = {
    initializeDataStructure: function () {

    },
    updateDataStructure: function () {

    }
},

    eventHandlers = {
        click: function (event) {

            const targetClassList = event.target.classList,
                targetClass = targetClassList[0],
                identifierClass = targetClassList[1],
                CBECvalues = Object.values(clickableBookElementClasses),
                CABECvalues = Object.values(clickableAddBookElementClasses);

            let targetTitle;

            switch (true) {
                case CBECvalues.includes(targetClass):

                    targetTitle = event.target.parentElement.parentElement.querySelector(bookElementClasses.title).textContent;
                    clickEventMethods.bookCardClicked(targetClass, targetTitle);

                    break;
                case CABECvalues.includes(targetClass):

                    addBookElementRefs.defaultPlusSignElement.style.display = 'none';
                    addBookElementRefs.hoverPlusSignElement.style.display = 'none';

                    addBookElementRefs.addBookFormContainerElement.style.display = 'block';

                    break;
                case targetClass === 'Form' || identifierClass === 'Form':

                    return;
                default:
                    addBookElementRefs.defaultPlusSignElement.style.display = '';
                    addBookElementRefs.hoverPlusSignElement.style.display = '';

                    addBookElementRefs.addBookFormContainerElement.style.display = '';
            }

        },

        submit: function (event) {

        }

    },

    clickEventMethods = {

        bookCardClicked: function (targetClass, targetTitle) {

        },

        addBookButtonClicked: function () {

        }

    },

    bookElementClasses = {

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

document.addEventListener('click', eventHandlers.click);
document.addEventListener('submit', eventHandlers.submit);