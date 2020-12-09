const jsonData = document.getElementById('jsonData');
const canvas = document.getElementById('canvas');

// fetch(`http://localhost:3000/api`)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//         jsonData.innerHTML = JSON.stringify(data);
// });

window.onload = () => {
    let q1Count = 5;
    let q2Count = 2;
    let q3COunt = 10;

    // do canvas stuff here with that data
    const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 400;

context.fillStyle = "#2f6"
context.fillRect(300, 80, 80, 40);

context.strokeStyle = "#ff";
context.strokeRect(150, 80, 80, 40);

context.strokeStyle = "#f00";
context.beginPath();
context.moveTo(450, 10);
context.lineTo(420, 35);
context.lineTo(300, 60);



context.font = "30px Arial";
context.fillText("bar Graph", 50, 150);
}
