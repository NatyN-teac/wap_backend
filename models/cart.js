const dataSource = require("./data");
const Product = require("../models/product");
let myTopProduct = [];
let topTotal = 0;
class Cart {
  constructor(username) {
    this.username = username;
    this.products = myTopProduct;
    this.total = topTotal;
  }

  addToCart(productId) {
    const productInDb = dataSource.products.find((p) => p.id === productId);
    const { id, name, price, image, stock } = productInDb;
    const product = new Product(id, name, price, image, stock);
    const productInCart = myTopProduct.find((p) => p.name === product.name);

    if (myTopProduct.length === 0 || !productInCart) {
      product.stock = 1;
      myTopProduct.push(product);
      topTotal = myTopProduct
        .map((p) => parseFloat(p.stock) * parseFloat(p.price))
        .reduce((a, b) => a + b, 0);
      this.total = topTotal;

    } else {
      
      let index = myTopProduct.indexOf(productInCart);
      myTopProduct[index].stock += 1;
      topTotal = myTopProduct
        .map((p) => parseFloat(p.stock) * parseFloat(p.price))
        .reduce((a, b) => a + b, 0);
        this.total = topTotal;
    }
    this.products = myTopProduct;
    myTopProduct = [];
  }

  static updateCart(productId, type,username) {
    const my_cart = dataSource.myCart.find((c) => c.username === username);
    myTopProduct = my_cart.products;
    const productInCart = myTopProduct.find(
      (p) => p.id === parseInt(productId)
    );

    if (productInCart) {
      if (type === "add") {
        const productInStock = dataSource.products.find(
          (p) => p.id === parseInt(productId)
        );
        if (productInCart.stock > productInStock.stock) {
          throw new Error("We are out of stock,please try another time");
        }
        productInCart.stock += 1;
         topTotal = myTopProduct
           .map((p) => {
             return parseFloat(p.stock) * parseFloat(p.price);
           })
           .reduce((a, b) => a + b, 0);
                   this.total = topTotal;
                   dataSource.myCart.total = this.total;
      } else if (type === "minus") {
        if (productInCart.stock > 1) {
          productInCart.stock -= 1;
          topTotal = myTopProduct
            .map((p) =>{
              return parseFloat(p.stock) * parseFloat(p.price);;
            })
            .reduce((a, b) => a + b, 0);
              this.total = topTotal;
              dataSource.myCart.total = this.total;
        } else {
          const index = myTopProduct.indexOf(productInCart);
          myTopProduct.splice(index, 1);
        }
         
      }
    }else {
      throw new Error("NO product found in your cart")
    }
  }
}
module.exports = Cart;
