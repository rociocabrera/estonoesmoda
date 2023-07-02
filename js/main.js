alert("Bienvedidx a Esto no es Moda");

const validarProducto = (producto) => {
  if (producto === "vestido" || producto === "remera" || producto === "pantalón") {
    return true;
  } else {
    return false;
  }
};

const validarCantidad = (cantidad) => {
  if (!isNaN(cantidad) && cantidad > 0) {
    return true;
  } else {
    return false;
  }
};

const comprarProductos = () => {
  let productoValido = false;
  let producto = "";

  while (productoValido === false) {
    producto = prompt("Ingrese el producto que desea comprar: vestido, remera, pantalón");
    productoValido = validarProducto(producto);
    if (productoValido === false) {
      alert("El producto ingresado no es válido");
    }
  }

  let cantidadValida = false;
  let cantidad = 0;

  while (cantidadValida === false) {
    cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
    cantidadValida = validarCantidad(cantidad);
    if (cantidadValida === false) {
      alert("La cantidad ingresada no es válida");
    }
  }
};

precioTotal = comprarProductos();

alert("El precio total es: " + precioTotal);
