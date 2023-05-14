import {
    bookElementClasses,
    bookElementTags,
    bookElementButtonText,
    bookElementTemplateText
} from "./DOM_Refs.js";

const mainElementRef = document.querySelector('main');

function updateDOM() {

    for (let i = mainElementRef.children.length - 1; i > 0; i--) {

        mainElementRef.removeChild(mainElementRef.children[i]);

    }

    const dataToRender = JSON.parse(localStorage.getItem('Books_Data'))

    if (typeof dataToRender === 'object' && dataToRender !== null) {

        const allBookCardsArray = createBookCards(dataToRender)

        allBookCardsArray.forEach(bookCard => {
            mainElementRef.appendChild(bookCard);
        });

    } else {

        return;

    }

}

function createBookCards(dataToRender) {

    const bookCardsArray = [],
        titles = dataToRender.title;


    for (const index in titles) {

        let container,
            buttonContainer

        for (const element in bookElementTags) {

            if (element === 'container') {

                container = document.createElement(bookElementTags[element]);
                container.classList.add(bookElementClasses[element]);

            } else if (element === 'buttonContainer') {

                buttonContainer = document.createElement(bookElementTags[element]);
                buttonContainer.classList.add(bookElementClasses[element]);

            } else if (bookElementTags[element] === 'button') {

                const currentButtonElement = document.createElement(bookElementTags[element]);

                currentButtonElement.classList.add(bookElementClasses[element]);
                currentButtonElement.textContent = bookElementButtonText[element];

                buttonContainer.appendChild(currentButtonElement);

            } else {

                const currentElement = document.createElement(bookElementTags[element]);

                if (Object.keys(bookElementTemplateText).includes(element)) {

                    currentElement.textContent = `${bookElementTemplateText[element]} ${dataToRender[element][index]}`;

                } else {

                    currentElement.textContent = dataToRender[element][index];

                }

                currentElement.classList.add(bookElementClasses[element]);

                container.appendChild(currentElement);

            }

        }

        container.appendChild(buttonContainer)
        bookCardsArray.push(container)

    }

    return bookCardsArray;

}

updateDOM();

export { updateDOM }



