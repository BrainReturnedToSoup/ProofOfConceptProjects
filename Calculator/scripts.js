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

}

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

    }

}

fetchButtonFile().then(() => {
    buttonMaker(buttons);
});


document.addEventListener('mousedown', (e) => {

})