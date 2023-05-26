const Util = require("../utils/utils");
const datastore = require("../models/data");

const completeOrder = (req, res, next) => {
  if (Util.isValid(req)) {
       const tokensQuery = req.headers.authorization;
     const tokens = tokensQuery.split(".");
     const my_username = tokens[0].substring(7);
     let myCart = datastore.myCart.find((c) => c.username === my_username);
    if(myCart) {
        myCart.products.forEach((p) => {
            index = datastore.products.findIndex((i) => i.id == p.id);
            if(index !== -1) {
                datastore.products[index].stock =  datastore.products[index].stock -  p.stock;
                p.stock = 0;
            }
        })
        myCart = null;
       res.send(datastore.products);
    }
   
  }

};

module.exports = { completeOrder };