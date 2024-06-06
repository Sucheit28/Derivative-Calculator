function randomInput() {
    var randomValue = [
      "4 * sin(x) + 5 * cos(x / 2)",
      "x * sin(x ^ 2)",
      "x ^ 4 * sin(x)",
      "e ^ sin(x)",
    ];
    var randomExpression = Math.floor(Math.random() * randomValue.length);
    document.getElementById("expression").value = randomValue[randomExpression];
    userInput();
  }