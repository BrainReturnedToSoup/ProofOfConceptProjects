import { librariesManager, Book } from './library-data-constructor'
import { elementClasses, elementTags, templateElementTextContent, mainElement, updateDOM, createBookElements } from './Dynamic-DOM'

let infoToDisplay

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

    pageStructureElements = {
        home: document.querySelector('Content-Wrapper'),
        addBookPopUp: document.querySelector('Add-Book-PopUp-Background'),
        newLibraryPopUp: document.querySelector('New-Library-PopUp-Background')
    },

    clickEventMethods = {
        bookCardButtonClicked: function () {

        },
        navBarButtonClicked: function () {

        }
    },

    submitEventMethods = {

    }

function clickHandler(event) {

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

}

function submitHandler(event) {

}

