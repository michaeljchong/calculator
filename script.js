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
    if (values.current.toString().includes('.')) {
      decimalPt.disabled = false;
    }
    values.current = values.current.toString().slice(0, -1);
  };
  display.textContent =
    (values.current === '' || values.current === null) ?
      0 : values.current;
};

const equate = function() {
  if (values.currentOperator && values.current && values.previous) {
    values.current = operate(
            values.currentOperator,
            values.previous,
            values.current);
    display.textContent = values.current;
  };
};

const divisionByZero = function() {
  if (values.currentOperator === '/' && values.current === '0') {
    clear();
    display.textContent = 'Error - Cannot divide by zero';
  };
}

const useOperator = function(operator) {
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
    case 'equal':
      divisionByZero();
      equate();
      values.currentOperator = null;
      break;
    default:
      // operator.target.classList.add('selectedOperator');
      divisionByZero();
      if (values.currentOperator) equate();
      values.previous = values.current;
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
- input after hitting equals should clear and start a new computation sequence, 
    operator after equals should continue the current sequence
- selected operator changes color while in use
*/