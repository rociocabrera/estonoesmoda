const renderProducts = () => {
  availableProducts.forEach(({ id, img, title, price }) => {
    const card = document.createElement("div");
    card.className = "col-lg-4 col-md-6 col-sm-12";

    card.innerHTML = `<div class="card">
        <img src="assets/products/${img}" class="card-img-top" alt="shirt" />
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <h5 class="card-title">$${price}</h5>
          <div class="input-group mb-3">
            <label class="input-group-text">
              Quantity
            </label>
            <input id="${id}-quantity" type="number" min="0" class="form-control" placeholder="0" />
          </div>
          <button onclick="buyProduct('${id}')" class="btn btn-success">
            Add to cart
          </button>
        </div>
      </div>`;
    productsSection.appendChild(card);
  });
};

const validateQuantity = (quantity) => {
  return !isNaN(quantity) && quantity > 0;
};

const calculateCartTotal = () => {
  return productCart.reduce((total, { subtotal }) => total + subtotal, 0);
};

const calculateCartCount = () => {
  return productCart.reduce((count, { quantity }) => count + quantity, 0);
};

const findProductById = (productId) => {
  return availableProducts.find((product) => product.id.toLowerCase() === productId.toLowerCase());
};

const buyProduct = (productId) => {
  const product = findProductById(productId);
  const quantityInput = productQuantityInput(product);
  const quantity = parseInt(quantityInput.value);

  if (!validateQuantity(quantity)) {
    showQuantityValidationAlert();
    return;
  }

  addToCart(product, quantity);
  saveCart();
  renderCart();

  quantityInput.value = "";
};
