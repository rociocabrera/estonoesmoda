let availableProducts = [];

const getProducts = async () => {
  try {
    const response = await fetch("https://mocki.io/v1/40b47b1d-e851-4b6c-a022-dbbad067cca2");
    const products = await response.json();
    availableProducts = products;
    return products;
  } catch (error) {
    console.log(error);
  }
};

// Test: Aplying async with fetch + then and catch
//
// const getProductsAsync = () => {
//   return fetch("https://mocki.io/v1/40b47b1d-e851-4b6c-a022-dbbad067cca2")
//     .then((response) => response.json())
//     .catch((error) => console.log(error));
// };

// Test: Aplying async with setTimeout
//
// const getProductsPromise = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       getProductsAsync().then((products) => {
//         console.log(products);
//         availableProducts = products;
//         resolve(products);
//       });
//     }, 5000);
//   });
// };

// Test: Aplying async with await + setTimeout
// const getProductsPromiseAwait = async () => {
//   const products = await getProducts();

//   return new Promise((resolve) => {
//     setTimeout(() => {
//       availableProducts = products;
//       resolve(products);
//     }, 5000);
//   });
// };
