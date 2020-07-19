// loading Dom
document.addEventListener('DOMContentLoaded',loadDom);

// Load Dom function
function loadDom(e){
  hideResults();
  hideLoader();
}

// Hide Results
function hideResults(){
  // get UI elements
  const results =document.querySelector('#results');
  results.style.display = 'none';
}

// hide Loader
function hideLoader(){
  // get UI element
  const loader = document.querySelector('#loading');
  loader.style.display = 'none';
}

// Calculate button
document.querySelector('#loan-form').addEventListener('submit',function(e){
  // Hide the Result
  hideResults();
  // show Loader
  showLoader();

  // Calculate Results
  setTimeout(calculateResults,3000);
  
  e.preventDefault();
});

// Calculate Results
function calculateResults(){
  console.log('Calculate Results');
  // UI variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value)/100 /12;
  const calculatedPayments = parseFloat(years.value)*12;

  // Monthly Payment
  const x = Math.pow(1+calculatedInterest,calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly) && amount.value>0 && interest.value>0 && years.value>0){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly*calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);
    console.log(monthlyPayment.value,totalPayment.value,totalInterest.value);
    // Hide the Loader
    hideLoader();
    // show the Results
    showResults();


  }
  else{
    showError("Please Check in Numbers");
  }
  
}
// Show Loader
function showLoader(){
  // get UI element
  const loader = document.querySelector('#loading');
  loader.style.display = 'block';
}
// Show results
function showResults(){
  document.querySelector('#results').style.display ='block';
  showConfirmation();
}

// Show Confirmation of Results displayed
function showConfirmation(){
  const confirmation = document.createElement('div');
  confirmation.className = 'alert alert-success';
  confirmation.appendChild(document.createTextNode('Loan Amount Calculated'));
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  card.insertBefore(confirmation,heading);
  setTimeout(function(){
    document.querySelector('.alert-success').remove();
  },2000);
}

// showError Function
function showError(error){
  // Hide the Loader and results
  hideLoader();
  hideResults();

  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  // inserting it to the UI above loan calculator heading
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  card.insertBefore(errorDiv,heading);
  
  //Clear Error after 3 seconds
  setTimeout(clearError,3000);

  console.log(errorDiv);
}

// Clear Error function
function clearError(){
  document.querySelector('.alert').remove();
}