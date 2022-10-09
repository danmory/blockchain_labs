import { getCalculatorContract } from "./utils";

const firstNumber = document.querySelector("#num1");
const secondNumber = document.querySelector("#num2");
const addBtn = document.querySelector("#add");
const subtractBtn = document.querySelector("#sub");
const multiplyBtn = document.querySelector("#mul");
const divideBtn = document.querySelector("#div");
const resultBtn = document.querySelector("#result");

async function calculate (operation) {
  const num1 = Number(firstNumber.value);
  const num2 = Number(secondNumber.value);
  const result = await getCalculatorContract().calculate(operation, num1, num2);
  resultBtn.textContent = result;
};

addBtn.addEventListener("click", () => {
  calculate("+");
});

subtractBtn.addEventListener("click", () => {
  calculate("-");
});

multiplyBtn.addEventListener("click", () => {
  calculate("*");
});

divideBtn.addEventListener("click", () => {
  calculate("/");
});
