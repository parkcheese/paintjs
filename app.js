const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jssave");

const defaultColor = "#2c2c2c";
const canvasSize = 700;

canvas.width = canvasSize; // 필수요소
canvas.height = canvasSize;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = defaultColor; // 우리가 그릴 선이 가질 색
ctx.lineWidth = 2.5; // 선의 기본 너비
ctx.fillStyle = defaultColor;

let painting = false;
let filling = false;

function stopPainting(event) {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath(); // 클릭하지 않고 마우스를 움직일 때, 시작.
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function canvasReset() {
  location.reload(true);
}

function handleColorClick(event) {
  const Color = event.target.style.backgroundColor;
  ctx.strokeStyle = Color;
  ctx.fillStyle = Color;
}

function handleRangeChange(event) {
  const strokeSize = event.target.value;
  ctx.lineWidth = strokeSize;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "fill";
    canvas.classList.remove("fill");
  } else {
    filling = true;
    canvas.classList.add("fill");
    mode.innerText = "brush";
  }
}

function handleCanvasClick() {
  if (filling === true) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "Paintcheese.png";
  console.log(link);
  link.click();
}

const reset = document.querySelector("#jsreset");

// 캔버스가 존재하는지 확인
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  reset.addEventListener("click", canvasReset);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}
