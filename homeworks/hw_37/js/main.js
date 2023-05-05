const pos = document.getElementById("homework1");

function createClock(){
    const clockSize = document.getElementById("clockSize");
    const newClock = new Clock(Number(clockSize.value));
    pos.appendChild(newClock.getDial());  
}

