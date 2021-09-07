const display = document.querySelector('#display');
let currentValue = 0;
let lastValue = 0;
let currentOperator = null;

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

function numberButtons() {
  const nums = document.querySelectorAll('.number');
  nums.forEach(num => {
    num.addEventListener('click', () => {
      currentValue = (currentValue === 0) ? 
                      num.textContent : currentValue + num.textContent;
      display.textContent = currentValue;
    });
  });
}

function operatorButtons() {
  const operators = document.querySelectorAll('.operator');
  operators.forEach(operator => {
    operator.addEventListener('click', () => {
      switch (operator.id) {
        case 'clear':
          currentValue = 0;
          lastValue = 0;
          currentOperator = null;
          display.textContent = 0;
          break;
        case 'equal':
          let result = operate(currentOperator, lastValue, currentValue);
          currentValue = result;
          display.textContent = result;
          break;
        default:
          if (currentOperator) {
            let result = operate(currentOperator, lastValue, currentValue);
            currentValue = result;
            display.textContent = result;
          }
          lastValue = currentValue;
          currentValue = 0;
          currentOperator = operator.textContent;
          break;
      }
    });
  });
}

numberButtons();
operatorButtons();