
const listOptions = ['scissors', 'spock', 'lizard', 'paper', 'rock'];
const hands = document.querySelector('.choose-hand');
const pentagon = document.querySelector('.pentagon');
const contest = document.querySelector('.contest')
const myPick = document.querySelector('#my-pick');
const myPickImage = document.querySelector('#my-pick-image');
const housePick = document.querySelector('#house-pick');
const housePickImage = document.querySelector('#house-pick-image');
const playAgain = document.querySelector('#play-again');

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
    score.innerText = points;
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

    setTimeout(() => {
        housePickImage.src = `/src/images/icon-${houseRandom}.svg`;
        housePickImage.alt = `${houseRandom}`
    }, 1500);

}

const handleStyle = (attribute, houseRandom) => {
    myPick.classList.add(attribute);
    setTimeout(() => {
        housePick.classList.add(houseRandom);
        housePick.classList.remove('dark-circle');
    }, 1500);

    contest.classList.remove('hidden');
    contest.classList.add('visible');
    pentagon.classList.add('hidden');
    hands.classList.add('hidden');
}

const validateContest = (validate, isDraw) => {

    setTimeout(() => {
        playAgain.classList.remove('pick-container--none');
    }, 2500);

    if (validate) {
        textResult.innerText = win;
        points++;
        calcPoints();
        setTimeout(() => {
            myPick.classList.add('winner');
        }, 2500);
    } else if (isDraw) {
        textResult.innerText = draw;
    } else {
        textResult.innerText = lose;
        points--;
        calcPoints();
        setTimeout(() => {
            housePick.classList.add('winner');
        }, 2500);

    }
}

const calcPoints = () => {
    localStorage.setItem('myPoints', points);
    points = parseInt(localStorage.getItem("myPoints"));
    score.innerText = points;
}


const modal = document.querySelector("#myModal");

const rules = document.querySelector("#rules");

const close = document.querySelectorAll(".close")[0];

rules.onclick = function () {
    modal.style.display = "block";
}

close.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const handleReset = () => {
    const text = "Are you sure you want to reset the score ?";
    if (confirm(text) == true) {

        localStorage.clear();
        points = 0;
        score.innerText = points;
    }
}