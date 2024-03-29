import { Books } from './Books_Data_Interface.js'
import {
    bookElementClasses,
    addBookElementRefs,
    clickableBookElementClasses,
    clickableAddBookElementClasses
} from './DOM_Refs.js'
import { updateDOM } from './DOM_Renderer.js'

const dataManipulation = {

    initializeLocalStorage: function () {

        const booksDataStructure = new Books(),
            stringifiedDataStructure = JSON.stringify(booksDataStructure);

        localStorage.setItem('Books_Data', stringifiedDataStructure);

    },

    updateLocalStorage: function (classMethodBooks, targetTitle, ...bookProperties) {

        let localStorageData = JSON.parse(localStorage.getItem('Books_Data')),
            dataBooksObj,
            dataBooksObjClone

        dataBooksObj = this.convertToBookObj(localStorageData);

        switch (classMethodBooks) {

            case 'currentPageDown':
                dataBooksObj.currentPageUp(targetTitle);
                break;
            case 'currentPageUp':
                dataBooksObj.currentPageDown(targetTitle);
                break;
            case 'toggleReadYet':
                dataBooksObj.toggleReadYet(targetTitle);
                break;
            case 'removeBook':
                dataBooksObj.removeBook(targetTitle);
                break;
            case 'addBook':

                if (bookProperties !== undefined) {
                    dataBooksObj.addBook(...bookProperties);
                }

                break;
            default:
                throw new Error(`Invalid method received, received '${classMethodBooks}'`);
        }

        dataBooksObjClone = dataBooksObj;

        localStorage.removeItem('Books_Data')

        localStorage.setItem('Books_Data', JSON.stringify(dataBooksObjClone));

    },

    checkLocalStorageStatus: function () {

        if (JSON.parse(localStorage.getItem('Books_Data')) === null) {

            this.initializeLocalStorage();

        }

    },

    convertToBookObj(objectJSON) {

        const bookObj = new Books(),
            { title, author, totalPages, currentPage, pagesLeft, readYet } = objectJSON;

        bookObj.title = title;
        bookObj.author = author;
        bookObj.totalPages = totalPages;
        bookObj.currentPage = currentPage;
        bookObj.pagesLeft = pagesLeft;
        bookObj.readYet = readYet;

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

            switch (true) {

                case CBECvalues.includes(targetClass):

                    const targetTitleElement = event.target.parentNode.parentNode.getElementsByClassName(bookElementClasses.title)[0],
                        targetTitle = targetTitleElement.textContent;

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

                dataManipulation.checkLocalStorageStatus();
                dataManipulation.updateLocalStorage('addBook', null, inputTitle, inputAuthor, inputTotalPages, inputCurrentPage, inputReadYet);
                updateDOM();

                event.preventDefault();

                addBookElementRefs.defaultPlusSignElement.style.display = '';
                addBookElementRefs.hoverPlusSignElement.style.display = '';

                addBookElementRefs.addBookFormContainerElement.style.display = '';

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

    }

dataManipulation.checkLocalStorageStatus();

document.addEventListener('click', eventHandlers.click);
document.addEventListener('submit', eventHandlers.submit);