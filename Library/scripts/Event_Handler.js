import { Books } from './Books_Data_Interface.js'
import {
    bookElementClasses,
    addBookElementRefs,
    clickableBookElementClasses,
    clickableAddBookElementClasses
} from './DOM_Refs.js'

import { updateDOM } from './DOM_Renderer.js';



const dataManipulation = {

    initializeLocalStorage: function () {

        const booksDataStructure = new Books(),
            stringifiedDataStructure = JSON.stringify(booksDataStructure);

        localStorage.setItem('Books_Data', stringifiedDataStructure);

    },

    updateLocalStorage: function (classMethodBooks, targetTitle, ...bookProperties) {

        let localStorageData = JSON.parse(localStorage.getItem('Books_Data')),
            dataBooksObj,
            alteredData;

        if (localStorageData === null) {

            this.checkLocalStorageStatus();
            this.updateLocalStorage(classMethodBooks, targetTitle, ...bookProperties);

        }

        dataBooksObj = this.convertToBookObj(localStorageData);

        switch (classMethodBooks) {

            case 'currentPageDown':
                alteredData = dataBooksObj.currentPageUp(targetTitle);
                break;
            case 'currentPageUp':
                alteredData = dataBooksObj.currentPageDown(targetTitle);
                break;
            case 'toggleReadYet':
                alteredData = dataBooksObj.toggleReadYet(targetTitle);
                break;
            case 'removeBook':
                alteredData = dataBooksObj.removeBook(targetTitle);
                break;
            case 'addBook':

                if (bookProperties !== undefined) {
                    alteredData = dataBooksObj.addBook(...bookProperties);
                }

                break;
            default:
                throw new Error(`Invalid method received, received '${classMethodBooks}'`);
        }

        localStorage.setItem('Books_Data', JSON.stringify(alteredData));

    },

    checkLocalStorageStatus: function () {

        if (localStorage.getItem('Books_Data') === null) {

            this.initializeLocalStorage();

        } else {

            return;

        }

    },

    convertToBookObj(objectJSON) {

        const bookObj = new Books();

        bookObj.titles = objectJSON.titles;
        bookObj.authors = objectJSON.authors;
        bookObj.totalPages = objectJSON.totalPages;
        bookObj.currentPages = objectJSON.currentPages;
        bookObj.totalPagesLeft = objectJSON.totalPagesLeft;
        bookObj.readYet = objectJSON.readYet;

        return bookObj;

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

            const formData = new FormData(event.target),
                inputTitle = formData.get('title'),
                inputAuthor = formData.get('author'),
                inputTotalPages = formData.get('totalPages'),
                inputCurrentPage = formData.get('currentPage'),
                inputReadYet = formData.get('readYet'),
                pagesLeft = inputTotalPages - inputCurrentPage;

            if (pagesLeft < 0) {

                throw new Error(`current page value cannot be greater than total pages value`);

            } else {

                dataManipulation.updateLocalStorage('addBook', null, inputTitle, inputAuthor, inputTotalPages, inputCurrentPage, inputReadYet);

            }

        }

    },





    clickEventMethods = {

        bookCardClicked: function (targetClass, targetTitle) {

            switch (targetClass) {

                case clickableBookElementClasses.currentPageDownButton:

                    dataManipulation.checkLocalStorageStatus();
                    dataManipulation.updateLocalStorage('currentPageDown', targetTitle);
                    updateDOM();
                    break;

                case clickableBookElementClasses.currentPageUpButton:

                    dataManipulation.checkLocalStorageStatus();
                    dataManipulation.updateLocalStorage('currentPageUp', targetTitle);
                    updateDOM();
                    break;

                case clickableBookElementClasses.readYetToggleButton:

                    dataManipulation.checkLocalStorageStatus();
                    dataManipulation.updateLocalStorage('toggleReadYet', targetTitle);
                    updateDOM();
                    break;

                case clickableBookElementClasses.deleteBookButton:

                    dataManipulation.checkLocalStorageStatus();
                    dataManipulation.updateLocalStorage('removeBook', targetTitle);
                    updateDOM();
                    break;

                default:
                    throw new Error(`Failed to match target class to a clickable book card button class`);

            }

        },

        addBookButtonClicked: function () {

        }

    }

document.addEventListener('click', eventHandlers.click);
document.addEventListener('submit', eventHandlers.submit);