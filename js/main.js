const availableProducts = [
  { name: "dress", title: "Vestido Cuadrillé Grey", price: 5000, img: "vestidocuadrille.webp" },
  { name: "shirt", title: "Camisa Butterfly", price: 2000, img: "remera-mariposas.jpg" },
  { name: "pants", title: "Pantalón Bordeaux", price: 3000, img: "pantalon-bordeaux.jpg" },
];
const productCart = [];

const validateQuantity = (quantity) => {
  return !isNaN(quantity) && quantity > 0;
};

const calculateCartTotal = (productCart) => {
  return productCart.reduce((total, item) => total + item.subtotal, 0);
};

const showCartItems = (productCart) => {
  let items = "The items in your cart are: \n \n";

  productCart.forEach((item, i) => {
    const words = item.product.name.split(" ");
    const capitalizedWords = words.map((word) => {
      const firstLetter = word[0].toUpperCase();
      const restOfWord = word.slice(1).toLowerCase();
      return firstLetter + restOfWord;
    });

    const capitalizedProduct = capitalizedWords.join(" ");

    items += item.quantity + " " + capitalizedProduct + " - subtotal: $" + item.subtotal;
    items += "\n";
  });
  return items;
};

const findProductByName = (productName) => {
  return availableProducts.find((product) => product.name.toLowerCase() === productName.toLowerCase());
};

const buyProduct = (productName) => {
  console.log(productName);

  const product = findProductByName(productName);

  const quantityInput = document.getElementById(`${product.name}-quantity`);
  const quantity = parseInt(quantityInput.value);

  if (!validateQuantity(quantity)) {
    alert("Please enter a valid quantity");
    return;
  }

  // Add the product to the cart
  const existingProduct = productCart.find((item) => item.product.name === product.name);
  console.log("Este es el producto existente", existingProduct);
  if (existingProduct) {
    existingProduct.quantity += quantity;
    existingProduct.subtotal = product.price * existingProduct.quantity;
  } else {
    const subtotal = product.price * quantity;
    productCart.push({ product, quantity, subtotal });
  }

  const total = calculateCartTotal(productCart);
  const totalString = "\n" + "The total of your purchase is: $" + total;
  const cartOutput = showCartItems(productCart) + totalString;

  alert(cartOutput);
};

const renderProducts = () => {
  const productsSection = document.getElementById("products");

  availableProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "col-lg-4 col-md-6 col-sm-12 ";

    card.innerHTML = `<div class="card">
    <img src="/assets/products/${product.img}" class="card-img-top" alt="shirt" />
    <div class="card-body">
      <h5 class="card-title">${product.title}</h5>
      <h5 class="card-title">$${product.price}</h5>
      <div class="input-group mb-3">
        <label class="input-group-text">
          Quantity
        </label>
        <input id="${product.name}-quantity" type="number" min="0" class="form-control" placeholder="0" />
      </div>
      <button onclick="buyProduct('${product.name}')" class="btn btn-success">
        Add to cart
      </button>
    </div>
  </div>`;
    productsSection.appendChild(card);
  });
};

window.onload = () => {
  // console.log("The page has been loaded");
  renderProducts();
};
