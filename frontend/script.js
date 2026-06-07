


const apiURL = "http://localhost:4000/api";

// ================== Signup ==================
if (document.getElementById('signupForm')) {
  document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }

    try {
      await axios.post(`${apiURL}/signup`, { name, email, password });
      alert("Signup successful!");
      window.location.href = "index.html";
    } catch (err) {
      if (err.response?.status === 403) {
        alert("This email is already registered. Please log in instead!");
      } else {
        alert("Signup failed! Please try again.");
      }
      console.error("Signup error:", err.response?.data || err);
    }
  });
}

// ================== Login ==================
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }

    try {
      const res = await axios.post(`${apiURL}/login`, { email, password });
      alert("Login successful!");

      //  Save JWT token
      localStorage.setItem('token', res.data.token);

      window.location.href = "dashboard.html";
    } 
    catch (err) {
      if (err.response?.status === 401) {
        alert("Invalid email or password!");
      } else if (err.response?.status === 404) {
        alert("User not found! Please sign up first.");
      } else {
        alert("Login failed! Please try again.");
      }
      console.error("Login error:", err.response?.data || err);
    }
  });
}

// ================== Dashboard (Expenses) ==================
if (document.getElementById('expenseForm')) {
  const token = localStorage.getItem('token');
  const expenseAPI = `${apiURL}/expense`;

//   // Add Expense
document.getElementById('expenseForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const expenseamount = parseFloat(document.getElementById('expenseamount').value);
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  const token = localStorage.getItem('token');
  if (!token) {
    alert("No token found, please log in again!");
    window.location.href = "index.html";
    return;
  }
   try {
  const res = await axios.post(`${expenseAPI}/add-expense`, {
    amount: expenseamount,
    description,
    category
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });

  alert("Expense added successfully!");
  console.log("Expense:", res.data.expense);

  //  Refresh list and totals
  loadExpenses();
  fetchDailyTotal();
} catch (err) {
  console.error("Expense error:", err.response?.data || err);

}

});



async function loadExpenses() {
  try {
    const res = await axios.get(`${expenseAPI}/get-expenses`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const list = document.getElementById('expense-list');
    list.innerHTML = '';

    res.data.expenses.forEach(exp => {
      const li = document.createElement('li');
      li.textContent = `${exp.amount} - ${exp.category} - ${exp.description}`;

      const btn = document.createElement('button');
      btn.textContent = "Delete";
      btn.className = "delete-btn";

      btn.onclick = async () => {
        await axios.delete(`${expenseAPI}/delete-expense/${exp.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        loadExpenses();
        fetchDailyTotal();
      };

      li.appendChild(btn);
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading expenses:", err.response?.data || err);
  }
}



//   async function fetchDailyTotal() {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     alert("No token found, please log in again!");
//     window.location.href = "index.html";
//     return;
//   }

//   try {
//     const res = await axios.get("http://localhost:4000/api/expense/daily-total", {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     const total = res.data.dailyTotal;
//     document.getElementById('dailyTotal').innerText = `Today's Total: ₹${total}`;
//   } catch (err) {
//     console.error("Daily total error:", err.response?.data || err);
//     alert("Failed to fetch daily total!");
//   }
// }



  loadExpenses();
//   fetchDailyTotal();
}
