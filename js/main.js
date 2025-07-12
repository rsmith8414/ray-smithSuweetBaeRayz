// --- [01_JavaScript_Fundamentals.pdf] Seed default users ---
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

// --- [06_Creating_Forms_Using_HTML.pdf] Handle Login & Registration Forms ---
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

  // --- [11_Working_with_Arrays.pdf] Render Menu Items Dynamically ---
  const menuItemsContainer = document.getElementById("menuItems");
  const menuItems = [
    { name: "Teriyaki Chicken", image: "TeryakiChicken.png", price: 8 },
    { name: "Spicy Red Better Brisket", image: "SpicyRedBetterBrisket.png", price: 8 },
    { name: "Pulled Pork Pretzel Bun", image: "PulledPorkPretzelBun.png", price: 8 },
    { name: "Parm Corn", image: "ParmCorn.png", price: 8 },
    { name: "Kona Salad", image: "KonaSalad.png", price: 8 },
    { name: "Dragon Breath Wings", image: "DragonBreathWings.png", price: 8 },
    { name: "Brewa Kahlua", image: "BrewaKahlua.png", price: 6 },
    { name: "SuweetBaeRayz Shirt", image: "SuweetShirt.png", price: 29.99 },
    { name: "Surf's Up Dude Shirt", image: "SurfShirt.png", price: 29.99 },
    { name: "Porky The Shirt", image: "PulledPorkshirt.png", price: 29.99 },
    { name: "Garlic Green Beans", image: "GarlicGreenBeans.png", price: 4.99 },
    { name: "Fresh Pineapple Juice", image: "FreshPineappleJuice.png", price: 8.99 }
  ];

  if (menuItemsContainer) {
    renderMenuItems(menuItems);
  }

  function renderMenuItems(items) {
    menuItemsContainer.innerHTML = "";
    items.forEach(item => {
      const card = document.createElement("div");
      card.className = "bg-white p-4 rounded-lg shadow hover:shadow-lg transition";

      card.innerHTML = `
        <img src="assets/${item.image}" alt="${item.name}" class="w-40 h-40 object-cover rounded-full mx-auto mb-3">
        <h3 class="text-lg font-semibold text-center">${item.name}</h3>
        <p class="text-sm text-gray-600 text-center mb-2">$${item.price.toFixed(2)}</p>
        <div class="text-center">
          <button class="bg-lime-600 text-white px-4 py-1 rounded hover:bg-lime-700 transition add-to-cart" data-name="${item.name}" data-price="${item.price}">
            Add to Cart
          </button>
        </div>
      `;
      menuItemsContainer.appendChild(card);
    });
  }

  // --- [12_Adding_Interactivity_with_DOM_Events.pdf] Handle Add to Cart ---
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart")) {
      const name = e.target.dataset.name;
      const price = parseFloat(e.target.dataset.price);

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({ name, price });
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`${name} added to cart!`);
    }
  });

  // --- [13_Applying_Text_Styling_Borders_and_Background_Images_in_HTML.pdf] Filter/Search Items ---
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm)
      );
      renderMenuItems(filteredItems);
    });
  }

  // --- [14_Working_with_Forms_and_Storage.pdf] Display Cart Items on Cart Page ---
  const cartContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (cartContainer && cartTotal) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price;
      const div = document.createElement("div");
      div.className = "flex justify-between items-center border-b py-2";
      div.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <button class="text-red-500 remove-item" data-index="${index}">Remove</button>
      `;
      cartContainer.appendChild(div);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  // --- [12_Adding_Interactivity_with_DOM_Events.pdf] Remove Items from Cart ---
  if (cartContainer) {
    cartContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("remove-item")) {
        const index = parseInt(e.target.dataset.index);
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      }
    });
  }
});
