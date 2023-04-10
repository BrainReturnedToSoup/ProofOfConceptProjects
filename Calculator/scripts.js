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
        if(this.display.length != undefined) {
            this.memoryDisplay += this.display + ' ^ ';
            this.display = '';
            this.history += ' ** ';
            }
    }

    [methodNames[1]]() {
        //sqrt
        const memoryArray = this.memoryDisplay.split('');
        if (this.display.length !== 0 && this.checkForOperators(memoryArray[memoryArray.length-1])) {
            const sqrtValue = Math.sqrt(parseFloat(this.display));
            this.display = sqrtValue.toString();
            this.memoryDisplay += this.display;
            this.history += this.display};
        
    }

    [methodNames[2]]() {
        //clear
        this.memoryDisplay = '';
        this.display = '';
        this.history = '';
    }

    [methodNames[3]]() {
        //backspace
        if(this.display.length != undefined) {
        this.display = this.display.substring(0, this.display.length - 1)
        this.history = this.history.substring(0, this.display.length - 1)
        } else {
            return;
        }
    }

    [methodNames[4]]() {
        //add
        if(this.display.length != undefined) {
        this.memoryDisplay += this.display + ' + '
        this.display = '';
        this.history += ' + ';
        }
    }

    [methodNames[5]]() {
        //subtract
        if(this.display.length != undefined) {
        this.memoryDisplay += this.display + ' - ';
        this.display = '';
        this.history += ' - ';
        }
    }

    [methodNames[6]]() {
        //multiply
        if(this.display.length != undefined) {
        this.memoryDisplay += this.display + ' * ';
        this.display = '';
        this.history += ' * ';
        }
    }

    [methodNames[7]]() {
        //divide
        if(this.display.length != undefined) {
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
        const displayArray = this.display.split(' ')
        if(this.display.length !== 0 && this.checkForOperators(displayArray) === false) {
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
        const historyArray = this.history.split(' ')
        if(this.checkForOperators(historyArray[historyArray.length - 1]) === false)  {
            this.memoryDisplay += this.display;
            this.finalCalculation();
        } else {
            return;
        }
    }

    finalCalculation() {
        this.display = eval(this.history).toFixed(2)
        this.displayToDOM()
        this.equals = true;
    }

    displayToDOM() {
        displayElement.textContent = this.display;
        memoryElement.textContent = this.memoryDisplay;
    }

    checkForOperators(element) {
        const operators = ['sqrt',' + ',' - ',' * ',' / ',' ** ', '.']
        return operators.includes(element)
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


