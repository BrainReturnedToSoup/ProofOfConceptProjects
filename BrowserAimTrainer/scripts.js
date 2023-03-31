const centerDot = document.querySelector('.centerDot');
const middleRing = document.querySelector('.middleRing');
const outerRing = document.querySelector('.outerRing');
const targetContainer = document.querySelector('.targetContainer');
const targetArea = document.querySelector('.targetArea');
const scoreboardContainer = document.querySelector('.scoreboardContainer');
const scoreBox = document.querySelector('.score');
const accuracyBox = document.querySelector('.accuracy');
const timerBox = document.querySelector('.timer');

console.log(centerDot);

let accuracyValues = [];
let scoreValue = 0

const accuracyCalc = (accuracy) => {
    accuracyValues.push(accuracy);
    let SumAccuracyValues = accuracyValues.reduce( (accumulator, currentValue) => {
        accumulator + currentValue;
    });
    let avgAccuracy = SumAccuracyValues/accuracyValues.length;
    return accuracyBox.innerText = `Accuracy: ${avgAccuracy}%`;
}

const scoreCalc = () => {
    scoreValue++;
    scoreBox.innerText = `Score: ${scoreValue}`;
}

let timeLeft = 30;
let onClick;
let intervalFunction;

const onStart = (event) => {
    if(onClick !== undefined) return;
    onClick = (arg) => {

        let elementClicked = arg.target;
        console.log(elementClicked);
        console.log(centerDot);
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
    document.addEventListener('click', (e) => {
        onClick(e);
    })
    intervalFunction = setInterval(minusOneSecond, 1000);
    
}

const minusOneSecond = () => {
    timerBox.innerText = `Timer: ${timeLeft} seconds left`;
    if(timeLeft === 0) {
        return clearInterval(intervalFunction);
    }
    timeLeft--;
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}


const moveTheTarget = () => {
    targetContainer.style.top = getRandomInt(600) + 'px';
    targetContainer.style.left = getRandomInt(600) + 'px';
}

document.addEventListener('click', (e) => {
    onStart(e);
});



