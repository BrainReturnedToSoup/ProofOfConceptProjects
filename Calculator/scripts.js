const buttonIDs = Array.from(document.querySelectorAll('button')).map(element => element.getAttribute('data-id'));

class Calculator {
    constructor() {
        this.display = '';
        this.memory = '';
        this.lastButton = '';
        this.equals = false;
        this.sqrt = false;
    }

    [buttonIDs[0]]() {
        //power
        if(this.equals === false) {
            this.memory = eval(this.memory + this.display)
        }
        this.display = '**';
        this.lastButton = 'power';
        this.equals = false;
    }
    [buttonIDs[1]]() {
        //squareRoot
        if (this.equals === false && this.sqrt === false) {
            // If the equal button and button sqrt haven't been pressed within the context of display
            if (operatorSymbols.includes(this.display.split('').shift()) && this.display.split('').length > 1) {
                // If the first character of the display property is an operator and the display value is longer that 1, so not just an operator
                const operator = this.display[0];
                const displayValue = parseFloat(this.display.substring(1));
                this.display = eval(`${this.memory} ${operator} Math.sqrt(${displayValue})`);
                this.sqrt = true;

            } else {
                // If the first character isn't an operator, and cases of multiple operators in the display won't ever happen
                this.display = eval(this.display);
                this.memory = this.display;
                this.sqrt = true;

            }
            
        } else if(this.equals === true && this.sqrt === false) {
            //if equals has been pressed already and not reset along with sqrt not being pressed within the context of display
            this.display = eval(Math.sqrt(this.display));
            this.memory = this.display;
            this.equals = false;
            this.sqrt = true;

        }
    }

    [buttonIDs[2]]() {
        //clear
        this.display = '';
        this.memory = '';
        this.lastButton = '';
        this.equals = false;
        this.sqrt = false;
    }   
    [buttonIDs[3]]() {
        //backspace
        this.display = this.display.substring(0, this.display.length - 1);
        this.lastButton = this.display[this.display.length - 1];
    }
    [buttonIDs[4]]() {
        //add
        if(this.equals === false ) {
            this.memory = eval(this.memory + this.display)
        }
        this.display = '+';
        this.lastButton = '+';
        this.equals = false;
    }
    [buttonIDs[5]]() {
        //subtract
        if(this.equals === false) {
            this.memory = eval(this.memory + this.display)
        }
        this.display = '-';
        this.lastButton = '-';
        this.equals = false;
    }
    [buttonIDs[6]]() {
        //multiply
        if(this.equals === false) {
            this.memory = eval(this.memory + this.display)
        }
        this.display = '*';
        this.lastButton = '*';
        this.equals = false;
    }
    [buttonIDs[7]]() {
        //divide
        if(this.equals === false) {
            this.memory = eval(this.memory + this.display)
        }
        this.display = '/';
        this.lastButton = '/';
        this.equals = false;
    }
    [buttonIDs[8]]() {
        //seven
        if(this.equals === true) {
            return;
        } 
        this.display += '7';
        this.lastButton = 'seven';
        this.equals = false;
    }
    [buttonIDs[9]]() {
        //eight
        if(this.equals === true) {
            return;
        } 
        this.display += '8';
        this.lastButton = 'eight';
        this.equals = false;
    }
    [buttonIDs[10]]() {
        //nine
        if(this.equals === true) {
            return;
        } 
        this.display += '9';
        this.lastButton = 'nine';
        this.equals = false;
    }
    [buttonIDs[11]]() {
        //decimal
        if(this.equals === true || this.display.split('').includes('.')) {
            return;
        }
        this.display += '.';
        this.lastButton = 'decimal';
        this.equals = false;
    }
    [buttonIDs[12]]() {
        //four
        if(this.equals === true) {
            return;
        } 
        this.display += '4';
        this.lastButton = 'four';
        this.equals = false;
    }
    [buttonIDs[13]]() {
        //five
        if(this.equals === true) {
            return;
        } 
        this.display += '5';
        this.lastButton = 'five';
        this.equals = false;
    }
    [buttonIDs[14]]() {
        //six
        if(this.equals === true) {
            return;
        } 
        this.display += '6';
        this.lastButton = 'six';
        this.equals = false;
    }
    [buttonIDs[15]]() {
        //zero
        if(this.equals === true) {
            return;
        } 
        this.display += '0';
        this.lastButton = 'zero';
        this.equals = false;
    }
    [buttonIDs[16]]() {
        //one
        if(this.equals === true) {
            return;
        } 
        this.display += '1';
        this.lastButton = 'one';
        this.equals = false;
    }
    [buttonIDs[17]]() {
        //two
        if(this.equals === true) {
            return;
        } 
        this.display += '2';
        this.lastButton = 'two';
        this.equals = false;
    }
    [buttonIDs[18]]() {
        //three
        if(this.equals === true) {
            return;
        } 
        this.display += '3';
        this.lastButton = 'three';
        this.equals = false;
    }
    [buttonIDs[19]]() {
        //equal
        if(this.equals === true || this.sqrt === true || this.display[0] === undefined) {
            return;
        } else {
        const addToMemory = this.display;
        this.display = eval(this.memory + this.display);
        this.memory = eval(this.memory + addToMemory);
        this.equals = true;
        this.sqrt = false;
        }
    }
}

const numberButtons = Array.from(document.querySelectorAll('.number')).map(element => element.getAttribute('data-id'));
const operatorButtons = Array.from(document.querySelectorAll('.operator')).map(element => element.getAttribute('data-id'));
const operatorSymbols = ['0','1','2','3','4','5','6','7','8','9','+','-','/','*','**']

console.log(buttonIDs);
console.log(numberButtons);
console.log(operatorButtons);

function handleClick(event) {
    //grabs the data-id property of the button clicked in order to determine which button was clicked
    const dataID = event.target.getAttribute('data-id')
    if(numberButtons.includes(dataID)) {
        //handles number button being clicked, separated it from other buttons like clear, backspace, and equal just for structure
        CalculatorObj[dataID]();
        displayToDOM();

    } else if(operatorButtons.includes(dataID)) {
        //handles operator being clicked, if the last button inputed is an operator, then you wont be able to add another
        if(operatorButtons.includes(CalculatorObj.lastButton) || CalculatorObj.lastButton === '') {
            return;
        } else {
            CalculatorObj[dataID]();
            displayToDOM();
        }

    } else if(dataID === buttonIDs[11]) {
        //handles decimal point being clicked, if already present in the displayed value, then you wont be able to add another
        if(CalculatorObj.display.split('').includes(buttonIDs[11])) {
            return;
        } else {
            CalculatorObj[dataID]();
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