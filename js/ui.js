// cart ui
const cartItems = document.getElementById("cart-items");
const finishPurchaseButton = document.getElementById("finish-purchase");
const removeItemsButton = document.getElementById("clear-cart");
const totalContainer = document.getElementById("total-container");
const cartEmpty = document.getElementById("cart-empty");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
// products ui
const productQuantityInput = (product) => document.getElementById(`${product.id}-quantity`);
const productsSection = document.getElementById("products");
