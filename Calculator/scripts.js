let buttons = [];
let redButtonIndex = [];
let blueButtonIndex = [];

const buttonContainer = document.querySelector('.buttonContainer');

let onAndOffFunction;
let specialClicked;
let numberBuilderClicked;
let operatorClicked;
let calculationConstructor;

async function fetchButtonFile() {

    const response = await fetch('./buttons.json');
    const data = await response.json(); 

    buttons = data.buttons;
    redButtonIndex = data.redButtonIndex;
    blueButtonIndex = data.blueButtonIndex;

};

const buttonMaker = (array) => {
    
    for(let i = 0; i < array.length; i++) {

        let buttonBackground = document.createElement('div');
        let button = document.createElement('button');
        let textOnButton = document.createElement('h4');

        button.setAttribute('id', `${array[i]}`);

        if(i === 0) {
            buttonBackground.classList.add('onAndOffBackground');
            button.classList.add('onAndOffButtonLabel');
            button.addEventListener('click', onAndOffFunction);
        } else {
            buttonBackground.classList.add('buttonBackground');
            button.classList.add('buttonLabel');
        }

        if(redButtonIndex.includes(i)) {
            button.classList.add('red');
            button.addEventListener('click', (e) => {
                specialClicked(e);
            });
        } else if(blueButtonIndex.includes(i)) {
            button.classList.add('blue');
            button.addEventListener('click', (e) => {
                operatorClicked(e);
            });
        } else {
            button.classList.add('black');
            button.addEventListener('click', (e) => {
                numberBuilderClicked(e);
            });
        }
 
        button.innerText = array[i];

        buttonBackground.appendChild(button);
        buttonContainer.appendChild(buttonBackground);

    };

};

fetchButtonFile().then(() => {
    buttonMaker(buttons);
    calculator();
});

const calculator = () => {

const bottomStructureBlock = document.querySelector('.bottomStructureBlock');
const onOrOffButton = document.querySelector('.onAndOffButtonLabel')
const output = document.querySelector('.output');

let onOrOff = 0;
let outputPercent = 0;

onAndOffFunction = () => {
    if(onOrOff === 0) {
        onOrOff++;
        console.log('on');
    } else {
        onOrOff--;
        console.log('off');
    }
};

let operationArray = [];

const calculationContructor = (array) => {
    console.log(array)
}

specialClicked = (event) => {
    
    if(onOrOff === 0) return;

    let idOfElement = event.target.id
        if(idOfElement === 'CM') {

        } else if(idOfElement === 'RM') {

        } else if(idOfElement === 'M-') {

        } else if(idOfElement === 'M+') {

        };
}

operatorClicked = (event) => {
        
    if(onOrOff === 0) return;

    let idOfElement = event.target.id;
        if(idOfElement === '√') {
            operationArray.push('Math.sqrt');
        } else if(idOfElement === '-') {
            operationArray.push('-');
        } else if(idOfElement === '%') {
            if(outputPercent === 0) {
                outputPercent++;
            } else {
                outputPercent--;
            }
        } else if(idOfElement === '÷') {
            operationArray.push('-');
        } else if(idOfElement === 'π') {
            operationArray.push('Math.PI');
        } else if(idOfElement === 'x') {
            operationArray.push('*');
        } else if(idOfElement === 'C') {
            operationArray = [];
        } else if(idOfElement === '=') {
            calculationConstructor(operationArray);
        } else if( idOfElement === '+') {
            operationArray.push('+');
        }
}

numberBuilderClicked = (event) => {
        
    if(onOrOff === 0) return;

    let idOfElement = event.target.id;
        if(idOfElement === '1') {
            operationArray.push('1');
        } else if(idOfElement === '2') {
            operationArray.push('2');
        } else if(idOfElement === '3') {
            operationArray.push('3');
        } else if(idOfElement === '4') {
            operationArray.push('4');
        } else if(idOfElement === '5') {
            operationArray.push('5');
        } else if(idOfElement === '6') {
            operationArray.push('6');
        } else if(idOfElement === '7') {
            operationArray.push('7');
        } else if(idOfElement === '8') {
            operationArray.push('8');
        } else if(idOfElement === '9') {
            operationArray.push('9');
        } else if(idOfElement === '.') {
            operationArray.push('.');
        }
    };

}
