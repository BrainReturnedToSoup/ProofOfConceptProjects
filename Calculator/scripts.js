const methodNames= new Array();
document.querySelectorAll('button').forEach(element => {
    methodNames.push(element.getAttribute('data-id'));
})

class Calculator {
    calculationsObject() {
        this.currentValue = new String('');
        this.history = new Array();
    }

    [methodNames[0]]() {
        //percent
    }

    [methodNames[1]]() {
        //sqrt
    }

    [methodNames[2]]() {
        //clear
    }

    [methodNames[3]]() {
        //backspace
    }

    [methodNames[4]]() {
        //add
    }

    [methodNames[5]]() {
        //subtract
    }

    [methodNames[6]]() {
        //multiply
    }

    [methodNames[7]]() {
        //divide
    }

    [methodNames[8]]() {
        //seven
    }

    [methodNames[9]]() {
        //eight
    }

    [methodNames[10]]() {
        //nine
    }

    [methodNames[11]]() {
        //decimal
    }

    [methodNames[12]]() {
        //four
    }

    [methodNames[13]]() {
        //five
    }

    [methodNames[14]]() {
        //six
    }

    [methodNames[15]]() {
        //zero
    }

    [methodNames[16]]() {
        //one
    }

    [methodNames[17]]() {
        //two
    }

    [methodNames[18]]() {
        //three
    }

    [methodNames[19]]() {
        //equal
    }

    displayToDOM() {

    }
    
}


document.querySelector('.buttonContainer').addEventListener('click', (e) => {
    const dataId = e.target.getAttribute('data-id');
    buttonActions[dataId]();
})


