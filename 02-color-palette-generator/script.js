const generateBtn = document.getElementById("generator-btn");
const paletteContainer = document.querySelector(".palette-container");

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
    paletteContainer.appendChild(colorBox); // Thêm một colorBox vào paletteContainer
  }
  const copyBtn = Array.from(document.querySelectorAll(".copy-btn"));
  copyBtn.forEach((btn) => {
    btn.addEventListener("click", copyClipboard);
    console.log("đã add event listener");
  });
}

function generateColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    let randomLetter = letters[Math.floor(Math.random() * letters.length)];
    color += randomLetter;
  }
  return color;
}
async function copyClipboard(event) {
  const hexValue = event.target.previousElementSibling.textContent;
  try {
    await navigator.clipboard.writeText(hexValue); // Sao chép vào clipboard
    alert("Đã copy: " + hexValue); // Thông báo thành công
  } catch (err) {
    console.error("Lỗi copy: ", err);
    alert("Không thể copy, vui lòng thử lại.");
  }
  console.log(hexValue);
}
generatePalette();
