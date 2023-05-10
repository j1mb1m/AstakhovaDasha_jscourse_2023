import Clock from "./Clock.js";
import { ClockViewSVG } from "./ClockViewSVG.js";
import { ClockViewDOM } from "./ClockViewDOM.js";
import { ClockViewCanvas } from "./ClockViewCanvas.js";

const pos = document.getElementById("solution1");
const btn = document.getElementById('showBtn');

btn.addEventListener('click', createClock);

function createClock() {
    let clockSize = document.getElementById("clockSize");
    let clock = new Clock(Number(clockSize.value));
    let clockViewSVG = new ClockViewSVG(clock);
    let clockViewDOM = new ClockViewDOM(clock);
    let clockViewCanvas = new ClockViewCanvas(clock);

    pos.appendChild(clockViewSVG.show());
    pos.appendChild(clockViewDOM.show());
    pos.appendChild(clockViewCanvas.show());

    clockViewSVG.run();
    clockViewDOM.run();
    clockViewCanvas.run();

    /*     clockViewSVG.stop();
        clockViewDOM.stop();  */


}


