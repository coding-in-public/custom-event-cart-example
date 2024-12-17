// query selectors
const cartTotals = document.querySelectorAll("[data-cart-total]");
const products = document.querySelector("#products");

// event listeners
document.addEventListener("cart:update", (event) => {
  for (const cartTotal of cartTotals) {
    const newTotal = parseInt(cartTotal.textContent) + parseInt(event.detail);

    cartTotal.textContent = newTotal < 0 ? 0 : newTotal.toString();
  }
});

products.addEventListener("click", (event) => {
  if (!event.target.dataset.cartAction) {
    return;
  }

  // fire a custom event
  event.target.dispatchEvent(updateCartEvent(event.target.dataset.cartAction));
});

// Custom event constructor
const updateCartEvent = (cartAction) =>
  new CustomEvent("cart:update", {
    bubbles: true,
    detail: cartAction,
  });
