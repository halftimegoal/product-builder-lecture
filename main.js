const lottoNumbers = document.querySelector(".lotto-numbers");
const drawButton = document.querySelector("#draw-button");
const themeButton = document.querySelector("#theme-button");

function paintNumber(number, isBonus = false) {
  const lottoNumber = document.createElement("div");
  lottoNumber.classList.add("lotto-number");
  if (isBonus) {
    lottoNumber.classList.add("bonus");
  }
  lottoNumber.textContent = number;
  lottoNumbers.appendChild(lottoNumber);
}

function paintNumbers() {
  lottoNumbers.innerHTML = "";
  const numbers = [];
  
  // 1부터 45까지 중복 없이 7개 추출 (6개 당첨번호 + 1개 보너스)
  while (numbers.length < 7) {
    const number = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }

  // 앞의 6개 번호는 정렬하여 출력
  const mainNumbers = numbers.slice(0, 6).sort((a, b) => a - b);
  const bonusNumber = numbers[6];

  mainNumbers.forEach(num => paintNumber(num));
  
  // 보너스 번호 구분을 위한 '+' 기호 추가
  const plusSign = document.createElement("div");
  plusSign.classList.add("plus-sign");
  plusSign.textContent = "+";
  lottoNumbers.appendChild(plusSign);
  
  // 보너스 번호 출력
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
