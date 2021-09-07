const display = document.querySelector('#display');
let currentValue = 0;
let lastValue = 0;
let currentOperator = null;
const decimalPt = document.querySelector('#point');

const add = function(num1, num2) {
  return parseFloat(num1) + parseFloat(num2);
};

const subtract = function(num1, num2) {
  return num1 - num2;
};

const multiply = function(num1, num2) {
  return num1 * num2;
};

const divide = function(num1, num2) {
  return num1 / num2;
};

const operate = function(operator, num1, num2) {
  switch(operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case 'x':
      return multiply(num1, num2);
    case '/':
      return divide(num1, num2);
  };
};

const displayNum = function(num) {
  if (num.target.textContent === '.') {
     if (decimalPt.disabled) return;
     decimalPt.disabled = true;
  }

  currentValue = (currentValue === 0) ?
    num.target.textContent : currentValue + num.target.textContent;
  display.textContent = currentValue;
}

const equate = function() {
  if (!currentOperator) return;
  currentValue = operate(currentOperator, lastValue, currentValue);
  display.textContent = currentValue;
}

const compute = function(operator) {
  switch (operator.target.id) {
    case 'clear':
      currentValue = 0;
      lastValue = 0;
      currentOperator = null;
      decimalPt.disabled = false;
      display.textContent = 0;
      break;
    case 'equal':
      equate()
      break;
    default:
      if (currentOperator) equate();
      lastValue = currentValue;
      currentValue = 0;
      currentOperator = operator.target.textContent;
      decimalPt.disabled = false;
      break;
  }
}

function calculator() {
  const nums = document.querySelectorAll('.number');
  nums.forEach(num => {
    num.addEventListener('click', displayNum);
  });

  const operators = document.querySelectorAll('.operator');
  operators.forEach(operator => {
    operator.addEventListener('click', compute);
  });
}

calculator();

// division by 0 should result in an error message
// equals has issues when operators and numbers not registered before hand
// decimal point should be limited to one use