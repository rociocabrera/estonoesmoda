alert("Wellcome to Esto no es Moda");

const validateProduct = (product) => {
  if (product === "vestido" || product === "remera" || product === "pantalón") {
    return true;
  } else {
    return false;
  }
};

const validateQuantity = (quantity) => {
  if (!isNaN(quantity) && quantity > 0) {
    return true;
  } else {
    return false;
  }
};

const priceProduct = (product) => {
  switch (product) {
    case "vestido":
      return 5000;
    case "remera":
      return 2000;
    case "pantalón":
      return 3000;
    default:
      0;
  }
};

const orderProduct = () => {
  let validProduct = false;
  let product = "";

  while (!validProduct) {
    product = prompt("Enter the product you want to buy: vestido, remera, pantalón");
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

alert("The total price is: " + totalPrice);
