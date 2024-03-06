"use strict";

document.addEventListener("DOMContentLoaded", function () {
  //variáveis
  var currentExpression = ""; //selecionar os botões

  var buttons = document.querySelectorAll(".calculator-box-buttons-button"); //display da calculadora

  var display = document.getElementById("display"); //função que vai atualizando o display

  function showDisplay(value) {
    currentExpression += value;
    display.value = currentExpression;
  } //função de calcular


  function calculate() {
    //soma
    if (currentExpression.includes("+")) {
      //separar a partir do caractere +
      var operator = currentExpression.split("+");
      var result = operator.reduce(function (sum, operand) {
        return sum + parseFloat(operand);
      }, 0);
      currentExpression = result.toString();
      display.value = currentExpression;
    } else if (currentExpression.includes("-")) {
      var operands = currentExpression.split("-");

      var _result = operands.reduce(function (subtraction, operand, index) {
        if (index === 0) {
          return parseFloat(operand);
        } else {
          return subtraction - parseFloat(operand);
        }
      }, 0);

      currentExpression = _result.toString();
      display.value = currentExpression;
    } else if (currentExpression.includes("÷")) {
      var _operands = currentExpression.split("÷");

      var _result2 = _operands.reduce(function (division, operand, index) {
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

      currentExpression = _result2.toString();
      display.value = currentExpression;
    } else if (currentExpression.includes("x")) {
      var _operator = currentExpression.split("x");

      var _result3 = _operator.reduce(function (multiplication, operand) {
        return multiplication * parseFloat(operand).toFixed(2);
      });

      currentExpression = _result3.toString();
      display.value = currentExpression;
    }
  } //para cada botão ao ser clicado


  buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      //valor do botão
      var selectedValue = event.target.innerText; //se for operador =

      if (selectedValue === "=") {
        //chama a função calcular
        calculate(); //se for valor "c" limpa o display
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