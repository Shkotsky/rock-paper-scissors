const circle = document.querySelectorAll('.circle');
const hands = document.querySelector('.choose-hand');
const pentagon = document.querySelector('.pentagon');
const contest = document.querySelector('.contest')
const circleWrapper = document.querySelector('.circle-wrapper')
const listOptions = ['scissors', 'spock', 'lizard', 'paper', 'rock'];
const myPick = document.querySelector('#my-pick');
const myPickImage = document.querySelector('#my-pick-image');
const housePick = document.querySelector('#house-pick');
const housePickImage = document.querySelector('#house-pick-image');

const picking = (el) => {



    const botPick = listOptions[getRandomInt(listOptions.length)];

    console.log(botPick);
    let attribute = el.currentTarget.getAttribute("data-hand-type");

    myPick.classList.add(attribute);
    myPickImage.src = `/src/images/icon-${attribute}.svg`;
    myPickImage.alt = `${attribute}`

    housePick.classList.add(botPick);
    housePickImage.src = `/src/images/icon-${botPick}.svg`;
    housePickImage.alt = `${botPick}`
    contest.classList.remove('hidden');
    contest.classList.add('visible');
    pentagon.classList.add('hidden');
    hands.classList.add('hidden');



    


}

const getRandomInt = (max) => Math.floor(Math.random() * max);


