const express = require("express");
const order = require("../controllers/orderController");
const route = express.Router();

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Complete an order
 *     tags:
 *       - Order
 *     responses:
 *       200:
 *         description: Order completed successfully
 */
route.post("", order.completeOrder);

module.exports = route;
