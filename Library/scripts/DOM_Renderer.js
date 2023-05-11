import { bookElementClasses, bookElementTags, bookElementButtonText } from "./DOM_Refs.js";

const mainElementRef = document.querySelector('main');

function updateDOM() {

    mainElementRef.innerHTML = '';

    const dataToRenderString = localStorage.get('Books_Data');

    if (dataToRenderString === null) {

        throw new Error(`Failed to render data, 'Books_Data' was not found`);

    } else {

        const dataToRender = JSON.parse(dataToRenderString);

        if (dataToRender instanceof Books) {

            const allBookCardsArray = createBookCards(dataToRender);

            allBookCardsArray.forEach(bookCard => {
                mainElementRef.appendChild(bookCard);
            });

        } else {

            throw new Error(`Failed to render data, 'Books_Data' is not the correct data structure`);

        }

    }

}

function createBookCards(dataToRender) {

    const bookCardsArray = [],
        titles = dataToRender.titles;
    

    for (const index in titles) {

        let container,
        buttonContainer

        for (const element in bookElementTags) {
    
                if(element === 'container') {

                    container = document.createElement(bookElementTags[element]);
                    container.classList.add(bookElementClasses[element]);

                } else if(element === 'buttonContainer') {

                    buttonContainer = document.createElement(bookElementTags[element]);
                    buttonContainer.classList.add(bookElementClasses[element]);

                } else if(bookElementTags[element] === 'button') {

                    const currentButtonElement = document.createElement(bookElementTags[element]);

                    currentButtonElement.classList.add(bookElementClasses[element]);
                    currentButtonElement.textContent = bookElementButtonText[element];

                    buttonContainer.appendChild(currentButtonElement);

                } else {

                    const currentElement = document.createElement(bookElementTags[element]);

                    currentElement.classList.add(bookElementClasses[element]);
                    currentElement.textContent = dataToRender[element][index];

                    container.appendChild(currentElement);

                }

        }

        container.appendChild(buttonContainer)
        bookCardsArray.push(container)

    }

    return bookCardsArray;

}

export { updateDOM }