const Cart = require("../models/cart");
const Product = require("../models/product");
const Util = require("../utils/utils");
const datastore = require("../models/data");

const createCart = (req, res, next) => {  
  if (Util.isValid(req)) {
    const username = req.headers.authorization.split(".")[0].substring(7);
    if (!req.body || !req.body.productId) {
      res.status(400).send({ message: "productId is required" });
      return;
    }
    const productId = req.body.productId;
    if(datastore.myCart.length > 0) {
     const my_cart = datastore.myCart.find((c) => c.username === username);
     if(!my_cart) {
      
      const newCart = new Cart(username);
      newCart.addToCart(productId, username);
      datastore.myCart = [...datastore.myCart, newCart];
       res.status(200).send(newCart);
       return;
     }
      const productsInCache = my_cart.products.find( (p) => p.id === parseInt(productId));
      const productInDb = datastore.products.find((p) => p.id === parseInt(productId));
       if (!productsInCache && productInDb.stock > 0) {
         const productInDb = datastore.products.find(
           (p) => p.id === productId
         );
         const { id, name, price, image, stock } = productInDb;
         const product = new Product(id, name, price, image, 1);
         my_cart.products.push(product);
          my_cart.total = my_cart.products
            .map((p) => parseFloat(p.stock) * parseFloat(p.price))
            .reduce((a, b) => a + b, 0);
         res.status(200).send(datastore.myCart);
       } else {
        if (productInDb.stock > productsInCache.stock) {
          productsInCache.stock += 1;

          my_cart.total = my_cart.products
            .map((p) => parseFloat(p.stock) * parseFloat(p.price))
            .reduce((a, b) => a + b, 0);
          res.status(200).send(my_cart);
          return;
        }else {
          res.status(400).send({message:"We are out of stock"});
          return;
        }
        }
       
    }else {
    const newCart = new Cart(username);
    newCart.addToCart(productId,username);
    // datastore.myCart = newCart;
   datastore.myCart = [...datastore.myCart,newCart];

    res.status(200).send(newCart);
    }
  } else {
    res.status(400).send({ message: "Unauthorized request!" });
  }
};

const getCart = (req, res, next) => {
  if (Util.isValid(req)) {
    if(datastore.myCart.length > 0) {
      const tokensQuery = req.headers.authorization;
      const tokens = tokensQuery.split(".");
      let filteredCart = datastore.myCart.find(
        (c) => c.username === tokens[0].substring(7)
      );
      res.status(200).send(filteredCart);
    }else {
       res.status(400).send();
    }
  } else {
    res.status(400).send({ message: "Unauthorized request!" });
  }
};
const updateCart = (req, res, next) => {
  if (Util.isValid(req)) {
    const tokensQuery = req.headers.authorization;
    const tokens = tokensQuery.split(".");
    const my_username = tokens[0].substring(7);
    if (!req.params || !req.params.productId) {
      res.status(400).send({ message: "productId is required" });
      return;
    }
    if (!req.body || !req.body.type) {
      res.status(400).send({ message: "Please, Specify type required" });
    }
   if(datastore.myCart.length > 0){
     const productId = req.params.productId;
    const type = req.body.type;
    Cart.updateCart(productId, type, my_username);
    res.status(200).send(datastore.myCart.find((c) => c.username === my_username));
   }else {
    res.status(400).send({ message: "You have no cart created" });
   }
  } else {
    res.status(400).send({ message: "Unauthorized request!" });
  }
};
module.exports = { createCart, getCart, updateCart };
