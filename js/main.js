const availableProducts = [
  { name: "dress", price: 5000 },
  { name: "shirt", price: 2000 },
  { name: "pants", price: 3000 },
];

alert("Welcome to Esto no es Moda 🙂");

const findProductByName = (productName) => {
  return availableProducts.find((product) => product.name === productName) || null;
};

const validateProduct = (productName) => {
  return findProductByName(productName) !== null;
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

const orderProduct = (productCart) => {
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
  let total = 0;
  for (let i = 0; i < productCart.length; i++) {
    const item = productCart[i];
    total += item.subtotal;
  }
  return total;
};

const showCartItems = (productCart) => {
  let items = "The items in your cart are: \n \n";

  console.log(productCart);

  for (let i = 0; i < productCart.length; i++) {
    const item = productCart[i];

    const words = item.product.split(" ");
    const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    const capitalizedProduct = capitalizedWords.join(" ");

    items += item.quantity + " " + capitalizedProduct + " - Subtotal: $" + item.subtotal;
    if (i < productCart.length - 1) {
      items += "\n";
    }
  }
  return items;
};

const buyProducts = () => {
  const productCart = [];

  let keepBuying = true;

  while (keepBuying) {
    const product = orderProduct(productCart);
    const quantity = orderQuantity();

    const existingProduct = productCart.find((item) => item.product === product);

    if (existingProduct) {
      existingProduct.quantity += quantity;
      console.log(existingProduct);

      existingProduct.subtotal = findProductPrice(product) * existingProduct.quantity;
      console.log(existingProduct);
    } else {
      const subtotal = findProductPrice(product) * quantity;
      console.log(subtotal);

      productCart.push({ product, quantity, subtotal });
    }

    keepBuying = confirm("Do you want to continue shopping?");
  }
  return productCart;
};

const productCart = buyProducts();
const total = calculateCartTotal(productCart);
const totalString = "\n \n" + "The total of your purchase is: $" + total;
const cartOutput = showCartItems(productCart) + totalString;

alert(cartOutput);
alert("Thanks for your purchase, see you soon!💖");
