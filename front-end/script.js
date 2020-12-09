const bodyDiv = document.getElementById('bodyDiv');
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
const cW = 900;
const cH = 400;
const barWidth = 100;
canvas.width = cW;
canvas.height = cH;

// Bar graph variables
let q1a = 0;
let q1b = 0;
let q1c = 0;   
let q1Total = 0;


let q2a = 0;
let q2b = 0;
let q2c = 0;
let q2Total = 0;

let q3a = 0;
let q3b = 0;
let q3c = 0;
let q3d = 0;
let q3e = 0;
let q3f = 0;
let q3Total = 0;


const addPercents = () => {
    context.font = "12px Arial";
    context.fillText("100%", 0, 10);
    context.fillText("75%", 0, (cH * .25) + 10);
    context.fillText("50%", 0, (cH / 2) + 10);
    context.fillText("25%", 0, (cH * .75) + 10);
    context.fillText("0%", 0, cH - 8);

}



const drawBar = (selectionName, barNum, numOfBars, count, percent) => {
    context.fillStyle = "#2f6"
    context.strokeStyle = "#ff";

    let spacing = (900 / (numOfBars + 1)) * barNum;
    let height = cH * percent;

    context.fillStyle = "#2f6"
    context.fillRect(spacing, (cH - height), barWidth, height);
    context.strokeStyle = "#ff";
    context.fillText(`${selectionName}`, spacing, (cH - (cH * percent) - 16));
    context.fillText(`${count}  |  ${percent * 100}%`, spacing, (cH - (cH * percent) - 3));
}

const q1Btn = document.getElementById("q1Btn").addEventListener('click', () => {
    context.clearRect(0, 0, cW, cH);
    addPercents();
    drawBar("Water", 1, 3, q1a, (q1a / q1Total));
    drawBar("Melted Ice", 2, 3, q1b, (q1b / q1Total));
    drawBar("Condensed Steam", 3, 3, q1c, (q1c / q1Total));
});

const q2Btn = document.getElementById("q2Btn").addEventListener('click', () => {
    context.clearRect(0, 0, cW, cH);
    addPercents();
    drawBar("Dog", 1, 3, q2a, (q2a / q2Total));
    drawBar("Cat", 2, 3, q2b, (q2b / q2Total));
    drawBar("Other", 3, 3, q2c, (q2c / q2Total));
});

const q3Btn = document.getElementById("q3Btn").addEventListener('click', () => {
    context.clearRect(0, 0, cW, cH);
    addPercents();
    drawBar("CS", 1, 6, q3a, (q3a / q3Total));
    drawBar("SE ", 2, 6, q3b, (q3b / q3Total));
    drawBar("TM", 3, 6, q3c, (q3c / q3Total));
    drawBar("GAME", 5, 6, q3d, (q3d/ q3Total));
    drawBar("WEB", 4, 6, q3e, (q3e / q3Total));
    drawBar("IS", 6, 6, q3f, (q3f / q3Total));
});



window.onload = () => {
    context.fillStyle = "#2f6"
    context.strokeStyle = "#ff";
    context.font = "30px Arial";
    context.fillText("Click on the buttons above to see the statistics.", cW/6, cH/2);

    
    
    
    fetch(`http://localhost:3000/api`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            q1a = data.q1a;
            q1b = data.q1b;
            q1c = data.q1c;
            q1Total = q1a + q1b + q1c;

<<<<<<< HEAD
            q2a = data.q2a;
            q2b = data.q2b;
            q2c = data.q2c;
            q2Total = q2a + q2b + q2c;

            q3a = data.q3a;
            q3b = data.q3b;
            q3c = data.q3c;
            q3d = data.q3d;
            q3e = data.q3e;
            q3f = data.q3f;
            q3Total = q3a + q3b + q3c + q3d + q3e + q3f;
    
        }
    );





  
=======
canvas.width = 600;
canvas.height = 400;

context.fillStyle = "#2a6"
context.fillRect(300, 80, 80, 40);

context.strokeStyle = "#fff";
context.strokeRect(150, 80, 80, 40);

context.strokeStyle = "#f00";
context.beginPath();
context.moveTo(450, 10);
context.lineTo(420, 35);
context.lineTo(300, 60);
context.fill();

context.fillStyle = "#ff0";
context.font = "30px Arial";
context.fillText("Bar Graph", 50, 150);
>>>>>>> f2afb3c639a2c75834ff40fb13246f03c119bad6
}
