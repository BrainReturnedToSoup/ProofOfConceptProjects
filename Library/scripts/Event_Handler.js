import { Books } from './Books_Data_Interface.js'
import {
    bookElementClasses,
    addBookElementClasses,
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
            alteredData;

        if (localStorageData instanceof Books) {

            switch (classMethodBooks) {

                case 'currentPageDown':
                    alteredData = localStorageData.currentPageUp(targetTitle);
                    break;
                case 'currentPageUp':
                    alteredData = localStorageData.currentPageDown(targetTitle);
                    break;
                case 'toggleReadYet':
                    alteredData = localStorageData.toggleReadYet(targetTitle);
                    break;
                case 'removeBook':
                    alteredData = localStorageData.removeBook(targetTitle);
                    break;
                case 'addBook':
                    if(bookProperties !== undefined) {
                    alteredData = localStorageData.addBook(...bookProperties);
                    }
                    break;
                default:
                    throw new Error(`Invalid method received, received '${classMethodBooks}'`);
            }

            localStorage.setItem('Books_Data', JSON.stringify(alteredData));

        } else {

            throw new Error(`Cannot use methods on data, Books_Data is not an instance of the 'Books' class`);

        }

    },

    checkLocalStorageStatus: function () {

        if (localStorage.getItem('Books_Data') === null) {

            this.initializeLocalStorage();

        }

        const localStorageData = JSON.parse(localStorage.getItem('Books_Data'));

        if (localStorageData instanceof Books) {

            return;

        } else {

            this.initializeLocalStorage();

        }

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
                    break;

                case clickableBookElementClasses.currentPageUpButton:

                    dataManipulation.checkLocalStorageStatus();
                    dataManipulation.updateLocalStorage('currentPageUp', targetTitle);
                    break;

                case clickableBookElementClasses.readYetToggleButton:

                    dataManipulation.checkLocalStorageStatus();
                    dataManipulation.updateLocalStorage('toggleReadYet', targetTitle);
                    break;

                case clickableBookElementClasses.deleteBookButton:

                    dataManipulation.checkLocalStorageStatus();
                    dataManipulation.updateLocalStorage('removeBook', targetTitle);
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