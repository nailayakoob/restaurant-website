  /*const menuItems = [
  { name: "Broast", description: "Crispy fried chicken served with fries and sauce.", price: 400, image: "broast.jpg" },
  { name: "Margherita Pizza", description: "Classic cheese pizza with tomato sauce.", price: 900, image: "pizza marg.jpeg" },
  { name: "Crispy Fries", description: "Golden and crunchy potato fries.", price: 250, image: "crispy fries.webp" },
  { name: "Club Sandwich", description: "Grilled sandwich with layers of meat and veggies.", price: 600, image: "club sandwich.jpg" },
  { name: "Chicken Cheese Paratha", description: "Hot & flaky paratha with chicken cheese goodness.", price: 350, image: "chicken cheese paratha.jpeg" },
  { name: "Cheese Burger", description: "Juicy beef patty with melted cheese.", price: 500, image: "cheese burger.jpg" },
  { name: "Chicken Chowmein", description: "Delicious stir-fried noodles with chicken and vegetables.", price: 600, image: "chow mein.jpeg" },
  { name: "Mayo Roll", description: "Soft paratha roll filled with spicy chicken and mayo.", price: 300, image: "mayo roll.jpeg" },
  { name: "Nuggets", description: "Hot, crispy, juicy Nuggets!", price: 500, image: "nuggets.jpg" },
  { name: "White Sauce Pasta", description: "Rich, cheesy & creamy white sauce pasta.", price: 700, image: "white-sauce-pasta.webp" },
  { name: "Fried Chicken Wings", description: "Crispy outside, tender inside — pure wings joy.", price: 450, image: "fried-chicken-wings.jpg" },
  { name: "Zinger Burger", description: "Zinger that brings the heat and the flavour.", price: 450, image: "zinger-burger.jpg" },
  { name: "Chicken Mozrella Sticks", description: "Melting cheese wrapped in crispy chicken goodness.", price: 350, image: "chicken mozrella sticks.jpg" },
  { name: "Lazania", description: "Layered with flavour, loaded with cheese.", price: 800, image: "lazania.jpg" },
  { name: "Aloo Paratha", description: "Spicy and fluffy paratha filled with masala magic.", price: 150, image: "aloo paratha.jpeg" },
  { name: "Cold Drink", description: "Refreshing soft drink to complete your meal.", price: 120, image: "coca.jpeg" },
  { name: "Beef Burito", description: "A beef burrito is a dish made with a warm flour tortilla filled with seasoned ground or shredded beef and other ingredients like rice, beans, and cheese", price: 550, image: "beef burito.png" },
    { name: "Beef Burito", description: "", price: 550, image: "beef burito.png" }


];

 // Select the grid container
let grid = document.querySelector('.menu-grid');

// Generate cards dynamically
menuItems.forEach(item => {
  let card = document.createElement('div');
  card.className = 'menu-item';
  
  card.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>${item.description}</p>
    <div class="price">Rs. ${item.price}</div>
    <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">
      Add to Cart
    </button>
  `;
  
  grid.appendChild(card);
}); */




document.addEventListener("DOMContentLoaded", () => {
  // ======== ADD TO CART ========
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));

      // Get existing cart from localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if item already in cart
      const existingItem = cart.find((item) => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      // Save back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      //alert(`${name} added to your cart!`);//
      window.location.href="cart.html";
    });
  });

  // ======== SHOW CART ITEMS (for cart.html only) ========
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const clearCartButton = document.getElementById("clear-cart");

  if (cartItemsContainer) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      itemDiv.innerHTML = `
        <h3>${item.name}</h3>
        <p>Price: Rs. ${item.price}</p>
        <p>Qty: ${item.quantity}</p>
        <button class="remove-item" data-index="${index}">Remove</button>
        <hr>
      `;
      cartItemsContainer.appendChild(itemDiv);
      total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Total: Rs. ${total}`;

    // Remove item functionality
    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        removeItem(index);
      });
    });

    // Clear cart functionality
    if (clearCartButton) {
      clearCartButton.addEventListener("click", () => {
        localStorage.removeItem("cart");
        cartItemsContainer.innerHTML = "";
        totalPriceElement.textContent = "Total: Rs. 0";
      });
    }
  }

  // ======== REMOVE ITEM FUNCTION ========
  function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}
});

  // 👇 Go to contact page from cart
const nextButton = document.getElementById("next-page");
if (nextButton) {
  nextButton.addEventListener("click", () => {
    window.location.href = "contact.html";
});
}
 
// ===== CONTACT FORM SUBMIT AND CLEAR CART =====
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Page reload na ho
      alert("✅ Message Sent Successfully!");
      contactForm.reset(); // Form clear
      localStorage.removeItem("cart"); // Cart clear
      console.log("Cart cleared after submitting contact form");
});
}
});

// ===== BACK TO TOP BUTTON FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.getElementById("backToTop");

  // Check if button exists (to avoid errors on pages without it)
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
});
}
});