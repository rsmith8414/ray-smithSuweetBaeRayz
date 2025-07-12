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
  if (!loginForm) return;

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // FIXED: Match login.html input ID
    const username = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Check admin credentials
    const admin = JSON.parse(localStorage.getItem("adminUser"));
    if (admin && admin.username === username && admin.password === password) {
      localStorage.setItem("loggedInUser", JSON.stringify(admin));
      window.location.href = "admin.html";
      return;
    }

    // Check standard user credentials
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(user => user.username === username && user.password === password);

    if (foundUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      window.location.href = "index.html";
    } else {
      alert("Invalid username or password");
    }
  });
});
