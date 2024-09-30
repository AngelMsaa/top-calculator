
const calculator = document.querySelector("#calculatorBody")
calculator.addEventListener("click", handleClick);

const displayValueSelector = document.querySelector("#displayValue")
const displayOperandSelector = document.querySelector("#displayOperand")

let currentValue = 0;
let currentOperand = "";
let result = 0;

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

function updateDisplayValue(type) {
    if (type == "num") {
        displayValueSelector.textContent = currentValue;
    }
    if (type == "operand") {
        displayOperandSelector.textContent = currentOperand;
    }
}

function handleClick(event) {
    const clickedElement = event.target;

    if (clickedElement.classList.contains("numberButton")) {
        currentValue = Number(`${currentValue}${clickedElement.textContent}`);
        updateDisplayValue("num");
    } else if (clickedElement.classList.contains("operandButton")) {
        const currentOperand = clickedElement.textContent;
        c        
        
        updateDisplayValue("operand");
    }
}

