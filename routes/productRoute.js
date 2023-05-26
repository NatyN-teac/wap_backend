const express = require("express");
const productController = require("../controllers/productController")
const router = express.Router();


/**
 * @swagger
 * /api/v1/products/{productId}:
 *   get:
 *     summary: Get a single product
 *     tags:
 *       - Product
 *     description: Retrieves a single product by its ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request or missing product ID.
 *       402:
 *         description: Couldn't authenticate, please login.
 */
router.get("/:productId", productController.getSingleProduct);

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Product
 *     description: Retrieves all products.
 *     responses:
 *       200:
 *         description: Successfully retrieved all products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/schemas/Product'
 *       403:
 *         description: Unauthorized request.
 */

router.get("/",productController.getProducts)


/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Product
 *     description: Creates a new product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Successfully created a new product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post("/",productController.createProduct);


module.exports = router;