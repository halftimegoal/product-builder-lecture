// --- 로또 추첨기 로직 ---
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
  if (!lottoNumbers) return;
  const lottoNumber = document.createElement("div");
  lottoNumber.classList.add("lotto-number");
  lottoNumber.classList.add(getBallColorClass(number));
  if (isBonus) lottoNumber.classList.add("bonus");
  lottoNumber.textContent = number;
  lottoNumbers.appendChild(lottoNumber);
}

function paintNumbers() {
  lottoNumbers.innerHTML = "";
  const numbers = [];
  while (numbers.length < 7) {
    const number = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(number)) numbers.push(number);
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

if (drawButton) drawButton.addEventListener("click", paintNumbers);

// --- 테마 토글 ---
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
if (themeButton) themeButton.addEventListener("click", toggleTheme);

// --- 행운 도구 로직 (tools.html) ---

// 1. 메뉴 추천기
const menuButton = document.querySelector("#menu-button");
const recommendedMenu = document.querySelector("#recommended-menu");
const menus = ["삼겹살", "김치찌개", "초밥", "치킨", "피자", "마라탕", "돈가스", "쌀국수", "떡볶이", "햄버거", "냉면", "파스타", "제육볶음", "순대국"];

if (menuButton) {
  menuButton.addEventListener("click", () => {
    const randomMenu = menus[Math.floor(Math.random() * menus.length)];
    recommendedMenu.textContent = `오늘의 행운 메뉴: ${randomMenu}!`;
  });
}

// 2. 세금 계산기
const calcButton = document.querySelector("#calc-button");
const winAmountInput = document.querySelector("#win-amount");
const calcResult = document.querySelector("#calc-result");
const netAmountDisplay = document.querySelector("#net-amount");

if (calcButton) {
  calcButton.addEventListener("click", () => {
    const amount = Number(winAmountInput.value);
    if (!amount || amount <= 0) return alert("금액을 입력해주세요.");
    
    let tax = 0;
    if (amount <= 2000000) {
      tax = 0;
    } else if (amount <= 300000000) {
      tax = amount * 0.22;
    } else {
      tax = (300000000 * 0.22) + ((amount - 300000000) * 0.33);
    }
    
    const netAmount = amount - tax;
    netAmountDisplay.textContent = Math.floor(netAmount).toLocaleString();
    calcResult.style.display = "block";
  });
}

// 3. 행운 지수
const fortuneButton = document.querySelector("#fortune-button");
const luckScoreDisplay = document.querySelector("#luck-score");
const luckMessageDisplay = document.querySelector("#luck-message");
const luckMessages = [
  "오늘은 최고의 날! 로또 한 장 어떠세요?",
  "운이 따르는 날입니다. 자신감을 가지세요.",
  "평범하지만 평화로운 하루가 될 거예요.",
  "조심해서 나쁠 것 없는 날, 신중함이 필요해요.",
  "작은 행운이 숨어있는 날입니다. 주변을 잘 살펴보세요."
];

if (fortuneButton) {
  fortuneButton.addEventListener("click", () => {
    const score = Math.floor(Math.random() * 51) + 50; // 50~100점
    luckScoreDisplay.textContent = `${score}%`;
    luckMessageDisplay.textContent = luckMessages[Math.floor(Math.random() * luckMessages.length)];
  });
}
