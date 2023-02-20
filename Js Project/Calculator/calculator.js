let buffer = "0";
let runningValue = 0;
let previousOperator = null;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(number) {
  if (buffer === "0") {
    buffer = number;
  } else {
    buffer += number;
  }
}

function handleMath(value) {
  if (buffer === 0) {
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningValue === 0) {
    runningValue = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;
  buffer = "0";
  console.log(runningValue);
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningValue += intBuffer;
  } else if (previousOperator === "-") {
    runningValue -= intBuffer;
  } else if (previousOperator === "*") {
    runningValue *= intBuffer;
  } else if (previousOperator === "/") {
    runningValue /= intBuffer;
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningValue;
      runningValue = 0;
      break;
    case "⬅":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      handleMath(symbol);
      break;
  }
}

function init() {
  console.log("hi");
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

function rerender() {
  screen.innerText = buffer;
}
init();
