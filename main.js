const lottoNumbers = document.querySelector(".lotto-numbers");
const drawButton = document.querySelector("#draw-button");
const themeButton = document.querySelector("#theme-button");

function getBallColorClass(number) {
  if (number <= 10) return "ball-yellow";
  if (number <= 20) return "ball-blue";
  if (number <= 30) return "ball-red";
  if (number <= 40) return "ball-gray";
  return "ball-green";
}

function paintNumber(number, isBonus = false) {
  const lottoNumber = document.createElement("div");
  lottoNumber.classList.add("lotto-number");
  lottoNumber.classList.add(getBallColorClass(number));
  
  if (isBonus) {
    lottoNumber.classList.add("bonus");
  }
  
  lottoNumber.textContent = number;
  lottoNumbers.appendChild(lottoNumber);
}

function paintNumbers() {
  lottoNumbers.innerHTML = "";
  const numbers = [];
  
  while (numbers.length < 7) {
    const number = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }

  const mainNumbers = numbers.slice(0, 6).sort((a, b) => a - b);
  const bonusNumber = numbers[6];

  mainNumbers.forEach(num => paintNumber(num));
  
  const plusSign = document.createElement("div");
  plusSign.classList.add("plus-sign");
  plusSign.textContent = "+";
  lottoNumbers.appendChild(plusSign);
  
  paintNumber(bonusNumber, true);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    themeButton.textContent = "🌙 다크 모드";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themeButton.textContent = "☀️ 라이트 모드";
  }
}

drawButton.addEventListener("click", paintNumbers);
themeButton.addEventListener("click", toggleTheme);
