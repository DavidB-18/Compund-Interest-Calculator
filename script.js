
var myChart = null;
// ================================
// STEP 1: READ VALUES FROM THE PAGE
// ================================

function calculate() { //START OF FUNCTION
  
    //Getting what the user type into each input 
    var principalInput = document.getElementById("principal").value;
    var rateInput = document.getElementById("rate").value;
    var yearsInput = document.getElementById("years").value;
    var frequencyInput = document.getElementById("frequency").value;
    

    //using parseFloat() turn text from the input into actual number 
    var P =  parseFloat(principalInput);
    var r =  parseFloat(rateInput) / 100;
    var t =  parseFloat(yearsInput);
    var n =  parseFloat(frequencyInput);


    if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n)) {
    return;
  } // if the the input of the following above are null do nothing.


     // ================================
  // STEP 2: THE FORMULA 
  // ================================

  var A = P * Math.pow((1 + r / n), n * t);
  var interestEarned = A - P;
  var multiplier = A / P;


   // ================================
  // STEP 3: SHOW RESULTS ON THE PAGE
  // ================================


  document.getElementById("final-balance").textContent = "₦" + Math.round(A).toLocaleString();
  document.getElementById("interest-earned").textContent = "₦" + Math.round(interestEarned).toLocaleString();
  document.getElementById("multiplier").textContent = multiplier.toFixed(1) + "x";

  // ================================
  // STEP 7: BUILD CHART DATA
  // ================================

  var labels = []
  var balances = []

  for (var year = 0; year <= t; year++) {
    var balanceAtYear = P * Math.pow((1 + r / n), n * year);
    labels.push(year);
    balances.push(Math.round(balanceAtYear));
  }

  // ================================
  // STEP 8: DRAW THE CHART
  // ================================

  if (myChart !== null) {
    myChart.destroy();
  }


  var ctx =document.getElementById("chart").getContext("2d");

   var chartData = {
    labels: labels,
    datasets: [
      {
        label: "Balance (₦)",
        data: balances,
        borderColor: "#378ADD",
        backgroundColor: "rgba(55, 138, 221, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        borderWidth: 1
      }
    ]
  };
  

  var chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 10000,
      easing: "easeInOutQuart"
    },
    plugins: {

      legend: {
        display: true
      }
      
    },
    
    scales: {
      y: {
        ticks: {
          callback: function(value){
            return "₦" + value.toLocaleString();
          }
        }
      }
    }

  };

  myChart = new Chart(ctx, {
    type: "line",
    data: chartData,
    options: chartOptions
  });

} // END OF FUNCTION
calculate();


// ================================
// STEP 6: LISTEN FOR CHANGES usind .addEventListener("", )
// ================================

document.getElementById("principal").addEventListener("input", calculate);
document.getElementById("rate").addEventListener("input", calculate);
document.getElementById("years").addEventListener("input", calculate);
document.getElementById("frequency").addEventListener("change", calculate);