const buttonIDs = Array.from(document.querySelectorAll('button')).map(element => element.getAttribute('data-id'));

class Calculator {
    constructor() {
        this.display = '';
        this.memory = '';
        this.lastButton = '';
    }

    [buttonIDs[0]]() {
        //power
        this.memory = parseInt(this.memory + this.display).toString();
        this.display = '**';
        this.lastButton = 'power';
    }
    [buttonIDs[1]]() {
        //squareRoot
        this.memory = parseInt(this.memory + this.display).toString();
        this.display = '';
        this.lastButton = '√';
    }
    [buttonIDs[2]]() {
        //clear
        this.display = '';
        this.memory = '';
        this.lastButton = '';
    }
    [buttonIDs[3]]() {
        //backspace
        this.display = this.display.substring(0, this.display.length - 1);
        this.lastButton = this.display[this.display.length - 1];
    }
    [buttonIDs[4]]() {
        //add
        this.memory = parseInt(this.memory + this.display).toString();
        this.display = '+';
        this.lastButton = '+';
    }
    [buttonIDs[5]]() {
        //subtract
        this.memory = parseInt(this.memory + this.display).toString();
        this.display = '-';
        this.lastButton = '-';
    }
    [buttonIDs[6]]() {
        //multiply
        this.memory = parseInt(this.memory + this.display).toString();
        this.display = '*';
        this.lastButton = '*';
    }
    [buttonIDs[7]]() {
        //divide
        this.memory = parseInt(this.memory + this.display).toString();
        this.display = '/';
        this.lastButton = '/';
    }
    [buttonIDs[8]]() {
        //seven
        this.display += '7';
        this.lastButton = 'seven';
    }
    [buttonIDs[9]]() {
        //eight
        this.display += '8';
        this.lastButton = 'eight';
    }
    [buttonIDs[10]]() {
        //nine
        this.display += '9';
        this.lastButton = 'nine';
    }
    [buttonIDs[11]]() {
        //decimal
        this.display += '.';
        this.lastButton = 'decimal';
    }
    [buttonIDs[12]]() {
        //four
        this.display += '4';
        this.lastButton = 'four';
    }
    [buttonIDs[13]]() {
        //five
        this.display += '5';
        this.lastButton = 'five';
    }
    [buttonIDs[14]]() {
        //six
        this.display += '6';
        this.lastButton = 'six';
    }
    [buttonIDs[15]]() {
        //zero
        this.display += '0';
        this.lastButton = 'zero';
    }
    [buttonIDs[16]]() {
        //one
        this.display += '9';
        this.lastButton = 'nine';
    }
    [buttonIDs[17]]() {
        //two
        this.display += '9';
        this.lastButton = 'nine';
    }
    [buttonIDs[18]]() {
        //three
        this.display += '9';
        this.lastButton = 'nine';
    }
    [buttonIDs[19]]() {
        //equal
        const total = this.memory + this.display;
        console.log(total)
        this.display = parseInt(total);
    }
}

const numberButtons = Array.from(document.querySelectorAll('.number')).map(element => element.getAttribute('data-id'));
const operatorButtons = Array.from(document.querySelectorAll('.operator')).map(element => element.getAttribute('data-id'));

console.log(buttonIDs);
console.log(numberButtons);
console.log(operatorButtons);

function handleClick(event) {
    //grabs the data-id property of the button clicked in order to determine which button was clicked
    const dataID = event.target.getAttribute('data-id')
    if(numberButtons.includes(dataID)) {
        //handles number button being clicked, separated it from other buttons like clear, backspace, and equal just for structure
        CalculatorObj[dataID]()
        displayToDOM();

    } else if(operatorButtons.includes(dataID)) {
        //handles operator being clicked, if the last button inputed is an operator, then you wont be able to add another
        if(operatorButtons.includes(CalculatorObj.lastButton) || CalculatorObj.lastButton === '') {
            return;
        } else {
            CalculatorObj[dataID]()
            displayToDOM();
        }

    } else if(dataID === buttonIDs[11]) {
        //handles decimal point being clicked, if already present in the displayed value, then you wont be able to add another
        if(CalculatorObj.display.split('').includes(buttonIDs[11])) {
            return;
        } else {
            CalculatorObj[dataID]()
            displayToDOM();
        }

    } else {
        //where all other buttons will fall under, since you always want to be able to activate backspace, clear, and equal when you want
        CalculatorObj[dataID]()
        displayToDOM();
    }
 

}

const outputBox = document.querySelector('.output');
const memoryBox = document.querySelector('.memory');

function displayToDOM() {
    outputBox.textContent = CalculatorObj.display;
    memoryBox.textContent = CalculatorObj.memory;
}

//create a calculator object that will be used to store the data that will be calculated and displayed
const CalculatorObj = new Calculator();

document.querySelector('.buttonContainer').addEventListener('click', e => handleClick(e))