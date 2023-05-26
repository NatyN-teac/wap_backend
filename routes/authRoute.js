const express = require("express");
const auth  = require("../controllers/authController");
const route = express.Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Authenticate user
 *     tags:
 *       - Authentication
 *     description: Authenticates a user with the provided credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: johnsmith
 *               password: 123456
 *     responses:
 *       200:
 *         description: Successfully authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *             example:
 *               token: "johnsmith.2023-05-23T12:34:56.789Z"
 *       400:
 *         description: Bad request or missing credentials.
 *       403:
 *         description: Wrong credentials.
 */
route.post("/login", auth.authenticate);

module.exports = route;