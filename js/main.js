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

const precioDelProducto = (producto) => {
  switch (producto) {
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

const pedirProducto = () => {
  let productoValido = false;
  let producto = "";

  while (!productoValido) {
    producto = prompt("Ingrese el producto que desea comprar: vestido, remera, pantalón");
    productoValido = validarProducto(producto);
    if (!productoValido) {
      alert("El producto ingresado no es válido");
    }
  }

  return producto;
};

const pedirCantidad = () => {
  let cantidadValida = false;
  let cantidad = 0;

  while (!cantidadValida) {
    cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
    cantidadValida = validarCantidad(cantidad);
    if (!cantidadValida) {
      alert("La cantidad ingresada no es válida");
    }
  }
  return cantidad;
};

const comprarProductos = () => {
  let total = 0;
  let seguirComprando = true;

  while (seguirComprando) {
    const producto = pedirProducto();
    const cantidad = pedirCantidad();
    total += precioDelProducto(producto) * cantidad;
    seguirComprando = confirm("¿Desea seguir comprando?");
  }

  return total;
};

const precioTotal = comprarProductos();

alert("El precio total es: " + precioTotal);
