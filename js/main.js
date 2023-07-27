alert("Welcome to Esto no es Moda 🙂");

const availableProducts = [
  { name: "dress", price: 5000 },
  { name: "shirt", price: 2000 },
  { name: "pants", price: 3000 },
];

const findProductByName = (productName) => {
  return availableProducts.find((product) => product.name.toLowerCase() === productName.toLowerCase());
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

const productCart = buyProducts();
const total = calculateCartTotal(productCart);
const totalString = "\n" + "The total of your purchase is: $" + total;
const cartOutput = showCartItems(productCart) + totalString;

alert(cartOutput);
alert("Thanks for your purchase, see you soon!💖");
