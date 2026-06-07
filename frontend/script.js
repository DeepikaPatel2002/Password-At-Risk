

const apiURL = "http://localhost:4000/api";

// Signup
if (document.getElementById('signupForm')) {
  document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }

    axios.post(`${apiURL}/signup`, { name, email, password })
      .then(res => {
        alert("Signup successful!");
        window.location.href = "index.html";
      })
      .catch(err => {
        if (err.response && err.response.status === 403) {
          alert("This email is already registered. Please log in instead!");
        } else {
          alert("Signup failed! Please try again.");
        }
        console.error("Signup error:", err.response?.data || err);
      });
  });
}

// Login
if (document.getElementById('loginForm')) {

  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }

    axios.post(`${apiURL}/login`, { email, password })
      .then(res => {
        alert("Login successful!");
        window.location.href = "dashboard.html";
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          alert("Invalid email or password!");
        } else if (err.response && err.response.status === 404) {
          alert("User not found! Please sign up first.");
        } else {
          alert("Login failed! Please try again.");
        }
        console.error("Login error:", err.response?.data || err);
      });
  });
}




// const apiURL = "http://localhost:4000/api";

// // Signup
// const signupForm = document.getElementById('signupForm');
// if (signupForm) {
//   signupForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     console.log("Signup button clicked");

//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     if (!name || !email || !password) {
//       alert("All fields are required!");
//       return;
//     }

//     try {
//       const res = await axios.post(`${apiURL}/signup`, { name, email, password });
//       alert("Signup successful!");
//       window.location.href = "index.html";
//     } catch (err) {
//       console.error("Signup error:", err.response?.data || err);
//       alert(err.response?.data?.message || "Signup failed!");
//     }
//   });
// }

// // Login
// const loginForm = document.getElementById('loginForm');
// if (loginForm) {
//   loginForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     console.log("Login button clicked");

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     if (!email || !password) {
//       alert("Please enter both email and password!");
//       return;
//     }

//     try {
//       const res = await axios.post(`${apiURL}/login`, { email, password });
//       alert("Login successful!");
//       window.location.href = "dashboard.html";
//     } catch (err) {
//       console.error("Login error:", err.response?.data || err);
//       if (err.response?.status === 401) {
//         alert("Invalid email or password!");
//       } else if (err.response?.status === 404) {
//         alert("User not found! Please sign up first.");
//       } else {
//         alert("Login failed! Please try again.");
//       }
//     }
//   });
// }