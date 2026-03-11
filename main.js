const lottoNumbers = document.querySelector(".lotto-numbers");
const drawButton = document.querySelector("#draw-button");
const themeButton = document.querySelector("#theme-button");

function paintNumber(number) {
  const lottoNumber = document.createElement("div");
  lottoNumber.classList.add("lotto-number");
  lottoNumber.textContent = number;
  lottoNumbers.appendChild(lottoNumber);
}

function paintNumbers() {
  lottoNumbers.innerHTML = "";
  const numbers = [];
  while (numbers.length < 6) {
    const number = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }
  numbers.sort((a, b) => a - b);
  numbers.forEach(paintNumber);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    themeButton.textContent = "🌙 Dark Mode";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themeButton.textContent = "☀️ Light Mode";
  }
}

drawButton.addEventListener("click", paintNumbers);
themeButton.addEventListener("click", toggleTheme);
