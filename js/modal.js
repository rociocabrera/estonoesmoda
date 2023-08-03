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
      });
    }
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
