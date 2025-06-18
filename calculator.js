// Get a reference to the display element
const display = document.getElementById('result');

// Initialize variables to store the current input, previous input, and operator
let currentInput = '';
let previousInput = '';
let operator = null;
let awaitingNewInput = false; // Flag to check if we are awaiting a new input after an operation

// Function to update the display
function updateDisplay() {
    display.textContent = currentInput === '' ? '0' : currentInput;
}

// Function to handle number button clicks
function appendNumber(number) {
    // If a new input is expected (e.g., after an '=' or an operator), clear currentInput
    if (awaitingNewInput) {
        currentInput = number;
        awaitingNewInput = false;
    } else {
        // Prevent multiple decimal points
        if (number === '.' && currentInput.includes('.')) {
            return;
        }
        // If currentInput is '0' and the number is not '.', replace '0'
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else {
            currentInput += number;
        }
    }
    updateDisplay();
}

// Function to handle operator button clicks
function chooseOperator(nextOperator) {
    // If current input is empty, and there's no previous input, do nothing
    if (currentInput === '' && previousInput === '') {
        return;
    }

    // If there's a previous input and an operator already, calculate the result
    if (previousInput !== '' && operator !== null && !awaitingNewInput) {
        calculate();
    }

    operator = nextOperator;
    // If currentInput is not empty, set it as previousInput
    if (currentInput !== '') {
        previousInput = currentInput;
    }
    // Display previous input and the operator
    display.textContent = previousInput + ' ' + operator;
    currentInput = ''; // Clear currentInput for the next number
    awaitingNewInput = true; // Set flag to true to clear currentInput on next number press
}

// Function to perform the calculation
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    // If either previous or current input is not a valid number, return
    if (isNaN(prev) || isNaN(current)) {
        return;
    }

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            // Handle division by zero
            if (current === 0) {
                result = 'Error';
            } else {
                result = prev / current;
            }
            break;
        default:
            return; // If no valid operator, do nothing
    }

    currentInput = result.toString();
    operator = null; // Reset operator
    previousInput = ''; // Clear previous input
    awaitingNewInput = true; // Set flag to true for a new input
    updateDisplay();
}

// Function to clear all (AC button)
function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = null;
    awaitingNewInput = false;
    updateDisplay();
}

// Function to handle plus/minus button
function toggleSign() {
    if (currentInput === '' || currentInput === '0') {
        return;
    }
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

// Function to handle percentage button
function applyPercentage() {
    if (currentInput === '') {
        return;
    }
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

// Event Listeners for all buttons
document.querySelectorAll('.button button').forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (button.classList.contains('button0')) appendNumber('0');
        else if (button.classList.contains('button1')) appendNumber('1');
        else if (button.classList.contains('button2')) appendNumber('2');
        else if (button.classList.contains('button3')) appendNumber('3');
        else if (button.classList.contains('button4')) appendNumber('4');
        else if (button.classList.contains('button5')) appendNumber('5');
        else if (button.classList.contains('button6')) appendNumber('6');
        else if (button.classList.contains('button7')) appendNumber('7');
        else if (button.classList.contains('button8')) appendNumber('8');
        else if (button.classList.contains('button9')) appendNumber('9');
        else if (button.classList.contains('buttonDot')) appendNumber('.');
        else if (button.classList.contains('buttonPlus')) chooseOperator('+');
        else if (button.classList.contains('buttonMinus')) chooseOperator('-');
        else if (button.classList.contains('buttonMultiply')) chooseOperator('*');
        else if (button.classList.contains('buttonDivide')) chooseOperator('/');
        else if (button.classList.contains('buttonEqual')) calculate();
        else if (button.classList.contains('buttonAC')) clearAll();
        else if (button.classList.contains('buttonPlusMinus')) toggleSign();
        else if (button.classList.contains('buttonPercent')) applyPercentage();
    });
});

// Initialize display on load
updateDisplay();
