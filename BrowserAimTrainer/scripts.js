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

// ^^^initializing all element references that I will use in order to create the web app

let accuracyValues = [];
let scoreValue = 0;
let timeLeft = 30;
let onClick;
let intervalFunction;

// ^^^initializing all variables that will change based on user input or a timer
// accuracyValues will hold an array of the accuracy values of each click
// scoreValue will keep track of current score of user
// onClick will store the function that will calculate the accuracy value and score on each click, along with changing the targets location
// intervalFunction will store essentially the timer, calling a function to decrement the value of timeLeft by one on each interval

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

const moveTheTarget = () => {
    if(timeLeft === 0) return;
    targetContainer.style.top = getRandomInt(325) + 'px';
    targetContainer.style.left = getRandomInt(700) + 'px';
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const gameOver = () => {
    targetContainer.style.top = "0px";
    targetContainer.style.left = "0px";
    storedTarget = targetContainer.children[0];
    targetContainer.children[0].remove();
        title.innerText = 'Refresh to try again!';
}

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

document.addEventListener('click', (e) => {
    onStart(e); 
});

