document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.querySelector(".cart-items");
  const totalContainer = document.querySelector(".total");
  const clearCartBtn = document.querySelector(".clear-cart");

  // Get cart items from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to display all items
  function displayCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      totalContainer.textContent = "Total: Rs. 0";
      return;
    }

    cart.forEach((item, index) => {
      // agar qty undefined hai to 1 rakho
      const qty = item.qty || item.quantity || 1;
      const price = item.price || 0;

      total += price * qty;

      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <p>${item.name} — Price: Rs. ${price} — Qty: ${qty}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;
      cartContainer.appendChild(div);
    });

    totalContainer.textContent = `Total: Rs. ${total}`;

    // Remove button event
    const removeBtns = document.querySelectorAll(".remove-btn");
    removeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart(); // refresh list
      });
    });
  }

  // Clear Cart Button
  clearCartBtn.addEventListener("click", function () {
    localStorage.removeItem("cart");
    cart = [];
    displayCart();
  });

  // Show items on page load
  displayCart();
});

// Show item count near "Your Cart"
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.length;
  let heading = document.querySelector(".cart-title"); // Make sure <h2 class="cart-title">Your Cart 🛒</h2> likha ho HTML me
  if (heading) {
    heading.textContent = `Your Cart (${count}) 🛒`;
  }
}
updateCartCount();

// Go to contact page when Next button is clicked
const nextBtn = document.getElementById("next-page");
if (nextBtn) {
  nextBtn.addEventListener("click", function () {
    window.location.href = "contact.html";
});
}


