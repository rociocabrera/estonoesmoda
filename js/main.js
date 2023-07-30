// alert("Welcome to Esto no es Moda 🙂");

const availableProducts = [
  { name: "dress", title: "Vestido Cuadrillé Grey", price: 5000, img: "vestidocuadrille.webp" },
  { name: "shirt", title: "Camisa Butterfly", price: 2000, img: "remera-mariposas.jpg" },
  { name: "pants", title: "Pantalón Bordeaux", price: 3000, img: "pantalon-bordeaux.jpg" },
];

const findProductByName = (productName) => {
  return availableProducts.find((product) => product.name.toLowerCase() === productName.toLowerCase());
};

const validateProduct = (productName) => {
  return !!findProductByName(productName);
};

const validateQuantity = (quantity) => {
  return !isNaN(quantity) && quantity > 0;
};

const findProductPrice = (productName) => {
  const product = findProductByName(productName);
  return product.price || 0;
};

const getProductNames = () => {
  return availableProducts.map((product) => product.name).join(", ");
};

const orderProduct = () => {
  let validProduct = false;
  let product = "";

  while (!validProduct) {
    product = prompt("Enter the product you want to buy: " + getProductNames());
    validProduct = validateProduct(product);
    if (!validProduct) {
      alert("The product entered is invalid");
    }
  }

  return product;
};

const orderQuantity = () => {
  let validQuantity = false;
  let quantity = 0;

  while (!validQuantity) {
    quantity = parseInt(prompt("Enter the amount you want to buy"));
    validQuantity = validateQuantity(quantity);
    if (!validQuantity) {
      alert("The amount entered is invalid");
    }
  }
  return quantity;
};

const calculateCartTotal = (productCart) => {
  return productCart.reduce((total, item) => total + item.subtotal, 0);
};

const showCartItems = (productCart) => {
  let items = "The items in your cart are: \n \n";

  productCart.forEach((item, i) => {
    const words = item.product.split(" ");
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

const buyProducts = () => {
  const productCart = [];

  let keepBuying = true;

  while (keepBuying) {
    const product = orderProduct(productCart);
    const quantity = orderQuantity();

    const existingProduct = productCart.find((item) => item.product === product.toLocaleLowerCase());

    if (existingProduct) {
      existingProduct.quantity += quantity;
      existingProduct.subtotal = findProductPrice(product) * existingProduct.quantity;
    } else {
      const subtotal = findProductPrice(product) * quantity;
      productCart.push({ product: product.toLowerCase(), quantity, subtotal });
    }

    keepBuying = confirm("Do you want to continue shopping?");
  }
  return productCart;
};

// const productCart = buyProducts();
// const total = calculateCartTotal(productCart);
// const totalString = "\n" + "The total of your purchase is: $" + total;
// const cartOutput = showCartItems(productCart) + totalString;

// alert(cartOutput);
// alert("Thanks for your purchase, see you soon!💖");

const renderProducts = () => {
  const productsSection = document.getElementById("products");

  availableProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "col-lg-4 col-md-6 col-sm-12 ";

    card.innerHTML = `<div class="card" style="width: 18rem">
    <img src="/assets/products/${product.img}" class="card-img-top" alt="shirt" />
    <div class="card-body">
      <h5 class="card-title">${product.title}</h5>
      <div class="input-group mb-3">
        <label class="input-group-text" for="inputGroupSelect01">
          Options
        </label>
        <select class="form-select" id="inputGroupSelect01">
          <option selected>Choose...</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <a href="#" class="btn btn-success">
        Add to cart
      </a>
    </div>
  </div>;`;
    productsSection.appendChild(card);
  });
};

window.onload = () => {
  console.log("The page has been loaded");
  renderProducts();
};
