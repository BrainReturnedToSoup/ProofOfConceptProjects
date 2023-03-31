const centerDot = document.querySelector('.centerDot');
const middleRing = document.querySelector('.middleRing');
const outerRing = document.querySelector('.outerRing');
const targetContainer = document.querySelector('.targetContainer');
const targetArea = document.querySelector('.targetArea');
const scoreboardContainer = document.querySelector('.scoreboardContainer');
const scoreBox = document.querySelector('.score');
const accuracyBox = document.querySelector('.accuracy');
const timerBox = document.querySelector('.timer');
const title = document.querySelector('.title')

// ^^^initializing all element references that I will need in order to create the web app

let accuracyValues = [];
let scoreValue = 0;
let timeLeft = 30;
let onClick;
let intervalFunction;

// ^^^initializing all variables that will change based on user input or a timer
// accuracyValues will equal an array of the accuracy values of each click
// scoreValue will be equal to the current score of user
// onClick will store the function that will calculate the accuracy value of each click, decide whether a point will be added to the total score,
// along with changing the targets location
// intervalFunction will store the timer, which is just a setInterval method that calls the MinusOneSecond function every 1000ms or 1 second

const accuracyCalc = (accuracy) => {
    if(timeLeft === 0) return;
    accuracyValues.push(accuracy);
    let sumOfAccuracyValues = 0;
    accuracyValues.forEach( element => {
        sumOfAccuracyValues += element;
    })
    let avgAccuracy = (sumOfAccuracyValues/accuracyValues.length).toFixed(1);
    return accuracyBox.innerText = `Accuracy: ${avgAccuracy}%`;
}

// ^^^ accuracyCalc will first check to see if there is still time left.
// if so, accuracyCalc will take the accuracy argument and push it into the accuracyValues array.
// the average accuracy is calculated by taking the sum of all values within the accuracyValues array and
// dividing it by its length. avgAccuracy is equal to this calculated average to 1 decimal point.
// finally the innerText property of the element referenced in accuracyBox is set equal to `Accuracy: (the object literal of avgAccuracy)`
// Thus constantly updating the displayed accuracy value per click

const scoreCalc = () => {
    if(timeLeft === 0) {
        return;
    } else {
    scoreValue++;
    scoreBox.innerText = `Score: ${scoreValue}`;
    }
}

// ^^^ scoreCalc will first set the timerBox innerText property equal to `Timer: (the object literal of timeLeft)`.
// Then it will check to see if there is still time left. If so, the value of the variable scoreValue will increment by 1,
// along with the innerText property of scoreBox set equal to `Score: (the object literal of scoreValue)`
// Thus constantly updating the displayed score value per click

const minusOneSecond = () => {
    timerBox.innerText = `Timer: ${timeLeft} seconds left`;
    if(timeLeft === 0) {
        clearInterval(intervalFunction);
        return gameOver();
    }
    timeLeft--;
}

// ^^^ this is the callback function being used by intervalFunction in order to simulate a timer counting down per second
// First it will check to see if there is still time left. If not, it will stop the countdown by clearing intervalFunction,
// then it will return the execution of the gameOver function.
// If there is still time left, it will decrement the value of timeLeft by 1

const moveTheTarget = () => {
    if(timeLeft === 0) return;
    targetContainer.style.top = getRandomInt(325) + 'px';
    targetContainer.style.left = getRandomInt(700) + 'px';
}

// ^^^ this function is responsible for generating a new location for the target
// moveTheTarget will check to see if there is still time left. If so, new values for both the top and left property of the target
// container are generated using getRandomInt. The return on getRandomInt is concatenated to the 'px' strings in order to set the 
// properties equal to the numbers generated in pixels

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

// ^^^ generates and returns a random integer between 0 and the value of the inputed argument

const gameOver = () => {
    targetContainer.children[0].remove();
        title.innerText = 'Refresh to try again!';
}

// ^^^ this is the function called when there is no time left in the game
// All children of the element referenced with the variable targetContainer are deleted, thus deleting the target
// the innerText property of the title is changed to 'Refresh to try again!' to let the user
// know that if they want to start over they will need to refresh the browser

const onStart = (event) => {
    if(onClick !== undefined) { 
        return;
    } else {
        onClick = (arg) => {

        let elementClicked = arg.target;

        if(elementClicked === centerDot) {
            moveTheTarget();
            accuracyCalc(100);
            scoreCalc();
        } else if(elementClicked === middleRing) {
            moveTheTarget();
            accuracyCalc(75);
            scoreCalc();
        } else if(elementClicked === outerRing) {
            moveTheTarget();
            accuracyCalc(50);
            scoreCalc();
        } else if(elementClicked === targetArea) {
            moveTheTarget();
            accuracyCalc(0);
        } else {
            return;
        };
    
    }
};
    document.addEventListener('click', (e) => {
        onClick(e);
    });

    intervalFunction = setInterval(minusOneSecond, 1000);

};  

// ^^^ this is the function that is called when you start the game by clicking the target
// the function check to see if the variable onClick is defined. If not, onClick will be set 
// equal to the function resposible for interpreting and responding based on which element was clicked, whether it be
// the target or not. After the variable onClick is set equal to this function, an event listener is initialized on the 
// entire document, listening for any click events and thus invoking the onClick function with the event object as the 
// argument on each click it registers. The variable intervalFunction is set equal to the method setInterval 
// where the function minusOneSecond is called on 1000ms intervals, creating the timer

// ^^^ <<onClick function explanation>>
// the onClick function takes in an argument, that being the event object returned by the event listener.
// the variable elementClicked is set equal to what its name entails by means of pulling the value of the 
// target property within the event object. elementClicked is then taken through a series of if else statements
// used to compare the the element that was clicked to a reference from the DOM.
// for instance, if the element clicked is the element of the center dot of the target, specific functions will be called
// in order to facilitate the score, accuracy of the click, and to move the target to a different random location.
// 
// <<Note>> accuracy values are a little bit arbitrary, I say this because the center dot represents 100% accuracy
// but say the middle ring of the target represents 75% accuracy, and the outer ring represents 50% accuracy.
// It works, but I basically came up with the values of accuracy to represent different parts of the target
// Just know that 100% accuracy means you clicked the center of the target everytime and not clicking on the target is 0% accuracy.

document.addEventListener('click', (e) => {
    onStart(e); 
});

// ^^^ adds an event listener that will listen for the first click on or off the target
// that starts the game.

