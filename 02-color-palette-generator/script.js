const generateBtn = document.getElementById("generator-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click", generatePalette);

function generatePalette() {
  const colors = [];
  for (let i = 0; i < 5; i++) {
    let hex = generateColor();
    colors.push(hex);
  }
  const colorBoxes = document.querySelectorAll(".color-box");
  colorBoxes.forEach((colorBox, index) => {
    console.log(colorBox);
    const colorDiv = colorBox.querySelector(".color");
    colorDiv.style.backgroundColor = colors[index];
    const colorInfo = colorBox.querySelector(".color-info");
    colorInfo.querySelector(".hex-value").textContent = colors[index];
    colorInfo
      .querySelector(".copy-btn")
      .addEventListener("click", copyClipboard);
  });
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
