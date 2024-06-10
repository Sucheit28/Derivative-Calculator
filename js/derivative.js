function randomInput() {
    var randomValue = [
      "4 * sin(x) + 5 * cos(x / 2)",
      "x * sin(x ^ 2)",
      "x ^ 4 * sin(x)",
      "e ^ sin(x)",
      "asin(x)",
      "acos(x)",
      "atan(x)",
      "acot(x)",
      "asec(x)",
      "acsc(x)",
    ];
    var randomExpression = Math.floor(Math.random() * randomValue.length);
    document.getElementById("expression").value = randomValue[randomExpression];
    userInput();
  }
  
  function getInverseTrigDerivative(input) {
    switch (input) {
      case "asin(x)":
        return "1 / sqrt(1 - x^2)";
      case "acos(x)":
        return "-1 / sqrt(1 - x^2)";
      case "atan(x)":
        return "1 / (1 + x^2)";
      case "acot(x)":
        return "-1 / (1 + x^2)";
      case "asec(x)":
        return "1 / (abs(x) * sqrt(x^2 - 1))";
      case "acsc(x)":
        return "-1 / (abs(x) * sqrt(x^2 - 1))";
      default:
        throw new Error("Unknown inverse trigonometric function");
    }
  }
  
  function userInput() {
    try {
      var input = document.getElementById("expression").value;
      var isInverseTrig = ["asin(x)", "acos(x)", "atan(x)", "acot(x)", "asec(x)", "acsc(x)"].includes(input);
  
      var expression, derivative;
      if (isInverseTrig) {
        // Handle inverse trigonometric function derivative
        derivative = getInverseTrigDerivative(input);
        expression = math.compile(input);
      } else {
        expression = math.compile(input);
        derivative = math.derivative(input, "x");
      }
  
      var xExpression = math.range(-10, 10, 0.5).toArray();
      var yExpression = xExpression.map(function (x) {
        return expression.evaluate({ x: x });
      });
      var xDerivative = math.range(-10, 10, 0.5).toArray();
      var yDerivative = xDerivative.map(function (x) {
        return math.evaluate(derivative, { x: x });
      });
  
      var trace1 = {
        x: xExpression,
        y: yExpression,
        mode: "lines",
        name: "y",
      };
      var trace2 = {
        x: xDerivative,
        y: yDerivative,
        mode: "lines",
        name: "y'",
      };
      var data = [trace1, trace2];
      var layout = {
        xaxis: { title: "x" },
        yaxis: { title: "y" },
      };
      var config = { responsive: true };
      document.getElementById("derivative").innerHTML = `\`y' = ${derivative}\``;
      MathJax.Hub.Typeset();
      Plotly.newPlot("plot", data, layout, config);
    } catch (error) {
      alert(error);
    }
  }
  
  MathJax = window.MathJax;
  MathJax.Hub.processSectionDelay = 0;
  MathJax.Hub.Config({
    messageStyle: "none",
  });
  window.onload = randomInput();
  document.getElementById("form").onsubmit = function (event) {
    event.preventDefault();
    userInput();
  };
  