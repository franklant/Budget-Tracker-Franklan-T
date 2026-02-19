/////// DOM REFERENCES ///////
const GENERAL_SPENDING = document.getElementById("general-spending-container");
const GROCERIES = document.getElementById("groceries-container");
const SAVINGS = document.getElementById("savings-container");

// NOTE: tables could be stored within an array or object so multiple diverse tables can be created without more complexity
const GS_TABLE = document.getElementById("general-spending-table");
const G_TABLE = document.getElementById("grocery-table");
const S_TABLE = document.getElementById("savings-table");

// Get the limit display from the DOM
const GS_BUDGET = document.getElementById("general-spending-limit");
const G_BUDGET = document.getElementById("grocery-limit");
const S_BUDGET = document.getElementById("savings-limit");

/////// GLOBALS ///////
let gs_budget = 0;
let g_budget = 0;
let s_budget = 0;

let generalSpendingAmounts = [];
let generalSpendingNotes = [];

let groceryAmounts = [];
let groceryNotes = [];

let savingsAmounts = [];
let savingsNotes = [];

// retrieve previously set budget limits if available, on load.
window.onload = function() {
    // get budgets
    let generalSpendingBudget = localStorage.getItem("generalSpendingBudget");
    let groceryBudget = localStorage.getItem("groceryBudget");
    let savingsBudget = localStorage.getItem("savingsBudget");

    // get transaction amounts
    generalSpendingAmounts = JSON.parse(localStorage.getItem("generalSpendingAmounts"));
    groceryAmounts = JSON.parse(localStorage.getItem("groceryAmounts"));
    savingsAmounts = JSON.parse(localStorage.getItem("savingsAmounts"));

    // get transaction notes (there is most likely NO notes if there are NO transaction amounts)
    generalSpendingNotes = JSON.parse(localStorage.getItem("generalSpendingNotes"));
    groceryNotes = JSON.parse(localStorage.getItem("groceryNotes"));
    savingsNotes = JSON.parse(localStorage.getItem("savingsNotes"));

    // if a value has been retrieved, set it.
    if (generalSpendingBudget) {
        GS_BUDGET.innerHTML = generalSpendingBudget;
    }

    if (groceryBudget) {
        G_BUDGET.innerHTML = groceryBudget;
    }
    
    if (savingsBudget) {
        S_BUDGET.innerHTML = savingsBudget;
    }

    // if we got some data back, populate the table with the saved data.
    if (!generalSpendingAmounts) {
        generalSpendingAmounts = [];
        generalSpendingNotes = [];
    } else {     
        for (let i = 0; i < generalSpendingAmounts.length; i++) {
            // create the table elements
            let row = document.createElement("tr");
            let data1 = document.createElement("td");
            let data2 = document.createElement("td");

            // insert data to the table elements
            data1.innerHTML = generalSpendingAmounts[i];
            data2.innerHTML = generalSpendingNotes[i];

            // add new rows to the table
            row.insertBefore(data2, null);
            row.insertBefore(data1, data2);
            GS_TABLE.insertBefore(row, null);
        }
    }

    // if we got some data back, populate the table with the saved data.
    if (!groceryAmounts) {
        groceryAmounts = [];
        groceryNotes = [];
    } else {
        for (let i = 0; i < groceryAmounts.length; i++) {
            // create the table elements
            let row = document.createElement("tr");
            let data1 = document.createElement("td");
            let data2 = document.createElement("td");

            // insert data to the table elements
            data1.innerHTML = groceryAmounts[i];
            data2.innerHTML = groceryNotes[i];

            // add new rows to the table
            row.insertBefore(data2, null);
            row.insertBefore(data1, data2);
            G_TABLE.insertBefore(row, null);
        }
    }

    // if we got some data back, populate the table with saved data.
    if (!savingsAmounts) {
        savingsAmounts = [];
        savingsNotes = [];
    } else {
        for (let i = 0; i < savingsAmounts.length; i++) {
            // create the table elements
            let row = document.createElement("tr");
            let data1 = document.createElement("td");
            let data2 = document.createElement("td");

            // insert data to the table elements
            data1.innerHTML = savingsAmounts[i];
            data2.innerHTML = savingsNotes[i];

            // add new rows to the table
            row.insertBefore(data2, null);
            row.insertBefore(data1, data2);
            S_TABLE.insertBefore(row, null);
        }
    }
}


/////// FUNCTIONS ///////
function sumArray(array) {
    let sum = 0;

    for (let i = 0; i < array.length; i++) {
        let a = +(array[i]);

        if (isNaN(a)) {
            return Number.MIN_VALUE;    // error reading array
        }

        sum += a;
    }

    return sum;
}

function calculateAmountLeft() {
    // take the current budget amount and subtract the current transaction from it. 
    // return the new amount left

}

function checkBudgetExceeded(totalAmount, limit, limitExceededElement) {
    if (totalAmount > limit) {
        limitExceededElement.innerHTML = "Budget has been exceeded.";
    } else {
        limitExceededElement.innerHTML = "";
    }
}

function addGeneralSpendingEntry() {
    // code here . . .
    console.log("adding general spending entry");
    const ERROR = document.getElementById("error-message");

    let amountData = prompt("Enter the budget amount for [GENERAL SPENDING]: ");
    let noteData = prompt("Any additional notes?");

    // if the error message is already displayed, remove it
    if (ERROR) {
        GENERAL_SPENDING.removeChild(ERROR);
    }

    if (!amountData || isNaN(Number(amountData))) {
        let p = document.createElement("p");

        p.setAttribute("id", "error-message");
        p.innerHTML = "There was an error reading user input...";

        p.style.setProperty("color", "red");
        p.style.setProperty("font-style", "bold");

        GENERAL_SPENDING.insertBefore(p, GS_TABLE);
        return;
    }

    // if there wasn't any notes given by the user, return an empty string
    if (!noteData) {
        noteData = "";
    }

    // create row and data elements for the table
    let row = document.createElement("tr");
    let data1 = document.createElement("td");
    let data2 = document.createElement("td");

    // edit table data values
    data1.innerHTML = amountData;
    data2.innerHTML = noteData;

    // update amount array
    generalSpendingAmounts.push(amountData);
    generalSpendingNotes.push(noteData);
    console.log(generalSpendingAmounts);
    console.log(generalSpendingNotes);

    // save these arrays to local storage
    // use JSON.stringify to properly save array data and parse it later on
    localStorage.setItem("generalSpendingAmounts", JSON.stringify(generalSpendingAmounts));
    localStorage.setItem("generalSpendingNotes", JSON.stringify(generalSpendingNotes));

    // add new row to the table
    row.insertBefore(data2, null);
    row.insertBefore(data1, data2);
    GS_TABLE.insertBefore(row, null);

    checkBudgetExceeded(
        sumArray(generalSpendingAmounts), 
        +(GS_BUDGET.innerHTML), 
        document.getElementById("gs-limit-exceeded")
    );
}

function addGroceryEntry() {
    // code here . . .
    console.log("adding grocery entry");
    const ERROR = document.getElementById("error-message2");

    let amountData = prompt("Enter the transaction amount for [GROCERIES]: ");
    let noteData = prompt("Any additional notes?");

    // if the error message is already displayed, remove it
    if (ERROR) {
        GROCERIES.removeChild(ERROR);
    }

    if (!amountData || isNaN(Number(amountData))) {
        let p = document.createElement("p");

        p.setAttribute("id", "error-message2");
        p.innerHTML = "There was an error reading user input...";

        p.style.setProperty("color", "red");
        p.style.setProperty("font-style", "bold");

        GROCERIES.insertBefore(p, G_TABLE);
        return;
    }

    // if there wasn't any notes given by the user, return an empty string
    if (!noteData) {
        noteData = "";
    }

    // create row and data elements for the table
    let row = document.createElement("tr");
    let data1 = document.createElement("td");
    let data2 = document.createElement("td");

    // edit table data values
    data1.innerHTML = amountData;
    data2.innerHTML = noteData;

    // update amount array
    groceryAmounts.push(amountData);
    groceryNotes.push(noteData);
    console.log(groceryAmounts);
    console.log(groceryNotes);

    // save these arrays to local storage
    localStorage.setItem("groceryAmounts", JSON.stringify(groceryAmounts));
    localStorage.setItem("groceryNotes", JSON.stringify(groceryNotes));

    // add new row to the table
    row.insertBefore(data2, null);
    row.insertBefore(data1, data2);
    G_TABLE.insertBefore(row, null);

    checkBudgetExceeded(
        sumArray(groceryAmounts), 
        +(G_BUDGET.innerHTML), 
        document.getElementById("g-limit-exceeded")
    );
}

function addSavingEntry() {
    // code here . . .
    console.log("adding saving entry");
    const ERROR = document.getElementById("error-message3");

    let amountData = prompt("Enter the transaction amount for [SAVINGS]: ");
    let noteData = prompt("Any additional notes?");

    // if the error message is already displayed, remove it
    if (ERROR) {
        SAVINGS.removeChild(ERROR);
    }

    if (!amountData || isNaN(Number(amountData))) {
        let p = document.createElement("p");

        p.setAttribute("id", "error-message3");
        p.innerHTML = "There was an error reading user input...";

        p.style.setProperty("color", "red");
        p.style.setProperty("font-style", "bold");

        SAVINGS.insertBefore(p, S_TABLE);
        return;
    }

    // if there wasn't any notes given by the user, return an empty string
    if (!noteData) {
        noteData = "";
    }

    // create row and data elements for the table
    let row = document.createElement("tr");
    let data1 = document.createElement("td");
    let data2 = document.createElement("td");

    // edit table data values
    data1.innerHTML = amountData;
    data2.innerHTML = noteData;

    // update amount array
    savingsAmounts.push(amountData);
    savingsNotes.push(noteData);
    console.log(savingsAmounts);
    console.log(savingsNotes);

    // save these arrays to local storage
    localStorage.setItem("savingsAmounts", JSON.stringify(savingsAmounts));
    localStorage.setItem("savingsNotes", JSON.stringify(savingsNotes));

    // add new row to the table
    row.insertBefore(data2, null);
    row.insertBefore(data1, data2);
    S_TABLE.insertBefore(row, null);

    checkBudgetExceeded(
        sumArray(savingsAmounts), 
        +(S_BUDGET.innerHTML), 
        document.getElementById("s-limit-exceeded")
    );
}

function setGeneralSpendingLimit() {
    // code here . . .
    console.log("setting general spending limit");
    let newBudget = prompt("What is the new budget limit for [GENERAL SPENDING]?");

    if (!newBudget || isNaN(Number(newBudget))) {
        alert("There was an error reading the new budget...");
        return;
    }

    GS_BUDGET.innerHTML = newBudget;

    // save the new value in local storage
    localStorage.setItem("generalSpendingBudget", newBudget);

    checkBudgetExceeded(
        sumArray(generalSpendingAmounts), 
        +(GS_BUDGET.innerHTML), 
        document.getElementById("gs-limit-exceeded")
    );
}

function setGroceryLimit() {
    // code here . . .
    console.log("setting grocery limit");
    let newBudget = prompt("What is the new budget limit for [GROCERIES]?");

    if (!newBudget || isNaN(Number(newBudget))) {
        alert("There was an error reading the new budget...");
        return;
    }

    G_BUDGET.innerHTML = newBudget;

    // save the new value in local storage
    localStorage.setItem("groceryBudget", newBudget);

    checkBudgetExceeded(
        sumArray(groceryAmounts), 
        +(G_BUDGET.innerHTML), 
        document.getElementById("g-limit-exceeded")
    );
}

function setSavingsLimit() {
    // code here . . .
    console.log("setting savings limit");
    let newBudget = prompt("What is the new budget limit for [SAVINGS]?");

    if (!newBudget || isNaN(Number(newBudget))) {
        alert("There was an error reading the new budget...");
        return;
    }

    S_BUDGET.innerHTML = newBudget;

    // save the new value in local storage
    localStorage.setItem("savingsBudget", newBudget);

    checkBudgetExceeded(
        sumArray(savingsAmounts), 
        +(S_BUDGET.innerHTML), 
        document.getElementById("s-limit-exceeded")
    );
}

function clearGeneralSpending() {
    let children = GS_TABLE.children;

    generalSpendingAmounts = [];
    generalSpendingNotes = [];

    // save these arrays to local storage
    localStorage.setItem("generalSpendingAmounts", JSON.stringify(generalSpendingAmounts));
    localStorage.setItem("generalSpendingNotes", JSON.stringify(generalSpendingNotes));

    // due to this being a live list, the removal of one element will shift the other elements to fill in it's place. This causes items to be skipped when deleting.
    // Because of this it's better to delete items starting from the last element in the array, to avoid skipping any other element items. 
    for (let i = children.length - 1; i >= 1; i--) {
        GS_TABLE.removeChild(children.item(i));
    }

    checkBudgetExceeded(
        sumArray(generalSpendingAmounts), 
        +(GS_BUDGET.innerHTML), 
        document.getElementById("gs-limit-exceeded")
    );
}

function clearGroceries() {
    let children = G_TABLE.children;

    groceryAmounts = [];
    groceryNotes = [];

    // save these arrays to local storage
    localStorage.setItem("groceryAmounts", JSON.stringify(groceryAmounts));
    localStorage.setItem("groceryNotes", JSON.stringify(groceryNotes));
    
    for (let i = children.length - 1; i >= 1; i--) {
        G_TABLE.removeChild(children.item(i));
    }

    checkBudgetExceeded(
        sumArray(groceryAmounts), 
        +(G_BUDGET.innerHTML), 
        document.getElementById("g-limit-exceeded")
    );
}

function clearSavings() {
    let children = S_TABLE.children;

    savingsAmounts = [];
    savingsNotes = [];

    // save these arrays to local storage
    localStorage.setItem("savingsAmounts", JSON.stringify(savingsAmounts));
    localStorage.setItem("savingsNotes", JSON.stringify(savingsNotes));
    
    for (let i = children.length - 1; i >= 1; i--) {
        S_TABLE.removeChild(children.item(i));
    }

    checkBudgetExceeded(
        sumArray(savingsAmounts), 
        +(S_BUDGET.innerHTML), 
        document.getElementById("s-limit-exceeded")
    );
}