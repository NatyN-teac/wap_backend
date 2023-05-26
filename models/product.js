const db = require("./data");
class Product {
  constructor(id,name, price, image, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.stock = stock;
  }
  addProduct() {
    const len = db.products.length;
    this.id = ++len;
    db.products.push(this);
    return this;
  }
  editProduct() {
    const index = db.products.findIndex((prod) => prod.id == this.id);
    db.products.splice(index, 1, this);
    return this;
  }

  static getProducts() {
    return db.products;
  }

  static deleteById(prodId) {
    const index = db.products.findIndex((prod) => prod.id == prodId);
    const deletedProd = db.products[index];
    db.products.splice(index, 1);
    return deletedProd;
  }
}



module.exports = Product;