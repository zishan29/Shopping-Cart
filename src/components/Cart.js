let data = [];

export default function addToCart(product) {
  let isDuplicate = data.some((obj) => obj.id === product.id);

  if (!isDuplicate) {
    data = [...data, product];
  }
}

function calTotal() {
  let total = 0;
  data.map((d) => {
    total += d.price;
  });
  return total;
}

function deleteProduct(product) {
  data = data.filter((d) => {
    if (product.id !== d.id) {
      return d;
    }
  });
  return data;
}

export { data, calTotal, deleteProduct };
