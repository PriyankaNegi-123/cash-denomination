'use strict'

const billAmount = document.getElementById("bill-amount");
const amountPaid = document.getElementById("amount-paid");
const btnCalculate = document.getElementById("btn-calculate");
const errorMessage = document.getElementById("error-message");
const successContainer = document.getElementById("success-container");
const successMessage = document.getElementById("success-message");

const denominations = [2000, 500, 200, 100, 50, 20, 10, 5, 1];
let denominationCount = [];

const showErrorMessage = function(message){
    successContainer.style.display = "none";
    errorMessage.style.display = "block";
    errorMessage.innerText = message;
}

const showSuccessMessage = function(message){
    errorMessage.style.display = "none";
    successContainer.style.display = "block";
    successMessage.innerText = message;
}

const calculateDenomination = function(change){
    for(let i = 0; i<denominations.length; i++){
        denominationCount.push(Math.trunc(change/denominations[i]));
        change = change % denominations[i];
    } 
};

const displayUI = function (){
    const listEl = document.createElement("ul");
    listEl.classList.add("denomination");
    successContainer.appendChild(listEl);

    for(let i=0; i<denominations.length; i++){
        const listItem = document.createElement("li");
        listItem.classList.add("list-item");
        listEl.appendChild(listItem);
        listItem.innerHTML=
        `<p class="denomination-value">₹${denominations[i]}</p>
        <p class="denomination-count">${denominationCount[i]}</p>`;
    }
}; 

btnCalculate.addEventListener("click", () =>{
   
    const billValue = Number(billAmount.value);
    const paidValue = Number(amountPaid.value);
    const change = paidValue - billValue;
    billAmount.value= null;
    amountPaid.value= null;


    
    if(billValue > 0 && paidValue > 0){
        if(change >= 0){
            // success Message
            showSuccessMessage(`Your bal is ₹${change}`);
            // cal denomination
            calculateDenomination(change);
            // display UI
            displayUI();
        }
        else{
            showErrorMessage("You should pay more");
        }
    } else{
        showErrorMessage("Enter valid bill & amount");
    }
});