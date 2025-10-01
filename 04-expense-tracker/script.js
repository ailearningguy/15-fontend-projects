const balanceNumber = document.getElementById("balance-number");
const incomeNumber = document.getElementById("income-number");
const expenseNumber = document.getElementById("expense-number");

const listTransactions = document.getElementById("list-transactions");
const transactionForm = document.getElementById("transaction-form");
const addBtn = document.getElementById("add-btn");

const stored = JSON.parse(localStorage.getItem("transactions") || "[]");
const transactionsData = stored;

let income = Number(localStorage.getItem("income"));
let expenses = Number(localStorage.getItem("expenses"));
let balance = income - expenses;

function addButtonHandler(ev) {
  let typeOfTrans = document.querySelector(
    'input[name="type-transaction"]:checked'
  )?.value;
  let descriptionInput = document.querySelector(
    'input[name="description"]'
  )?.value;
  let amountInput = document.querySelector('input[name="amount"]')?.value;
  if (!typeOfTrans || !descriptionInput || !amountInput) {
    alert(`Bạn cần nhập đầy đủ thông tin:
    - Description
    - Amount
    - Income or Expense
    `);
  } else {
    const transRandID = () => Math.random().toString(36).substring(2);
    const type = typeOfTrans;
    const description = descriptionInput;
    const amount = amountInput;

    const dataItem = {
      transID: transRandID(),
      type: typeOfTrans,
      description: descriptionInput,
      amount: Number(amountInput),
    };
    transactionsData.push(dataItem);
    localStorage.setItem("transactions", JSON.stringify(transactionsData));

    const list = document.createElement("li");
    list.classList.add("item", dataItem.type);
    list.setAttribute("data-trans-id", dataItem.transID);
    list.innerHTML = `<span class="transacion-name">${dataItem.description}</span
            ><span class="item-info-end"
              ><span class="transaction-amount">${dataItem.amount}</span
              ><span class="delete-btn"></span
            ></span>`;
    listTransactions.insertBefore(list, listTransactions.firstChild);

    transactionForm.reset();
  }
}

function transactionRender() {
  transactionsData
    .slice()
    .reverse()
    .forEach((item) => {
      const list = document.createElement("li");
      list.classList.add("item", item.type);
      list.setAttribute("data-trans-id", item.transID);
      list.innerHTML = `<span class="transacion-name">${item.description}</span
            ><span class="item-info-end"
              ><span class="transaction-amount">${item.amount}</span
              ><span class="delete-btn"></span
            ></span>`;
      listTransactions.appendChild(list);
    });
}

addBtn.addEventListener("click", addButtonHandler);
transactionRender();
