// --- Seed default users if not already present ---
if (!localStorage.getItem("adminUser")) {
  localStorage.setItem("adminUser", JSON.stringify({
    username: "BaeRae@gmail.com",
    password: "suweet",
    role: "admin"
  }));
}

if (!localStorage.getItem("users")) {
  const users = [
    {
      username: "John@gmail.com",
      password: "password",
      role: "user"
    }
  ];
  localStorage.setItem("users", JSON.stringify(users));
}

// --- Handle login form submission ---
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      const admin = JSON.parse(localStorage.getItem("adminUser"));
      if (admin && admin.username === username && admin.password === password) {
        localStorage.setItem("loggedInUser", JSON.stringify(admin));
        window.location.href = "admin.html";
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = users.find(user => user.username === username && user.password === password);

      if (foundUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        window.location.href = "index.html";
      } else {
        alert("Invalid username or password");
      }
    });
  }

  // --- Handle user registration ---
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const newUser = {
        username: email,
        password: password,
        role: "user"
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registration successful! Please log in.");
      window.location.href = "login.html";
    });
  }
});
