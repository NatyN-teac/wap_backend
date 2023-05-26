const express = require("express");
const cart = require("../controllers/cartController");
const route = express.Router();

/**
 * @swagger
 * /api/v1/cart:
 *   post:
 *     summary: Create a new cart
 *     tags:
 *       - Cart
 *     description: Create a new cart and add a product to it.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *             example:
 *               productId: "12345"
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
route.post("/", cart.createCart);

/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     summary: Get the cart
 *     tags:
 *       - Cart
 *     description: Get the current cart.
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
route.get("/",cart.getCart);

/**
 * @swagger
 * /api/v1/cart/{productId}:
 *   put:
 *     summary: Update cart item quantity
 *     tags:
 *       - Cart
 *     description: Updates the quantity of a product in the cart.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to update in the cart.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [increment, decrement]
 *             example:
 *               type: increment
 *     responses:
 *       200:
 *         description: Successfully updated the cart item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request or unauthorized.
 */
route.put("/:productId", cart.updateCart);

module.exports = route;
