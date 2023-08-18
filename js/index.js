window.onload = async () => {
  await getProducts();
  renderProducts();
  loadCart();
  renderCart();
};


// other way to do it:
//
// getProductsPromise().then((products) => {
//   renderProducts();
//   loadCart();
//   renderCart();
// });

 