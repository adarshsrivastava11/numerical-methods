var fX;
var simplified;
var nonLinearFunction;
var numberOfIterations;
var numberOfIterations;
var maximumRelativeError;

var list_false_postion = [];
var list_fixed_point = [];
var list_bisection = [];
var list_newton = [];
var list_muller = [];
var list_secant = [];

function bisection(){
  var x1 = document.getElementById('x1').value;
  var x2 = document.getElementById('x2').value;
  var i;
  var x3;
  x3 = (parseFloat(x1)+parseFloat(x2))/2;
  for(i=0;i<numberOfIterations;i++){
    var x3C = x3;
    var fX3 = simplified.eval({x: x3});
    if(fX3 > 0){
      x2 = x3;
    }
    if(fX3 < 0){
      x1 = x3;
    }
    console.log(x3);
    x3 = (parseFloat(x1)+parseFloat(x2))/2;
    var error = Math.abs((x3-x3C)/x3*100);
    list_bisection.push({iteration: (i+1),relativeError:error});
    if(error < maximumRelativeError && error != 0){
      console.log("Root is = "+x3);
      document.getElementById('root').innerHTML = x3;
      break;
    }
  }
  console.log(list_bisection);
  plotError(list_bisection);
}

function flasePosition(){
  var x1 = document.getElementById('x1').value;
  var x2 = document.getElementById('x2').value;
  var x3 = x1;
  for(i=0;i<numberOfIterations;i++){
    var x3prime = x3;
    x3 = (x1*simplified.eval({x: x2}) - x2*simplified.eval({x: x1}))/ (simplified.eval({x: x2}) - simplified.eval({x: x1}));

    if (simplified.eval({x: x3})*simplified.eval({x: x1}) < 0)
        x2 = x3;
    else
        x1 = x3;
    var error = Math.abs((x3-x3prime)/x3*100);
    list_false_postion.push({iteration: (i+1),relativeError:error});
    if(error < maximumRelativeError && error != 0){
      console.log("Root is = "+x3);
      document.getElementById('root').innerHTML = x3;
      break;
    }

  }
  console.log(list_false_postion);
  plotError(list_false_postion);

}


function fixedPoint(){
  var phiX = math.parse(document.getElementById('phi').value);
  var simplifiedPhiX = math.simplify(phiX);
  var x1 = document.getElementById('x1').value;
  var i;
  var phiX2 = simplifiedPhiX.eval({x: x1});
  for(i=0;i<numberOfIterations;i++){
    var phiX2C = phiX2;
    phiX2 = simplifiedPhiX.eval({x: x1});
    console.log(phiX2);
    x1 = phiX2;
    var error = Math.abs((phiX2-phiX2C)/phiX2*100);
    list_fixed_point.push({iteration: (i+1),relativeError:error});
    if(error < maximumRelativeError && error != 0){
      console.log("Root is = "+phiX2);
      document.getElementById('root').innerHTML = phiX2;
      break;
    }
  }
  console.log(list_fixed_point);
  plotError(list_fixed_point);
}


function secant(){
  var x1 = document.getElementById('x1').value;
  var x2 = document.getElementById('x2').value;
  var i;
  var fX1 = simplified.eval({x: x1});
  var fX2 = simplified.eval({x: x2});
  var x3 = x2 - (fX2*(x1-x2)/(fX1-fX2));
  for(i=0;i<numberOfIterations;i++){
    var error = Math.abs((x3-x2)/x3*100);
    x1 = x2; x2 = x3;
    x3 = x2 - (fX2*(x1-x2)/(fX1-fX2));
    list_secant.push({iteration: (i+1),relativeError:error});
      if(error < maximumRelativeError && error != 0){
        console.log("Root is = "+x3);
        document.getElementById('root').innerHTML = x3;
        break;
      }
  }
  console.log(list_secant);
  plotError(list_secant);
}


function newton(){
  var fXprime = math.parse(document.getElementById('fxprime').value);
  var simplifiedfXprime = math.simplify(fXprime);
  var x1 = document.getElementById('x1').value;
  var i;
  var fX1 = simplified.eval({x: x1});
  var fXprime1 = simplifiedfXprime.eval({x: x1});
  var x2 = x1 - (fX1/fXprime1);
  for(i=0;i<numberOfIterations;i++){
    var error = Math.abs((x2-x1)/x2*100);
    x1 = x2;
    fX1 = simplified.eval({x: x1});
    fXprime1 = simplifiedfXprime.eval({x: x1});
    x2 = x1 - (fX1/fXprime1);
    list_newton.push({iteration: (i+1),relativeError:error});
      if(error < maximumRelativeError && error != 0){
        console.log("Root is = "+x2);
        document.getElementById('root').innerHTML = x2;
        break;
      }
  }
  console.log(list_newton);
  plotError(list_newton);
}


function muller(){
  var x1 = document.getElementById('x1').value;
  var x2 = document.getElementById('x2').value;
  var x3 = document.getElementById('x3').value;
  var x3prime;
  var i,li,di,mu,s,l,x4;
  for(i=0;i<numberOfIterations;i++){
    x3prime = x3;
    li = (x3 - x2) / (x2 - x1);
    di = (x3 - x1) / (x2 - x1);
    mu = (simplified.eval({x: x1}))*li*li-(simplified.eval({x: x2}))*di*di+(simplified.eval({x: x3}))*(di+li);
    s = Math.sqrt((mu*mu - 4*(simplified.eval({x: x3}))*di*li*(simplified.eval({x: x1})*li - simplified.eval({x:x2})*di + simplified.eval({x:x3}))));
    if (mu < 0)
        l = (2*simplified.eval({x:x3})*di)/(-mu+s);
    else
        l = (2*simplified.eval({x:x3})*di)/(-mu-s);
      x4 = x3 + l*(x3 - x2);
      x1 = x2;
      x2 = x3;
      x3 = eval(x4);
      console.log(x1+" "+x2+" "+x3);
      var error = Math.abs((x4-x3prime)/x4*100);
      list_muller.push({iteration: (i+1),relativeError:error});
      if(error < maximumRelativeError && error != 0){
        console.log("Root is = "+x2);
        document.getElementById('root').innerHTML = x4;
        break;
      }
  }
  console.log(list_muller);
  plotError(list_muller);
}


function draw() {
  try {
    functionPlot({
      target: '#plot',
      data: [{
        fn: document.getElementById('eq').value,
        sampler: 'builtIn',  // this will make function-plot use the evaluator of math.js
        graphType: 'polyline'
      }]
    });
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
}


function plotError(errorArray){
  var i;
  var size = errorArray.length;
  var x = [];
  var y = [];
  for(i=0;i<size;i++){
    x.push(errorArray[i].iteration);
    y.push(errorArray[i].relativeError);
  }
  var trace1 = {
    x: x,
    y: y,
    type: 'scatter'
  };
  var data = [trace1];
  var layout = {
    title: ' % Relative Error',
    yaxis: {
      title: '% Relative Error (log scale)',
      type: 'log',
      autorange: true
    },
    xaxis: {
      title: 'Number of Iterations',
    }
  };
  Plotly.newPlot('errorPlot', data,layout);
}

function compute() {
  maximumRelativeError = document.getElementById('maximumRelativeError').value;
  numberOfIterations = document.getElementById('numberOfIterations').value;
  nonLinearFunction = document.getElementById('eq').value;
  fX = math.parse(nonLinearFunction);
  simplified = math.simplify(fX);
  draw();
  var e = document.getElementById("methods");
  var method = e.options[e.selectedIndex].value;
  console.log(method);
  if (method == "bisection")
    bisection();
  else if (method == "falseposition")
    flasePosition();
  else if (method == "fixedpoint")
    fixedPoint();
  else if (method == "secant")
    secant();
  else if (method == "newton")
    newton();
  else if (method == "muller")
    muller();
  else
    alert("Choose Wisely");
}
