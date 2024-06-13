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
    "sin(x)",
    "cos(x)",
    "tan(x)",
    "cot(x)",
    "sec(x)",
    "csc(x)",
    "sinh(x)",
    "cosh(x)",
    "tanh(x)",
    "coth(x)",
    "sech(x)",
    "csch(x)"
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

function getTrigDerivative(input) {
  switch (input) {
      case "sin(x)":
          return "cos(x)";
      case "cos(x)":
          return "-sin(x)";
      case "tan(x)":
          return "sec(x)^2";
      case "cot(x)":
          return "-csc(x)^2";
      case "sec(x)":
          return "sec(x) * tan(x)";
      case "csc(x)":
          return "-csc(x) * cot(x)";
      default:
          throw new Error("Unknown trigonometric function");
  }
}

function getHyperbolicDerivative(input) {
  switch (input) {
      case "sinh(x)":
          return "cosh(x)";
      case "cosh(x)":
          return "sinh(x)";
      case "tanh(x)":
          return "sech(x)^2";
      case "coth(x)":
          return "-csch(x)^2";
      case "sech(x)":
          return "-sech(x) * tanh(x)";
      case "csch(x)":
          return "-csch(x) * coth(x)";
      default:
          throw new Error("Unknown hyperbolic function");
  }
}

function userInput() {
  try {
      var input = document.getElementById("expression").value;
      var isInverseTrig = ["asin(x)", "acos(x)", "atan(x)", "acot(x)", "asec(x)", "acsc(x)"].includes(input);
      var isTrig = ["sin(x)", "cos(x)", "tan(x)", "cot(x)", "sec(x)", "csc(x)"].includes(input);
      var isHyperbolic = ["sinh(x)", "cosh(x)", "tanh(x)", "coth(x)", "sech(x)", "csch(x)"].includes(input);

      var expression, derivative;
      if (isInverseTrig) {
          // Handle inverse trigonometric function derivative
          derivative = getInverseTrigDerivative(input);
          expression = math.compile(input);
      } else if (isTrig) {
          // Handle trigonometric function derivative
          derivative = getTrigDerivative(input);
          expression = math.compile(input);
      } else if (isHyperbolic) {
          // Handle hyperbolic function derivative
          derivative = getHyperbolicDerivative(input);
          expression = math.compile(input);
      } else {
          expression = math.compile(input);
          derivative = math.derivative(input, "x").toString();
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

  