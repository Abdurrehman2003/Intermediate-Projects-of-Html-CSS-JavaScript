const state = {
  earnings: 0,
  expense: 0,
  net: 0,
  transactions: JSON.parse(localStorage.getItem("transactions")) || [],
};

let isUpdate = false;
let tid;

const transactionFormEl = document.getElementById("transactionForm");

const renderTransactions = () => {
  const transactionContainerEl = document.querySelector(".transactions");
  const netAmountEl = document.getElementById("netAmount");
  const earningEl = document.getElementById("earning");
  const expenseEl = document.getElementById("expense");

  const transactions = state.transactions;

  let earning = 0;
  let expense = 0;
  let net = 0;
  transactionContainerEl.innerHTML = "";

  transactions.forEach((transaction) => {
    const { id, amount, text, type, date, category } = transaction;
    const isCredit = type === "credit";
    const sign = isCredit ? "+" : "-";

    const transactionEl = `
    <div class="transaction" id="${id}">
      <div class="content" onclick="showEdit(${id})">
        <div class="left">
          <p>${text} (${category})</p>
          <p>${sign} Rs ${amount} (${date})</p> <!-- Changed ₹ to Rs -->
        </div>
        <div class="status ${isCredit ? "credit" : "debit"}">${isCredit ? "C" : "D"}</div>
      </div>
      <div class="lower">
        <div class="icon" onclick="handleUpdate(${id})">
          <img src="pen.svg" alt="edit" />
        </div>
        <div class="icon" onclick="handleDelete(${id})">
           <img src="trash (1).svg" alt="delete" />
        </div>
      </div>
    </div>`;


    earning += isCredit ? amount : 0;
    expense += !isCredit ? amount : 0;
    net = earning - expense;

    transactionContainerEl.insertAdjacentHTML("afterbegin", transactionEl);
  });

  netAmountEl.innerHTML = `Rs ${net}`;  // Changed ₹ to Rs
  earningEl.innerHTML = `Rs ${earning}`;  // Changed ₹ to Rs
  expenseEl.innerHTML = `Rs ${expense}`;  // Changed ₹ to Rs

  // Store updated transactions in localStorage
  localStorage.setItem("transactions", JSON.stringify(state.transactions));
};

const addTransaction = (e) => {
  e.preventDefault();

  const isEarn = e.submitter.id === "earnBtn";

  const formData = new FormData(transactionFormEl);
  const tData = {};
  formData.forEach((value, key) => {
    tData[key] = value;
  });

  const { text, amount, date, category } = tData;

  const transaction = {
    id: isUpdate ? tid : Math.floor(Math.random() * 1000),
    text,
    amount: +amount,
    date,
    category,
    type: isEarn ? "credit" : "debit",
  };

  if (isUpdate) {
    const tIndex = state.transactions.findIndex((t) => t.id === tid);
    state.transactions[tIndex] = transaction;
    isUpdate = false;
    tid = null;
  } else {
    state.transactions.push(transaction);
  }

  renderTransactions();
  transactionFormEl.reset();
};

const showEdit = (id) => {
  const selectedTransaction = document.getElementById(id);
  const lowerEl = selectedTransaction.querySelector(".lower");
  lowerEl.classList.toggle("showTransaction");
};

const handleUpdate = (id) => {
  const transaction = state.transactions.find((t) => t.id === id);
  const { text, amount, date, category } = transaction;

  document.getElementById("text").value = text;
  document.getElementById("amount").value = amount;
  document.getElementById("date").value = date;
  document.getElementById("category").value = category;

  tid = id;
  isUpdate = true;
};

const handleDelete = (id) => {
  const filteredTransaction = state.transactions.filter((t) => t.id !== id);
  state.transactions = filteredTransaction;

  renderTransactions();
};

const filterTransactions = () => {
  const category = document.getElementById("categoryFilter").value;
  const filteredTransactions =
    category === "all"
      ? JSON.parse(localStorage.getItem("transactions")) || []
      : state.transactions.filter((t) => t.category === category);

  state.transactions = filteredTransactions;
  renderTransactions();
};

const clearAllTransactions = () => {
  if (confirm("Are you sure you want to clear all transactions?")) {
    state.transactions = [];
    localStorage.removeItem("transactions");
    renderTransactions();
  }
};

renderTransactions();

transactionFormEl.addEventListener("submit", addTransaction);
