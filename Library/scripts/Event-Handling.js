import { librariesManager, Book } from './library-data-constructor'
import { elementClasses, elementTags, templateElementTextContent, mainElement, updateDOM, createBookElements } from './Dynamic-DOM'

//should be set to a librariesManager Object
let infoToDisplay;

const appRefs = {

    navBarButtonClasses: {
        newLibrary: 'New-Library',
        addBook: 'Add-Book',
        removeBook: 'Remove-Book'
    },

    bookCardButtonClasses: {
        xButton: elementClasses[xButton],
        pageLeftUpButton: elementClasses[pageLeftUpButton],
        pageLeftDownButton: elementClasses[pageLeftDownButton]
    },

    formBackButtonClasses: {
        addBookFormBackButton: 'Add-Book-Back',
        newLibraryFormBackButton: 'New-Library-Back'
    },

    refElements: {
        home: document.querySelector('Content-Wrapper'),
        addBookForm: document.querySelector('#Add-Book-To-Existing-Library'),
        newLibraryForm: document.querySelector('#New-Library-Creation'),
    }

},

    eventMethods = {

        handleClick: {
            bookCardButtonClicked: function (eventTarget, tagClassName, identifierClassName) {
                
                
                switch (true) {

                }
            },
            navBarButtonClicked: function (buttonIdentifier) {
                switch (true) {

                }
            },
            formCardBackButtonClicked: function (buttonIdentifier) {

            }
        },

        handleSubmit: {
            newLibraryForm: function (event) {
                switch (true) {
                    case infoToDisplay === undefined:

                        break;
                    case infoToDisplay instanceof librariesManager:

                        break;
                    default:
                        return console.log(`ERROR: infoToDisplay is not either a valid data structure or undefined : EQUAL TO ${infoToDisplay}`);
                }
            },

            addBookForm: function (event) {
                if (infoToDisplay instanceof librariesManager) {

                } else {

                }
            }
        },

        interpretEvent: {

            click: function (event) {

                const targetClassList = event.targetClasslist,
                    tagClassName = targetClassList[0],
                    identifierClassName = targetClassList[1];

                switch (true) {
                    case appRefs.bookCardButtonClasses.includes(tagClassName):
                        eventMethods.handleClick.bookCardButtonClicked(event.target, tagClassName, identifierClassName);
                        break;
                    case appRefs.navBarButtonClasses.includes(tagClassName):
                        eventMethods.handleClick.navBarButtonClicked(tagClassName);
                        break;
                    case appRefs.formBackButtonClasses.includes(identifierClassName):
                        eventMethods.handleClick.formCardBackButtonClicked(identifierClassName);
                    default:
                        return;
                }

            },

            submit: function (event) {

                switch (true) {
                    case event.target === appRefs.refElements.addBookForm:
                        eventMethods.handleSubmit.addBookForm(event.target);
                        break;
                    case event.target === appRefs.refElements.newLibraryForm:
                        eventMethods.handleSubmit.newLibraryForm(event.target);
                        break;
                    default:
                        return console.log(`ERROR: invalid event received : RECEIVED ${event.target}`);
                }

            }

        }

    }

document.addEventListener('click', eventMethods.interpretEvent.click);
document.addEventListener('submit', eventMethods.interpretEvent.submit);



