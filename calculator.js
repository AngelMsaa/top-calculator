// Query calculator body and create listeners for clicks and keydown
const calculator = document.querySelector("#calculatorBody")
calculator.addEventListener("click", handleClick);
document.addEventListener("keydown", handleKeyPress)

// Select calculator display spans to showcase information
const displayValueSelector = document.querySelector("#displayValue")
const displayOperandSelector = document.querySelector("#displayOperand")
const displayResultSelector = document.querySelector("#result")

// Initialize calculator state variables
let currentValue = 0;
let currentOperand = "";
let result = 0;


/*
 * Handles click events on the calculator. 
 * Routes clicks based on the button type (number, operand, action)
*/
function handleClick(event) {
    const clickedElement = event.target;

    if (clickedElement.classList.contains("numberButton")) {
        selectNumber(clickedElement);
    } else if (clickedElement.classList.contains("operandButton")) {
        selectOperand(clickedElement);
    } else if (clickedElement.classList.contains("actionButton")) {
        switch (clickedElement.id) {
            case "equalsTo":
                getResult();
                break; 
            case "clear":
                clearCalculator();
                break;
        }
    }
}

/**
 * Handles keypress events to allow for keyboard input.
 * Processes number keys, operands, and special keys (Enter, Escape).
 */
function handleKeyPress(event) {
    const pressedKey = event.key;

    if (!isNaN(pressedKey) || pressedKey === ".") {
        selectNumber(null, pressedKey);
    } else if (["+", "-", "/", "*"].includes(pressedKey)) {
        selectOperand(null, pressedKey);
    } else if (pressedKey === "Enter") {
        getResult();
    } else if (pressedKey === "Escape") {
        clearCalculator();
    }
}

/**
 * Performs addition and ensures precision for floating-point results.
 */
const add = (x, y) => {
    const result = Number(x) + Number(y);
    if (result % 1 === 0) {
        return result;
    } else {
        return parseFloat(result.toFixed(4));
    }
};

/**
 * Performs subtraction and ensures precision for floating-point results.
 */
const subtract = (x, y) => {
    const result = Number(x) - Number(y);
    if (result % 1 === 0) {
        return result;
    } else {
        return parseFloat(result.toFixed(4));
    }
};

/**
 * Performs multiplication and ensures precision for floating-point results.
 */
const multiply = (x, y) => {
    const result = Number(x) * Number(y);
    if (result % 1 === 0) {
        return result;
    } else {
        return parseFloat(result.toFixed(4));
    }
};

/**
 * Performs division and ensures precision for floating-point results.
 */
const divide = (x, y) => {
    const result = Number(x) / Number(y);
    if (result % 1 === 0) {
        return result;
    } else {
        return parseFloat(result.toFixed(4));
    }
};

/**
 * Updates the display depending on the type of update (number, operand, result, or all).
 */
function updateDisplayValue(type) {
    if (type == "num") {
        displayValueSelector.textContent = currentValue;
    } else if (type == "operand") {
        displayOperandSelector.textContent = currentOperand;
    } else if (type == "result") {
        displayResultSelector.textContent = result;
    } else if (type == "all") {
        displayValueSelector.textContent = currentValue;
        displayOperandSelector.textContent = currentOperand;
        displayResultSelector.textContent = result;
    }
}

/**
 * Handles selecting a number (via button or keypress).
 * Updates the currentValue and the display.
 */
function selectNumber(element, keystroke) {
    if (element) {
        if (element.textContent === "." && !currentValue.toString().includes(".")) {
            currentValue = `${currentValue}.`;
        } else {
            if (currentValue == 0) {
                currentValue = element.textContent;
            } else {
                currentValue = `${currentValue}${element.textContent}`;
            }
        }
    } else if (keystroke) {
        if (keystroke === "." && !currentValue.toString().includes(".")) {
            currentValue = `${currentValue}.`;
        } else {
            if (currentValue == 0) {
                currentValue = keystroke;
            } else {
                currentValue = `${currentValue}${keystroke}`;
            }
        } 
    }
    updateDisplayValue("num");
}

/**
 * Handles selecting an operand (via button or keypress).
 * Updates the result based on the current operation, if any.
 */
function selectOperand(element, keystroke) {
    if (currentValue !== 0) {
        if (currentOperand) {
            switch (currentOperand) {
                case "+":
                    result = add(result, currentValue);
                    break;
                case "-":
                    result = subtract(result, currentValue);
                    break;
                case "*":
                    result = multiply(result, currentValue);
                    break;
                case "/":
                    result = divide(result, currentValue);
                    break;
            }
        } else {
            result = currentValue; // First operation
        }
        currentValue = 0; // Reset currentValue for next input
    }

    if (element) { // If a button was clicked
        switch (element.id) {
            case "add":
                currentOperand = "+";
                break;
            case "subtract":
                currentOperand = "-";
                break;
            case "multiply":
                currentOperand = "*";
                break;
            case "divide":
                currentOperand = "/";
                break;
        }
        updateDisplayValue("all");
    } else if (keystroke) { // If a key was pressed
        currentOperand = keystroke;
        updateDisplayValue("all");
    }
}

/**
 * Finalizes the calculation when the equals button or Enter key is pressed.
 * Updates the display with the final result and resets the operand.
 */
function getResult() { 
    switch (currentOperand) {
        case "+":
            currentOperand = "";
            currentValue = add(result, currentValue);
            break;
        case "-":
            currentOperand = "-";
            currentValue = subtract(result, currentValue);
            break;
        case "*":
            currentOperand = "*";
            currentValue = multiply(result, currentValue);
            break;
        case "/":
            currentOperand = "/";
            currentValue = divide(result, currentValue);
            break;
    }
    currentOperand = ""; // Clear the current operand
    result = ""; // Reset the result
    updateDisplayValue("all");
}

function clearCalculator() {
    currentValue = 0;
    currentOperand = "";
    result = "";
    updateDisplayValue("all"); // Refresh the display to show initial state
}