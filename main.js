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

function createConfetti() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = ["#fbc400", "#69c8f2", "#ff7272", "#b0d840"][Math.floor(Math.random() * 4)];
    confetti.style.animationDelay = Math.random() * 2 + "s";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

if (fortuneButton) {
  fortuneButton.addEventListener("click", () => {
    // 확률 테스트를 위해 10% 확률로 100점 등장, 나머지는 1~99점
    let score;
    const rand = Math.random();
    if (rand > 0.9) {
      score = 100;
    } else {
      score = Math.floor(Math.random() * 99) + 1;
    }

    luckScoreDisplay.textContent = `${score}%`;
    
    // 클래스 초기화
    luckScoreDisplay.classList.remove("score-low", "score-mid", "score-high", "score-max");
    
    let message = "";
    if (score <= 30) {
      luckScoreDisplay.classList.add("score-low");
      message = "조심해서 나쁠 것 없는 날, 신중함이 필요해요.";
    } else if (score <= 60) {
      luckScoreDisplay.classList.add("score-mid");
      message = "평범하지만 평화로운 하루가 될 거예요.";
    } else if (score <= 99) {
      luckScoreDisplay.classList.add("score-high");
      message = "운이 따르는 날입니다. 자신감을 가지세요!";
    } else {
      luckScoreDisplay.classList.add("score-max");
      message = "축하합니다! 역대급 행운의 날입니다! 지금 바로 도전하세요!";
      createConfetti();
    }
    
    luckMessageDisplay.textContent = message;
  });
}
