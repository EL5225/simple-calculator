const operandButtons: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll("[data-operand]");

const numberButtons: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll("[data-numbers]");

const clearButton: HTMLButtonElement = document.querySelector("[data-clear]")!;
const delButton: HTMLButtonElement = document.querySelector("[data-delete]")!;
const equalButton: HTMLButtonElement = document.querySelector("[data-equal]")!;
const display: HTMLElement = document.getElementById("numbers")!;
const displayOperation: HTMLElement = document.getElementById("operation")!;

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (display?.textContent!.length >= 20) {
      return;
    }

    if (display.textContent === "0") {
      display.textContent = "";
    }

    if (button.textContent === ".") {
      if (display.textContent!.includes(".")) {
        return;
      }

      if (display?.textContent!.length === 0) {
        return (display.textContent += "0.");
      }
    }

    display.textContent += button.textContent!;
  });
});

operandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (display.textContent === "") {
      return;
    }

    switch (button.textContent) {
      case "+": {
        operations();
        displayOperation.textContent = display.textContent + " + ";
        display.textContent = "";
        break;
      }

      case "-": {
        operations();
        displayOperation.textContent = display.textContent + " - ";
        display.textContent = "";
        break;
      }

      case "*": {
        operations();
        displayOperation.textContent = display.textContent + " * ";
        display.textContent = "";
        break;
      }

      case "/": {
        operations();
        displayOperation.textContent = display.textContent + " / ";
        display.textContent = "";
        break;
      }
    }
  });
});

delButton.addEventListener("click", () => {
  display.textContent = display.textContent!.slice(0, -1);
});

clearButton.addEventListener("click", () => {
  display.textContent = "";
  displayOperation.textContent = "";
});

equalButton.addEventListener("click", () => {
  operations();
});

const showResult = (result: number): void => {
  displayOperation.textContent = "";
  display.textContent = result.toLocaleString();
};

const operations = (): void => {
  let result: number = 0;
  const displayValue = parseFloat(display.textContent!);
  const displayOperationValue: number = parseFloat(
    displayOperation.textContent!.slice(0, -2).replace(/,/g, "")
  );

  if (display.textContent === "") {
    return;
  }

  if (displayOperation.textContent?.includes("+")) {
    result = displayOperationValue + displayValue;
    showResult(result);
  } else if (displayOperation.textContent?.includes("-")) {
    result = displayOperationValue - displayValue;
    showResult(result);
  } else if (displayOperation.textContent?.includes("*")) {
    result = displayOperationValue * displayValue;
    showResult(result);
  } else if (displayOperation.textContent?.includes("/")) {
    if (displayValue === 0) {
      showResult(0);
      return;
    }
    result = displayOperationValue / displayValue;

    showResult(result);
  }
};
