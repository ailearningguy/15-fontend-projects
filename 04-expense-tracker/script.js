const balanceNumber = document.getElementById("balance-number");
const incomeNumber = document.getElementById("income-number");
const expenseNumber = document.getElementById("expense-number");
const amountNumber = document.querySelector('input[name="amount"]');

const listTransactions = document.getElementById("list-transactions");
const transactionForm = document.getElementById("transaction-form");
const addBtn = document.getElementById("add-btn");

const stored = JSON.parse(localStorage.getItem("transactions") || "[]");
const transactionsData = stored;

function balanceCal() {
  let income = 0;
  let expenses = 0;
  let balance = 0;
  transactionsData.forEach((item) => {
    if (item.type === "income") {
      income += Number(item.amount);
    } else {
      expenses += Number(item.amount);
    }
    balance = income - expenses;
    incomeNumber.textContent = income.toLocaleString("vi-VN");
    expenseNumber.textContent = expenses.toLocaleString("vi-VN");
    balanceNumber.textContent = balance.toLocaleString("vi-VN");
  });
  console.log(balance);
}
function dataUpdateToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactionsData));
}
function addButtonHandler(ev) {
  let typeOfTrans = document.querySelector(
    'input[name="type-transaction"]:checked'
  )?.value;
  let descriptionInput = document.querySelector(
    'input[name="description"]'
  )?.value;
  let amountInput = document.querySelector('input[name="amount"]')?.value;
  console.log(amountInput);
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
      amount: Number(amountInput.replace(/[^\d]/g, "")),
    };
    transactionsData.push(dataItem);
    dataUpdateToLocalStorage();

    const list = document.createElement("li");
    list.classList.add("item", dataItem.type);
    list.setAttribute("data-trans-id", dataItem.transID);
    list.innerHTML = `<span class="transaction-name">${
      dataItem.description
    }</span
            ><span class="item-info-end"
              ><span class="transaction-amount">${dataItem.amount.toLocaleString(
                "vi-VN"
              )}</span
              ><span class="delete-btn"></span
            ></span>`;
    listTransactions.insertBefore(list, listTransactions.firstChild); // Chèn list mới vào đầu danh sách

    transactionForm.reset();
    balanceCal(); // Reset form khi nhấn nút Add Transaction
  }
}

function transactionRender() {
  listTransactions.innerHTML = "";
  transactionsData
    .slice()
    .reverse()
    .forEach((item) => {
      const list = document.createElement("li");
      list.classList.add("item", item.type);
      list.setAttribute("data-trans-id", item.transID);
      list.innerHTML = `<span class="transaction-name">${item.description}</span
            ><span class="item-info-end"
              ><span class="transaction-amount">${item.amount.toLocaleString(
                "vi-VN"
              )}</span
              ><span class="delete-btn"></span
            ></span>`;
      listTransactions.appendChild(list);
      const deleteBtn = document.querySelectorAll(".delete-btn");
      deleteBtn.forEach((elm) => {
        elm.addEventListener("click", deleteBtnHandler);
      });
    });
}

function inputFormat(e) {
  const raw = e.target.value;
  const digitsOnly = Number(raw.replace(/[^\d]/g, ""));
  const formatted = digitsOnly.toLocaleString("vi-VN");
  console.log(formatted, typeof formatted);
  e.target.value = formatted;
}

function deleteBtnHandler(e) {
  const deleteID =
    e.target.parentElement.parentElement.getAttribute("data-trans-id");
  const itemIndex = transactionsData.findIndex(
    (obj) => obj.transID === deleteID
  );
  console.log(itemIndex);
  transactionsData.splice(itemIndex, 1);
  dataUpdateToLocalStorage();
  e.target.parentElement.parentElement.remove();
  // transactionRender();
  balanceCal();
}

amountNumber.addEventListener("input", inputFormat);
addBtn.addEventListener("click", addButtonHandler);

transactionRender();

balanceCal();
