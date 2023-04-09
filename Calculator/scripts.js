const output = [];

const elementsObj = {};
const buttonActions = {
    'percent': () => {

    },
    'sqrt': () => {

    },
    'clear': () => {

    },
    'backspace': () => {

    },
    'add': () => {

    },
    'subtract': () => {

    },
    'multiply': () => {

    },
    'divide': () => {

    },
    'seven': () => {

    },
    'eight': () => {

    },
    'nine': () => {

    },
    'decimal': () => {

    },
    'four': () => {

    },
    'five': () => {

    },
    'six': () => {

    },
    'zero': () => {

    },
    'one': () => {

    },
    'two': () => {

    },
    'three': () => {

    },
    'equal': () => {

    }
}

document.querySelectorAll('button').forEach( element => {
    elementsObj[`${element.getAttribute('data-id')}`] = element;
})

document.querySelector('.buttonContainer').addEventListener('click', (e) => {
    const dataId = e.target.getAttribute('data-id');
    buttonActions[dataId]();
})


