var maximumRelativeError;
var numberOfIterations;
var nonLinearFunction;
var fX;
var simplified;
var list_bisection = [];
var list_fixed_point = [];
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
    // console.log("Error = "+error);
    list_bisection.push({iteration: (i+1),relativeError:error});
    if(error < maximumRelativeError && error != 0){
      console.log("Root is - "+x3);
      document.getElementById('root').innerHTML = x3;
      break;
    }
  }
  console.log(list_bisection);
  plotError(list_bisection);
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
		list_fixed_point.push({iteration: (i+1),relativeError:error});
    	if(error < maximumRelativeError && error != 0){
        console.log("Root is = "+x2);
        document.getElementById('root').innerHTML = x2;
        break;
    	}
  }
  console.log(list_fixed_point);
  plotError(list_fixed_point);
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
  xaxis: {
    type: 'log',
    autorange: true
  }
};
  Plotly.newPlot('errorPlot', data,layout);
}

document.getElementById('form').onsubmit = function (event) {
  maximumRelativeError = document.getElementById('maximumRelativeError').value;
  numberOfIterations = document.getElementById('numberOfIterations').value;
  nonLinearFunction = document.getElementById('eq').value;
  fX = math.parse(nonLinearFunction);
  simplified = math.simplify(fX);
  event.preventDefault();
  draw();
  // bisection();
  // fixedPoint();
  newton();
};
