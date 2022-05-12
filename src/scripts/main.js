
const listOptions = ['scissors', 'spock', 'lizard', 'paper', 'rock'];
const hands = document.querySelector('.choose-hand');
const pentagon = document.querySelector('.pentagon');
const contest = document.querySelector('.contest')
const myPick = document.querySelector('#my-pick');
const myPickImage = document.querySelector('#my-pick-image');
const housePick = document.querySelector('#house-pick');
const housePickImage = document.querySelector('#house-pick-image');

const win = "YOU WIN";;
const lose = "YOU LOSE";
const draw = "It's a Draw";
const textResult = document.querySelector('#text-result');
const score = document.querySelector('#score');

const schemeRules = {
    spock: ['scissors', 'rock'],
    scissors: ['paper', 'lizard'],
    paper: ['rock', 'spock'],
    rock: ['scissors', 'lizard'],
    lizard: ['spock', 'paper'],
}

let points = 0;

const setLocalStorage = () => {
    if (localStorage.myPoints) {
        points = parseInt(localStorage.getItem("myPoints"));
    } else {
        localStorage.setItem('myPoints', points);
    }
    score.innerHTML = points;
}

setLocalStorage();

const handlePick = (e) => {

    const houseRandom = listOptions[getRandomInt(listOptions.length)];

    const attribute = e.currentTarget.getAttribute("data-hand-type");

    handleImages(attribute, houseRandom)

    handleStyle(attribute, houseRandom);

    const validate = schemeRules[attribute].includes(houseRandom);
    const isDraw = houseRandom === attribute;

    validateContest(validate, isDraw);
}

const getRandomInt = (max) => Math.floor(Math.random() * max);

const handleImages = (attribute, houseRandom) => {
    myPickImage.src = `/src/images/icon-${attribute}.svg`;
    myPickImage.alt = `${attribute}`

    housePickImage.src = `/src/images/icon-${houseRandom}.svg`;
    housePickImage.alt = `${houseRandom}`
}

const handleStyle = (attribute, houseRandom) => {
    myPick.classList.add(attribute);
    housePick.classList.add(houseRandom);
    contest.classList.remove('hidden');
    contest.classList.add('visible');
    pentagon.classList.add('hidden');
    hands.classList.add('hidden');
}

const validateContest = (validate, isDraw) => {
    if (validate) {
        textResult.innerHTML = win;
        points++;
        calcPoints();
    } else if (isDraw) {
        textResult.innerHTML = draw;
    } else {
        textResult.innerHTML = lose;
        points--;
        calcPoints();
    }
}

const calcPoints = () => {
    localStorage.setItem('myPoints', points);
    points = parseInt(localStorage.getItem("myPoints"));
    score.innerHTML = points;
}



