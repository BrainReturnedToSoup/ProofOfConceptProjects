const elementsObj = {};

document.querySelectorAll('button').forEach( element => {
    elementsObj[`${element.getAttribute('data-id')}`] = element;
})

document.querySelector('.buttonContainer').addEventListener('click', whichButton(e))

function whichButton(event) {
    const dataId = event.target.getAttribute('data-id');
    if(dataId != undefined) {
        switch(dataId) {
            case 'percent':

            case 'sqrt':

            case 'clear':

            case 'backspace':

            case 'add':

            case 'subtract':

            case 'multiply':

            case 'divide':

            case 'seven':

            case 'eigth':

            case 'nine':

            case 'decimal':

            case 'four':

            case 'five':

            case 'six':

            case 'zero':

            case 'one':

            case 'two':

            case 'three':

            case 'equal':
        }
    } else {
        return;
    }
}
