
const calculator = document.querySelector("#calculatorBody")
calculator.addEventListener("click", handleClick);
document.addEventListener("keypress", handleKeyPress)

const displayValueSelector = document.querySelector("#displayValue")
const displayOperandSelector = document.querySelector("#displayOperand")
const displayResultSelector = document.querySelector("#result")

let currentValue = 0;
let currentOperand = "";
let result = 0;

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

const add = (x, y) => {
    const result = Number(x) + Number(y);
    if (result % 1 === 0) {
        return result;
    } else {
        return parseFloat(result.toFixed(4));
    }
};

const subtract = (x, y) => {
    const result = Number(x) - Number(y);
    if (result % 1 === 0) {
        return result;
    } else {
        return parseFloat(result.toFixed(4));
    }
};

const multiply = (x, y) => {
    const result = Number(x) * Number(y);
    if (result % 1 === 0) {
        return result;
    } else {
        return parseFloat(result.toFixed(4));
    }
};

const divide = (x, y) => {
    const result = Number(x) / Number(y);
    if (result % 1 === 0) {
        return result;
    } else {
        return parseFloat(result.toFixed(4));
    }
};

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
            result = currentValue;
        }
        currentValue = 0;
    }

    if (element) {
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
    } else if (keystroke) {
        currentOperand = keystroke;
        updateDisplayValue("all");
    }
}

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
    currentOperand = "";
    result = "";
    updateDisplayValue("operand");
    updateDisplayValue("num");
    updateDisplayValue("all");
}

function clearCalculator() {
    currentValue = 0;
    currentOperand = "";
    result = "";
    updateDisplayValue("all");
}