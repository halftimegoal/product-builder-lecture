const lottoNumbers = document.querySelector(".lotto-numbers");
const drawButton = document.querySelector("button");

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
  numbers.forEach(paintNumber);
}

drawButton.addEventListener("click", paintNumbers);
