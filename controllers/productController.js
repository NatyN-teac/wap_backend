const Product = require("../models/product");
const datastore = require("../models/data");
const Util = require("../utils/utils");

const getSingleProduct = (req,res,next) => {
    const tokensQuery = req.headers.authorization;
    const tokens = tokensQuery.split(".");
  if (!req.params.productId) {
    res.status(400).send({ message: "Bad Request,token is required." });
    return;
  }
  if (
    datastore.isAuthenticatedUser(tokens[0].substring(7)) &&
    !Util.hasExpired(tokens[1])
  ) {
    const product = datastore.products.find(
      (p) => p.id == req.params.productId
    );
    res.status(200).send(product);
  } else {
    res.status(402).send({ message: "Couldn't authenticate, Please login" });
  }
};
const getProducts = (req,res,next) => {
  if(!req.headers.authorization) {
    res.status(403).json("Unauthorized");
  }
    if (Util.isValid(req)) {
      res.status(200).json(datastore.products);
    } else {
      res.status(403).json({ message: "Unauthorized request" });
    }
}

const createProduct = (req,res,next) => {
   
    res.send("Not in requirement");
}

module.exports = { getSingleProduct, createProduct, getProducts };
