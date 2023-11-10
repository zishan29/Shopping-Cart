let data = [];

export default function addToCart(product) {
  let isDuplicate = data.some((obj) => obj.id === product.id);

  if (!isDuplicate) {
    data = [...data, product];
  }
}

export { data };
