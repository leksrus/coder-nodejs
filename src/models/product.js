class Product {
  constructor(id, name, description, code, price, stock, thumbnails) {
      this.id = parseInt(id);
      this.timestamp = Date.now();
      this.name = name;
      this.description = description;
      this.code = code;
      this.price = parseFloat(price);
      this.stock = parseInt(stock);
      this.thumbnails = thumbnails;
  }
}

export default Product;