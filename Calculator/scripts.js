let buttons = [];
let redButtonIndex = [];
let blueButtonIndex = [];

const buttonContainer = document.querySelector('.buttonContainer');

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
        } else {
            buttonBackground.classList.add('buttonBackground');
            button.classList.add('buttonLabel');
        }

        redButtonIndex.includes(i) ? button.classList.add('red') : blueButtonIndex.includes(i) ? button.classList.add('blue') : button.classList.add('black');

        textOnButton.classList.add('textLabel');
        textOnButton.innerText = array[i];


        button.appendChild(textOnButton);
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

let onOrOffValue = 0;
let outputValue;

const calculatorFunctions = {
    "CM": cmFunction,
    "RM": rmFunction,
    "M-": mMinusFunction,
    "M+": mPlusFunction,
    "√": sqrtFunction,
    "7": sevenFunction,
    "8": eightFunction,
    "9": nineFunction,
    "-": minusFunction,
    "%": percentFunction,
    "4": fourFunction,
    "5": fiveFunction,
    "6": sixFunction,
    "÷": divideFunction,
    "π": piFunction,
    "1": oneFunction,
    "2": twoFunction,
    "3": threeFunction,
    "x": multiplyFunction,
    "C": clearFunction,
    "0": zeroFunction,
    ".": decimalFunction,
    "=": equalFunction,
    "+": addFunction
}

const calculatorOnOrOff = (event) => {
    
    if(onOrOffValue === 0) {
        return output.innerText = '';
    } else {
        calculatorLogic(event);
    };

};


const calculatorLogic = (event) => {

}

const add = () => {

}

const subtract = () => {

}

const multiply = () => {

}

const divide = () => {

}

const equals = () => {

}

const sqrt = () => {

}

const clear = () => {

}

const percent = () => {

}

onOrOffButton.addEventListener('click', () => {
    if(onOrOffValue === 0) {
        onOrOffValue += 1;
        console.log(onOrOffValue)
    } else {
        onOrOffValue -=1;
        console.log(onOrOffValue)
    };
});

bottomStructureBlock.addEventListener('click', (e) => {
    calculatorOnOrOff(e);
});

}