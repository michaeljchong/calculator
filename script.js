const display = document.querySelector('#display');
const decimalPt = document.querySelector('#point');
const values = {
      current: null,
      previous: null,
      currentOperator: null
};

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

const round = function(num) {
  const precision = 1000000
  return Math.round(num * precision) / precision;
};

const operate = function(operator, num1, num2) {
  switch(operator) {
    case '+':
      return round(add(num1, num2));
    case '-':
      return round(subtract(num1, num2));
    case 'x':
      return round(multiply(num1, num2));
    case '/':
      return round(divide(num1, num2));
  };
};

const displayNum = function(num) {
  removeIndicator();
  if (values.currentOperator === '=') clear();

  if (values.current && values.current.toString().includes('.')) {
    decimalPt.disabled = true;
    if (num.target.id === 'point') return;
  }

  values.current = (!values.current) ?
      num.target.textContent :
      values.current + num.target.textContent;
  display.textContent = values.current;
  document.querySelector('#clear').textContent = 'C';
};

const clear = function() {
  values.current = null;
  values.previous = null;
  values.currentOperator = null;
  display.textContent = 0;
  decimalPt.disabled = false;
  document.querySelector('#clear').textContent = 'AC';
};

const backspace = function() {
  if (values.current) {
    const decimalPtCheck = values.current.toString().slice(-2, -1);
    if (decimalPtCheck === '.') decimalPt.disabled = false;
    values.current = values.current.toString().slice(0, -1);
  };
  display.textContent =
      (values.current === '' || values.current === null) ? 0 : values.current;
};

const checkDivisionByZero = function () {
  if (values.currentOperator === '/' && values.current === '0') {
    clear();
    display.textContent = 'Error - Cannot divide by zero';
  };
}

const checkAndCompute = function() {
  checkDivisionByZero();
  if (values.currentOperator === '=') return;
  if (values.currentOperator && values.current && values.previous) {
    values.current = operate(values.currentOperator, values.previous, values.current);
    display.textContent = values.current;
  };
};

const removeIndicator = function() {
  const operators = document.querySelectorAll('.operator');
  operators.forEach(operator => {
    operator.classList.remove('indicateOperator')
  });
};

const indicateOperator = function(operator) {
  operator.target.classList.add('indicateOperator');
};

const useOperator = function(operator) {
  removeIndicator();
  switch (operator.target.id) {
    case 'clear':
      clear();
      break;
    case 'negative':
      if (values.current) values.current *= -1;
      display.textContent = values.current;
      break;
    case 'backspace':
      backspace();
      break;
    default:
      if (operator.target.id !== 'equal') indicateOperator(operator);
      checkAndCompute();
      values.previous = values.current || values.previous;
      values.current = null;
      values.currentOperator = operator.target.textContent;
      decimalPt.disabled = false;
      break;
  };
};

const nums = document.querySelectorAll('.number');
nums.forEach(num => {
  num.addEventListener('click', displayNum);
});

const operators = document.querySelectorAll('.operator');
operators.forEach(operator => {
  operator.addEventListener('click', useOperator);
});

/* TO DO
- selected operator changes color while in use
- limit input to display window size
- change larger numbers into exponential
- hitting equals repetitively repeats the previous operation
- show brief animation on non-operator buttons
*/