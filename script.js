const testInput = document.querySelector('#test-input');
const resetButton = document.querySelector('#reset');
const timerText = document.querySelector('#timer');
const errorCounter = document.querySelector('#errors-count');
const wordCounter = document.querySelector('#words-count');
const SELECTPARAOPTION = document.querySelector('#select-para');
const PLACEPARA = document.querySelector('#para-text-box p');
let originalText = document.querySelector('.original-text p').innerHTML;

let interval = null;
let timer = [0, 0, 0];
let firstPress = false;
let errorsCount = 0;
let wordsCount = 0;

function spellCheck() {
    let textEntered = testInput.value; //.value accepts the text entered in textarea
    originalTextMatch = originalText.substring(0, textEntered.length);

    if(textEntered === originalText) {
        document.querySelector('.test-wrapper').style.borderColor = 'green';
        wordsCount++; // counts last word of the sentence
        stopTimer();
        displayErrors();
        displayWordsCount();
    } else if(textEntered === originalTextMatch) {
        document.querySelector('.test-wrapper').style.borderColor = 'blue';
        if(event.keyCode === 32) { // counts words when space is pressed
            wordsCount++;
            displayWordsCount();
        }
    } else {
        document.querySelector('.test-wrapper').style.borderColor = 'orange';
        if(event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 38 && event.keyCode != 39 && event.keyCode != 40) {
            errorsCount++; // error is counted when made and not when erased with backspace
            displayErrors();
            displayWordsCount();
        }
    }
}

function start() {
    if(firstPress === false) {
        firstPress = true;
        interval = setInterval(runTimer, 10);
    }
}

function runTimer() {
    ++timer[2];
    timerText.innerHTML = `0${timer[0]}:0${timer[1]}:${timer[2]}`;
    if(timer[2] === 100) {
        ++timer[1];
        timer[2] = 0;
        timerText.innerHTML = `0${timer[0]}:0${timer[1]}:${timer[2]}`;
    } if(timer[1] === 60) {
        ++timer[0];
        timer[1] = 0;
        timerText.innerHTML = `0${timer[0]}:0${timer[1]}:${timer[2]}`;
    }
}

function stopTimer() {
    clearInterval(interval);
}

function reset() {
    clearInterval(interval);
    interval = null;

    testInput.value = '';
    firstPress = false;

    timer = [0, 0, 0];
    timerText.innerHTML = '00:00:00';
    errorsCount = 0;
    errorCounter.innerHTML = 0; 
    errorCounter.style.color = 'green'; 
    wordsCount = 0;
    wordCounter.innerHTML = 0;
    wordCounter.style.color = 'black';
}

function displayErrors() {
    errorCounter.innerHTML = errorsCount;
    if (errorsCount>0) {
        errorCounter.style.color = 'orangered'; 
    } 
}

function displayWordsCount() {
    let totalTime = timer[0] + timer[1]/60;
    let wordsPerMin = Math.floor(wordsCount/totalTime);
    wordCounter.innerHTML = wordsPerMin;

    if(wordsPerMin <= 25) {
        wordCounter.style.color = 'orangered';
    } else if(wordsPerMin >50) {
        wordCounter.style.color = 'green';
    } else {
        wordCounter.style.color = '#ccbe3b';
    }
}

function selectPara() {
    let paraValueHolder = {
        intoductoryParagragh : 'This is a typing test. Your goal is to duplicate the provided text, EXACTLY, in the field below. The timer starts when you start typing, and only stops when you match this text exactly. Good Luck!',
        recentEmergence : 'The recent emergence of several competitive typing websites has allowed several fast typists on computer keyboards to emerge along with new records, though these are unverifiable for the most part.',
        touchTypists : 'Many touch typists also use keyboard shortcuts or hotkeys when typing on a computer. This allows them to edit their document without having to take their hands off the keyboard to use a mouse.',
        frankEdward : 'Frank Edward McGurrin, a court stenographer from Salt Lake City, Utah who taught typing classes, reportedly invented touch typing in 1888.',
        twoMembers : 'Two members of the 1984 class of Jefferson High School are chairing a group of 18 to look for a resort for the 20-year class reunion. A lovely place 78 miles from the city turns out to be the best. It has 254 rooms and a banquet hall to seat 378. It has been open 365 days per year since opening on May 30, 1926.'
    }

    let paraValue = SELECTPARAOPTION.value;
    PLACEPARA.innerHTML = paraValueHolder[paraValue];

    originalText = document.querySelector('.original-text p').innerHTML;
}

SELECTPARAOPTION.addEventListener('change', selectPara);
testInput.addEventListener('keyup', spellCheck, false);
testInput.addEventListener('keypress', start, false);
resetButton.addEventListener('click', reset);