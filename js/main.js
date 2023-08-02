const availableProducts = [
  { id: "dress", title: "Dress Grey Square ", price: 5000, img: "dressgreysquare.webp" },
  { id: "shirt", title: "Shirt Butterfly", price: 2000, img: "shirt-butterfly.jpg" },
  { id: "pants", title: "Pant Bordeaux", price: 3000, img: "pant-bordeaux.jpg" },
];
let productCart = [];

const validateQuantity = (quantity) => {
  return !isNaN(quantity) && quantity > 0;
};

const calculateCartTotal = () => {
  return productCart.reduce((total, item) => total + item.subtotal, 0);
};

const calculateCartCount = () => {
  return productCart.reduce((count, item) => count + item.quantity, 0);
};

const findProductById = (productId) => {
  return availableProducts.find((product) => product.id.toLowerCase() === productId.toLowerCase());
};

const addToCart = (product, quantity) => {
  const existingProduct = productCart.find((item) => item.product.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += quantity;
    existingProduct.subtotal = product.price * existingProduct.quantity;
  } else {
    const subtotal = product.price * quantity;
    productCart.push({ product, quantity, subtotal });
  }
  return productCart;
};

const removeFromCart = (productId) => {
  Swal.fire({
    title: "Are you sure to revome this product?",
    text: "You won't be able to revert this!",
    color: "#000",
    background: "#fff",
    position: "center",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const product = findProductById(productId);
      productCart = productCart.filter((item) => item.product.id !== product.id);

      saveCart();
      renderCart();

      Swal.fire("Deleted!", "Your product has been deleted.", "success");
    }
  });
};

const renderCart = () => {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  const finishPurchaseButton = document.getElementById("finish-purchase");
  const totalContainer = document.getElementById("total-container");

  if (productCart.length > 0) {
    document.getElementById("cart-empty").style.display = "none";
    finishPurchaseButton.style.display = "flex";
    totalContainer.style.display = "flex";
  } else {
    document.getElementById("cart-empty").style.display = "flex";
    finishPurchaseButton.style.display = "none";
    totalContainer.style.display = "none";
  }

  productCart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-container";

    cartItem.innerHTML = `<div class="image-cart">
          <img src="/assets/products/${item.product.img}" alt="" />
        </div>
        <div class="products-container">
          <div>
            <h2>${item.product.title}</h2>
          </div>
          <div>
            <h2>Quantity: ${item.quantity}</h2>
          </div>
          <div>
            <h2>Price: $${item.product.price}</h2>
          </div>
          <div>
            <h2>Subtotal: $${item.subtotal}</h2>
          </div>
          <div><button onclick="removeFromCart('${item.product.id}')" class="btn btn-success">Remove</button></div>
        </div>`;
    cartItems.appendChild(cartItem);
  });

  const total = calculateCartTotal(productCart);
  const cartTotal = document.getElementById("cart-total");
  cartTotal.innerHTML = total;

  const count = calculateCartCount(productCart);
  const cartCount = document.getElementById("cart-count");
  cartCount.innerHTML = count;
};

const saveCart = () => {
  const cartString = JSON.stringify(productCart);
  localStorage.setItem("cart", cartString);
};

const loadCart = () => {
  const cartString = localStorage.getItem("cart") || "[]";
  productCart = JSON.parse(cartString);

  const finishPurchaseButton = document.getElementById("finish-purchase");
  const totalContainer = document.getElementById("total-container");

  if (productCart.length <= 0) {
    finishPurchaseButton.style.display = "none";
    totalContainer.style.display = "none";
  } else if (productCart.length > 0) {
    finishPurchaseButton.style.display = "flex";
    totalContainer.style.display = "flex";
  }
};

const buyProduct = (productId) => {
  const product = findProductById(productId);

  const quantityInput = document.getElementById(`${product.id}-quantity`);
  const quantity = parseInt(quantityInput.value);

  if (!validateQuantity(quantity)) {
    Swal.fire({
      title: "Please enter a valid quantity",
      icon: "error",
      Text: "You must enter a number greater than 0",
      color: "#000",
      background: "#fff",
      confirmButtonText: "Ok",
      position: "top",
      timer: 6000,
    });
    return;
  }

  addToCart(product, quantity);
  saveCart();
  renderCart();

  quantityInput.value = "";
};

const renderProducts = () => {
  const productsSection = document.getElementById("products");

  availableProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "col-lg-4 col-md-6 col-sm-12";

    card.innerHTML = `<div class="card">
        <img src="/assets/products/${product.img}" class="card-img-top" alt="shirt" />
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <h5 class="card-title">$${product.price}</h5>
          <div class="input-group mb-3">
            <label class="input-group-text">
              Quantity
            </label>
            <input id="${product.id}-quantity" type="number" min="0" class="form-control" placeholder="0" />
          </div>
          <button onclick="buyProduct('${product.id}')" class="btn btn-success">
            Add to cart
          </button>
        </div>
      </div>`;
    productsSection.appendChild(card);
  });
};

const finishPurchase = () => {
  productCart = [];
  saveCart();
  renderCart();

  Toastify({
    text: "Your purchase has been completed successfully",
    newWindow: true,
    close: true,
    gravity: "top",
    duration: 6000,
    position: "center",
    backgroundColor: "linear-gradient(to right, #e5989b, #e5989b)",
    stopOnFocus: true,
  }).showToast();
};

window.onload = () => {
  // console.log("The page has been loaded");
  renderProducts();
  loadCart();
  renderCart();
};


