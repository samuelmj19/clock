let microSec = 0;
let seconds = 0;
let minutes = 0;
let running;

const microSecDisplay = document.querySelector('#microSecondsChr');
const secondsDisplay = document.querySelector('#secondsChr');
const minutesDisplay = document.querySelector('#minutesChr');
const chronometerSection = document.querySelector('.chronometer-section');
const timerSection = document.querySelector('.timer-section');



// ---------------- Chronometer ----------------

function playChronometer(){
    if (running == undefined){
        running = setInterval(chronometerCounter, 10)
    }else{
        running = clearInterval(running);
    }
}
function resetChronometer(){
    clearInterval(running);
    running = undefined
    microSec = 0;
    seconds = 0;
    minutes = 0;
    microSecDisplay.textContent = formatValues(microSec);
    secondsDisplay.textContent = formatValues(seconds);
    minutesDisplay.textContent = formatValues(minutes);
}


function chronometerCounter(){
    if(microSec == 99){
        seconds++;
        microSec = 0;
        if(seconds == 60){
            minutes++;
            seconds = 0;
        }
    }else{
        microSec++;
    };
    
    microSecDisplay.textContent = formatValues(microSec);
    secondsDisplay.textContent = formatValues(seconds);
    minutesDisplay.textContent = formatValues(minutes);

}

// -------------- timer ----------
const secondsSpan = document.querySelector('#secondsTimerS')
const minutesSpan = document.querySelector('#minutesTimerS')

const playBtn = document.getElementById('play/pauseBtn')
const resetBtn = document.getElementById('resetBtn')
const setBtn = document.getElementById('setBtn')


const startTimer=()=>{
    
    event.preventDefault();
    
    let minutesInput = parseInt(event.target.minutesInput.value)|| "00";
    let secondsInput = parseInt(event.target.secondsInput.value)|| "00";
    
    secondsSpan.textContent = secondsInput;
    minutesSpan.textContent = minutesInput;
    console.log(minutesInput)
    running =undefined;
    function setTimer(){
        setBtn.disabled = true
        if (running == undefined){
            running = setInterval(()=>{
                    if(secondsInput == 0 && minutesInput == 0){
                        console.log('se acabo')
                        running = clearInterval(running)
                    }
                    else if(secondsInput == 0){
                        minutesInput -= 1;
                        secondsInput = 59
                    }else{
                        secondsInput -= 1;
                    }
                    secondsSpan.textContent = formatValues(secondsInput);
                    minutesSpan.textContent = minutesInput;
                    
                } ,1000)
        }else{
           clearInterval(running);
        }
    }
    
    function playTimer(){
        if(running == undefined){
            setTimer();
        }else{
            clearInterval(running);
            running = undefined;
        }
    }
   
    playBtn.addEventListener('click', playTimer)
}
resetBtn.addEventListener('click', resetTimer)
function resetTimer(){
    clearInterval(running);
    running = undefined
    secondsInput = "00";
    minutesInput = "00";
    secondsSpan.textContent = "00";
    minutesSpan.textContent = "00";
    setBtn.disabled = false
}
// ------- utils -------

function formatValues(value){
    return ("0" + value).slice(-2);
}



// -------navigation-------



function showChronometer(){
    chronometerSection.style.display = 'flex';
    timerSection.style.display = 'none';
}
function showTimer(){
    chronometerSection.style.display = 'none';
    timerSection.style.display = 'flex';
}