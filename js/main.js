const availableProducts = [
  { name: "dress", price: 5000 },
  { name: "shirt", price: 2000 },
  { name: "pants", price: 3000 },
];

alert("Welcome to Esto no es Moda 🙂");

const validateProduct = (productName) => {
  for (let i = 0; i < availableProducts.length; i++) {
    const product = availableProducts[i];

    if (product.name === productName) {
      return true;
    }
  }
  return false;
};

const validateQuantity = (quantity) => {
  return !isNaN(quantity) && quantity > 0;
};

const priceProduct = (productName) => {
  for (let i = 0; i < availableProducts.length; i++) {
    const product = availableProducts[i];
    if (product.name === productName) {
      return product.price;
    }
  }
  return 0;
};

const orderProduct = () => {
  let validProduct = false;
  let product = "";

  while (!validProduct) {
    product = prompt("Enter the product you want to buy: dress, shirt, pants");
    validProduct = validateProduct(product);
    if (!validProduct) {
      alert("The entered product is not valid");
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

const buyProducts = () => {
  let total = 0;
  let keepBuying = true;

  while (keepBuying) {
    const product = orderProduct();
    const quantity = orderQuantity();
    total += priceProduct(product) * quantity;
    keepBuying = confirm("Do you want to continue shopping?");
  }

  return total;
};

const totalPrice = buyProducts();

alert("The total price is: $" + totalPrice);
