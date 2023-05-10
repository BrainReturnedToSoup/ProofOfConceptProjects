import { Books } from './Books_Data_Interface.js'
import {
    bookElementClasses,
    addBookElementClasses,
    addBookElementRefs,
    clickableBookElementClasses,
    clickableAddBookElementClasses
} from './DOM_Refs.js'

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

document.addEventListener('click', eventHandlers.click);
document.addEventListener('submit', eventHandlers.submit);