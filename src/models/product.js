class Product {
  constructor(id, timestamp, name, description, code, price, stock, thumbnails) {
      this.id = parseInt(id);
      this.timestamp = timestamp;
      this.name = name;
      this.description = description;
      this.code = code;
      this.price = parseFloat(price);
      this.stock = parseInt(stock);
      this.thumbnails = thumbnails;
  }
}

export default Product;