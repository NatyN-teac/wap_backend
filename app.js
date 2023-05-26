const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");
const cors = require("cors");

const app = express();

const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const cartRouter = require('./routes/cartRoute');
const orderRouter = require("./routes/orderRoute");

app.use(express.json());
const swaggerOption = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "SHOPPING API explorer",
      version: "1.0.0",
      description: "This is a REST API application made with Express.",
    },
    servers: [
      {
        url: "http://localhost:8181",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
    schemas: {
      Product: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          price: { type: "number" },
          image: { type: "string" },
          stock: { type: "integer" },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

//define middle ware
//add error handling middleware
const swaggerDocs = swaggerJSDoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());
app.use(
  "/public/resources",
  express.static(path.join(__dirname, "/public/resources"))
);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products",productRouter)
app.use("/api/v1/cart",cartRouter)
app.use("/api/v1/order",orderRouter)
app.use((error,req,res,next) => {
    res.status(500).send({message: `Internal Server. ${error}`})
})

const PORT = 8181;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
