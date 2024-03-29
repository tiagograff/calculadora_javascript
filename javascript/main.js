document.addEventListener("DOMContentLoaded", () => {
  //variáveis
  let currentExpression = "";

  //selecionar os botões
  const buttons = document.querySelectorAll(".calculator-box-buttons-button");
  //display da calculadora
  const display = document.getElementById("display");

  //função que vai atualizando o display
  function showDisplay(value) {
    currentExpression += value;
    display.value = currentExpression;
  }

  //função de calcular
  function calculate() {
    //soma
    if (currentExpression.includes("+")) {
      //separar a partir do caractere +
      const operator = currentExpression.split("+");
      const result = operator.reduce(
        (sum, operand) => sum + parseFloat(operand),
        0
      );
      currentExpression = result.toString();
      display.value = currentExpression;
    } else if (currentExpression.includes("-")) {
      const operands = currentExpression.split("-");
      const result = operands.reduce((subtraction, operand, index) => {
        if (index === 0) {
          return parseFloat(operand);
        } else {
          return subtraction - parseFloat(operand);
        }
      }, 0);
      currentExpression = result.toString();
      display.value = currentExpression;
    } else if (currentExpression.includes("÷")) {
      const operands = currentExpression.split("÷");
      const result = operands.reduce((division, operand, index) => {
        if (index === 0) {
          return parseFloat(operand).toFixed(2);
        } else if (parseFloat(operand) !== 0) {
          return (division / parseFloat(operand)).toFixed(2);
        } else {
          //caso a divisão for por zero
          alert("erro: divisão por zero");
          return division; //valor anterior ao da divisão por zero
        }
      }, 0);
      currentExpression = result.toString();
      display.value = currentExpression;
    } else if (currentExpression.includes("x")) {
      const operator = currentExpression.split("x");
      const result = operator.reduce(
        (multiplication, operand) =>
          multiplication * parseFloat(operand).toFixed(2)
      );
      currentExpression = result.toString();
      display.value = currentExpression;
    }
  }

  //para cada botão ao ser clicado
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      //valor do botão
      const selectedValue = event.target.innerText;
      //se for operador =
      if (selectedValue === "=") {
        //chama a função calcular
        calculate();
        //se for valor "c" limpa o display
      } else if (selectedValue === "c") {
        currentExpression = "";
        display.value = "";
      } else {
        //mostrar o valor do botão no display
        showDisplay(selectedValue);
      }
    });
  });
});
