const generateBtn = document.getElementById("generator-btn");
const paletteContainer = document.querySelector(".palette-container");
const colorShow = document.getElementsByClassName("color");
const hexValue = document.getElementsByClassName("hex-value");
const copyBtn = document.getElementsByClassName("copy-btn");

generateBtn.addEventListener("click", generatePalette);

function generatePalette() {
  const colors = [];
  paletteContainer.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    let hex = generateColor();
    let colorBox = document.createElement("div");
    colorBox.classList.add("color-box");
    colorBox.innerHTML = `<div class="color" style="background-color: ${hex}"></div>
          <div class="color-info">
            <span class="hex-value">${hex}</span>
            <span
              class="material-symbols-outlined copy-btn"
              title="Copy to clipboard"
            >
              content_copy
            </span>
          </div>`;
    paletteContainer.appendChild(colorBox);
  }
}

function generateColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    let randomLetter = letters[Math.floor(Math.random() * letters.length)];
    color = color + randomLetter;
  }
  return color;
}

generatePalette();
