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

function display() {
  const display = document.querySelector('#display');
  const nums = document.querySelectorAll('.number');
  nums.forEach(num => {
    num.addEventListener('click', () => {
      currentValue = (currentValue === 0) ? num.textContent : currentValue + num.textContent;
      display.textContent = currentValue;
    });
  });

  const operators = document.querySelectorAll('.operator');
  operators.forEach(operator => {
    operator.addEventListener('click', function(e) {
      switch(e.target.id) {
        case 'clear':
          currentValue = 0;
          lastValue = 0;
          currentOperator = null;
          display.textContent = 0;
          break;
        case 'divide':
          lastValue = currentValue;
          currentValue = 0;
          currentOperator = '/';
          break;
        case 'multiply':
          lastValue = currentValue;
          currentValue = 0;
          currentOperator = 'x';
          break;
        case 'subtract':
          lastValue = currentValue;
          currentValue = 0;
          currentOperator = '-';
          break;
        case 'add':
          lastValue = currentValue;
          currentValue = 0;
          currentOperator = '+';
          break;
        case 'equal':
          lastValue = operate(currentOperator, lastValue, currentValue);
          currentValue = lastValue;
          display.textContent = lastValue;
          break;
      }
    });
  });
}

display();