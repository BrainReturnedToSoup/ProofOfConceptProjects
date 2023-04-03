const buttonContainer = document.querySelector('.buttonContainer');

const arrayOfButtons = [{buttonLabel: ''}, {buttonLabel: 'CM'}, {buttonLabel: 'RM'}, {buttonLabel: 'M-'}, {buttonLabel: 'M+'}, {buttonLabel: '√'},
{buttonLabel: '7'}, {buttonLabel: '8'}, {buttonLabel: '9'}, {buttonLabel: '-'}, {buttonLabel: '%'}, {buttonLabel: '4'}, {buttonLabel: '5'},
{buttonLabel: '6'}, {buttonLabel: '÷'}, {buttonLabel: 'π'}, {buttonLabel: '1'}, {buttonLabel: '2'}, {buttonLabel: '3'}, {buttonLabel: 'x'},
{buttonLabel: 'C'}, {buttonLabel: '0'}, {buttonLabel: '.'}, {buttonLabel: '='}, {buttonLabel: '+'}]

const redLabels = [1, 2, 3, 4];
const blueLabels = [5, 9, 10, 14, 15, 19, 20, 23, 24];

const buttonContructor = (object) => {
    for (let i = 0; i < arrayOfButtons.length; i++) {

            let buttonBackground = document.createElement('div');

        if(i === 0) {
            buttonBackground.setAttribute('class', 'onAndOffBackground');
        } else {
            buttonBackground.setAttribute('class', 'buttonBackground');
        };

            let buttonLabel = document.createElement('button');

        if(i === 0) {
            buttonLabel.setAttribute('class', 'onAndOffButtonLabel')
        } else {
            buttonLabel.setAttribute('class', 'buttonLabel');
        };

        buttonLabel.classList.add(`${object.buttonLabel}`);

        if(redLabels.includes(i)){
            buttonLabel.classList.add('red')
        } else if(blueLabels.includes(i)) {
            buttonLabel.classList.add('blue')
        } else {
            buttonLabel.classList.add('black')
        };

            let buttonText = document.createElement('h4');
            buttonText.setAttribute('class', 'textLabel');
            buttonText.innerText = object[i].buttonLabel;
            buttonLabel.appendChild(buttonText);
            buttonBackground.appendChild(buttonLabel);
            buttonContainer.appendChild(buttonBackground);

    };

}

buttonContructor(arrayOfButtons);

document.addEventListener('mousedown', (e) => {

})