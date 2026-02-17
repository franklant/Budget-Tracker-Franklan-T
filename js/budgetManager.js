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
let groceryAmounts = [];
let savingsAmounts = [];


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
    console.log(generalSpendingAmounts);

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
    console.log(groceryAmounts);

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
    console.log(savingsAmounts);

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

    checkBudgetExceeded(
        sumArray(savingsAmounts), 
        +(S_BUDGET.innerHTML), 
        document.getElementById("s-limit-exceeded")
    );
}

function clearGeneralSpending() {
    let children = GS_TABLE.children;

    generalSpendingAmounts = [];

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
    
    for (let i = children.length - 1; i >= 1; i--) {
        S_TABLE.removeChild(children.item(i));
    }

    checkBudgetExceeded(
        sumArray(savingsAmounts), 
        +(S_BUDGET.innerHTML), 
        document.getElementById("s-limit-exceeded")
    );
}