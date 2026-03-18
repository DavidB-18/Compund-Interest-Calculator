// ================================
// STEP 1: READ VALUES FROM THE PAGE
// ================================

function calculate() {

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

}
calculate();