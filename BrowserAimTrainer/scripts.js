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
const HTML = document.getElementsByTagName('html')

let accuracyValues = [];
let scoreValue = 0

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

const scoreCalc = () => {
    if(timeLeft === 0) {
        return;
    } else {
    scoreValue++;
    scoreBox.innerText = `Score: ${scoreValue}`;
    }
}

let timeLeft = 30;
let onClick;
let intervalFunction;

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
}
    document.addEventListener('click', (e) => {
        onClick(e);
    })
    intervalFunction = setInterval(minusOneSecond, 1000);
}  


const minusOneSecond = () => {
    timerBox.innerText = `Timer: ${timeLeft} seconds left`;
    if(timeLeft === 0) {
        clearInterval(intervalFunction);
        return gameOver();
    }
    timeLeft--;
}

const gameOver = () => {
    targetContainer.style.top = "0px";
    targetContainer.style.left = "0px";
    storedTarget = targetContainer.children[0];
    targetContainer.children[0].remove();
        title.innerText = 'Refresh to try again!';
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}


const moveTheTarget = () => {
    if(timeLeft === 0) return;
    targetContainer.style.top = getRandomInt(325) + 'px';
    targetContainer.style.left = getRandomInt(700) + 'px';
}

document.addEventListener('click', (e) => {
    onStart(e); 
})

