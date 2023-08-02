const availableProducts = [
  { id: "grey-dress", title: "Grey Square Dress ", price: 5000, img: "dressgreysquare.webp" },
  { id: "scorpion-dress", title: "Scorpion Dress", price: 6000, img: "scorpion-dress.jpg" },
  { id: "spring-dress", title: "Spring Dress", price: 7000, img: "spring-dress.jpg" },
  { id: "butterfly-shirt", title: "Butterfly Shirt", price: 2000, img: "shirt-butterfly.jpg" },
  { id: "black-shirt", title: "Black Shirt", price: 3000, img: "black-shirt.jpg" },
  { id: "pink-shirt", title: "Bby Pink Shirt", price: 4000, img: "bby-pink-shirt.jpg" },
  { id: "bordeaux-pant", title: "Bordeaux Pant", price: 3000, img: "pant-bordeaux.jpg" },
  { id: "brown-pant", title: "Brown Square Pant", price: 4000, img: "brown-pant-square.jpg" },
  { id: "blue-pant", title: "Blue Jean", price: 5000, img: "bluejeans.jpg" },
];
let productCart = [];

const cartItems = document.getElementById("cart-items");
const finishPurchaseButton = document.getElementById("finish-purchase");
const totalContainer = document.getElementById("total-container");
const cartEmpty = document.getElementById("cart-empty");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const productQuantityInput = (product) => document.getElementById(`${product.id}-quantity`);
const productsSection = document.getElementById("products");

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
  const product = findProductById(productId);
  productCart = productCart.filter((item) => item.product.id !== product.id);
  saveCart();
  renderCart();
};

const showRemoveConfirmation = (productId) => {
  Swal.fire({
    icon: "warning",
    title: "Are you sure to revome this product?",
    customClass: {
      title: "swal2-title",
    },
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    // text: "You won't be able to revert this!",
    color: "#000",
    background: "#fff",
    position: "top-end",
    customClass: "swal-wide",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      removeFromCart(productId);
      Swal.fire({
        title: "Deleted!",
        text: "Your product has been deleted.",
        icon: "success",
        color: "#000",
        background: "#fff",
        position: "top-end",
        customClass: "swal-wide",
      })("Deleted!", "Your product has been deleted", "success");
    }
  });
};

const toggleCartButtons = () => {
  if (productCart.length > 0) {
    cartEmpty.style.display = "none";
    finishPurchaseButton.style.display = "flex";
    totalContainer.style.display = "flex";
  } else {
    cartEmpty.style.display = "flex";
    finishPurchaseButton.style.display = "none";
    totalContainer.style.display = "none";
  }
};

const renderCart = () => {
  const count = calculateCartCount(productCart);
  cartCount.innerHTML = count;

  toggleCartButtons();

  cartItems.innerHTML = "";
  productCart.forEach(({ product, quantity, subtotal }) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-container";

    const { id, img, title, price } = product;

    cartItem.innerHTML = `<div class="image-cart">
          <img src="/assets/products/${img}" alt="" />
        </div>
        <div class="products-container">
          <div>
            <h2>${title}</h2>
          </div>
          <div>
            <h2>Quantity: ${quantity}</h2>
          </div>
          <div>
            <h2>Price: $${price}</h2>
          </div>
          <div>
            <h2>Subtotal: $${subtotal}</h2>
          </div>
          <div><button onclick="showRemoveConfirmation('${id}')" class="btn btn-success">Remove</button></div>
        </div>`;
    cartItems.appendChild(cartItem);
  });

  const total = calculateCartTotal(productCart);
  cartTotal.innerHTML = total;
};

const saveCart = () => {
  const cartString = JSON.stringify(productCart);
  localStorage.setItem("cart", cartString);
};

const loadCart = () => {
  const cartString = localStorage.getItem("cart") || "[]";
  productCart = JSON.parse(cartString);
  toggleCartButtons();
};

const showQuantityValidationAlert = () => {
  Swal.fire({
    icon: "error",
    title: "Please enter a valid quantity",
    // text: "You must enter a number greater than 0",
    customClass: "swal-wide-error",
    color: "#000",
    background: "#fff",
    confirmButtonText: "Ok",
    position: "top",
    timer: 6000,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
  });
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

const renderProducts = () => {
  availableProducts.forEach(({ id, img, title, price }) => {
    const card = document.createElement("div");
    card.className = "col-lg-4 col-md-6 col-sm-12";

    card.innerHTML = `<div class="card">
        <img src="/assets/products/${img}" class="card-img-top" alt="shirt" />
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

const showPurchaseSuccess = () => {
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

const finishPurchase = () => {
  productCart = [];
  saveCart();
  renderCart();
  showPurchaseSuccess();
};

window.onload = () => {
  renderProducts();
  loadCart();
  renderCart();
};
