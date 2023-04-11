const methodNames = new Array();
document.querySelectorAll('button').forEach(element => {
    methodNames.push(element.getAttribute('data-id'));
})

class Calculator {
    constructor() {
        this.display = ''
        this.memoryDisplay = ''
        this.history = ''
        this.equals = false;
    }

    [methodNames[0]]() {
        //power
        if(this.checkForOperators() === false) {
            this.memoryDisplay += this.display + ' ^ ';
            this.display = '';
            this.history += ' ** ';
            }
    }

    [methodNames[1]]() {
        // sqrt
         const memoryArray = this.memoryDisplay.split('');
            if (this.display.length !== 0) {
            const sqrtValue = Math.sqrt(parseFloat(this.display)).toFixed(6);
            this.display = sqrtValue.toString();
            this.memoryDisplay += 'sqrt(' + this.display + ')';
            this.history += 'sqrt(' + this.display + ')';
            }
    }

    [methodNames[2]]() {
        //clear
        this.memoryDisplay = '';
        this.display = '';
        this.history = '';
    }

    [methodNames[3]]() {
        //backspace
        if(this.display.split('').length !== undefined) {
        this.display = this.display.substring(0, this.display.length - 1)
        this.history = this.history.substring(0, this.display.length - 1)
        } else {
            return;
        }
    }

    [methodNames[4]]() {
        //add
        const historyArray = this.history.split('')
        if(this.checkForOperators() === false) {
        this.memoryDisplay += this.display + ' + '
        this.display = '';
        this.history += ' + ';
        }
    }

    [methodNames[5]]() {
        //subtract
        const historyArray = this.history.split('')
        if(this.checkForOperators() === false) {
        this.memoryDisplay += this.display + ' - ';
        this.display = '';
        this.history += ' - ';
        }
    }

    [methodNames[6]]() {
        //multiply
        const historyArray = this.history.split('')
        if(this.checkForOperators() === false) {
        this.memoryDisplay += this.display + ' * ';
        this.display = '';
        this.history += ' * ';
        }
    }

    [methodNames[7]]() {
        //divide
        const historyArray = this.history.split('')
        if(this.checkForOperators() === false) {
        this.memoryDisplay += this.display + ' ÷ ';
        this.display = '';
        this.history += ' / ';
        }
    }

    [methodNames[8]]() {
        //seven
        this.display += '7';
        this.history += '7';
    }

    [methodNames[9]]() {
        //eight
        this.display += '8';
        this.history += '8';
    }

    [methodNames[10]]() {
        //nine
        this.display += '9';
        this.history += '9';
    }

    [methodNames[11]]() {
        //decimal
        if(this.display.includes('.')) {
            return;
        }

        const displayArray = this.display.split(' ')
        
        if(this.display.length !== 0) {
        this.display += '.';
        this.history += '.';
        } else {
            return;
        }
    }

    [methodNames[12]]() {
        //four
        this.display += '4';
        this.history += '4';
    }

    [methodNames[13]]() {
        //five
        this.display += '5';
        this.history += '5';
    }

    [methodNames[14]]() {
        //six
        this.display += '6';
        this.history += '6';
    }

    [methodNames[15]]() {
        //zero
        this.display += '0';
        this.history += '0';
    }

    [methodNames[16]]() {
        //one
        this.display += '1';
        this.history += '1';
    }

    [methodNames[17]]() {
        //two
        this.display += '2';
        this.history += '2';
    }

    [methodNames[18]]() {
        //three
        this.display += '3';
        this.history += '3';
    }

    [methodNames[19]]() {
        //equal
        if(this.checkForOperators())  {
            this.memoryDisplay += this.display;
            this.finalCalculation();
        } else {
            return;
        }
    }

    finalCalculation() {
        const output = eval(this.history);
        if (output.toString().length > 14) {
            this.display = output.toExponential(8);
        } else {
            this.display = output;
        }
        this.displayToDOM();
        this.equals = true;
    }
    
    displayToDOM() {
        if (this.display.toString().length > 14) {
            displayElement.textContent = parseFloat(this.display).toExponential(8);
            memoryElement.textContent = parseFloat(this.memoryDisplay).toExponential(4);
        } else {
            displayElement.textContent = this.display;
            memoryElement.textContent = this.memoryDisplay;
        }
    }

    checkForOperators() {
        const operators = ['+', '-', '*', '/', '**'];
        const historyArray = this.history.split(' ');
        
        if (historyArray.length < 2) {
          return false; // not enough values in history to check for operators
        }
        
        const lastValue = historyArray[historyArray.length - 1];
        const secondLastValue = historyArray[historyArray.length - 2];
        
        return operators.includes(lastValue) || operators.includes(secondLastValue);
      }


}

const displayElement = document.querySelector('.output')
const memoryElement = document.querySelector('.memory')

const calculatorObj = new Calculator();

document.querySelector('.buttonContainer').addEventListener('click', (e) => {
    const dataId = e.target.getAttribute('data-id');
    if(dataId != undefined) {
        if(calculatorObj.equals === false) {
        calculatorObj[dataId]()
        calculatorObj.displayToDOM();
        } else {
        calculatorObj.history = '';
        calculatorObj.memoryDisplay = '';
        calculatorObj.display = '';
        calculatorObj.equals = false;
        calculatorObj[dataId]();
        calculatorObj.displayToDOM();    
        }
    }
});


