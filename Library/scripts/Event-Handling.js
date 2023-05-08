import { librariesManager, Book } from './library-data-constructor'
import { elementClasses, elementTags, templateElementTextContent, mainElement, updateDOM, createBookElements } from './Dynamic-DOM'

let infoToDisplay;

document.addEventListener('click', clickHandler);
document.addEventListener('submit', submitHandler);

const navBarButtonClasses = {
    newLibrary: 'New-Library',
    addBook: 'Add-Book',
    removeBook: 'Remove-Book'
},

    bookCardButtonClasses = {
        xButton: elementClasses[xButton],
        pageLeftUpButton: elementClasses[pageLeftUpButton],
        pageLeftDownButton: elementClasses[pageLeftDownButton]
    },

    refElements = {
        home: document.querySelector('Content-Wrapper'),
        addBookForm: document.querySelector('#Add-Book-To-Existing-Library'),
        newLibraryForm: document.querySelector('#New-Library-Creation'),
    },

    clickEventMethods = {
        bookCardButtonClicked: function () {

        },
        navBarButtonClicked: function () {

        },
    },

    submitEventMethods = {
        newLibraryForm: function () {

        },

        addBookForm: function () {

        }
    },

    eventHandlers = {
        click: function (event) {

            const targetClassList = event.targetClasslist,
                tagClassName = targetClassList[0],
                identifierClass = targetClassList[1];

            switch (true) {
                case bookCardButtonClasses.includes(tagClassName):
                    clickEventMethods.bookCardButtonClicked()
                    break;
                case navBarButtonClasses.includes(tagClassName):
                    clickEventMethods.navBarButtonClicked()
                    break;
                default:
                    return;
            }

        },

        submit: function (event) {

            switch (true) {
                case event.target === refElements.addBookForm:
                    submitEventMethods.addBookForm(event);
                    break;
                case event.target === refElements.newLibraryForm:
                    submitEventMethods.newLibraryForm(event);
                    break;
                default:
                    return console.log(`ERROR: invalid event received : RECEIVED ${event.target}`)
            }

        }
    }



