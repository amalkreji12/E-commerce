import express from "express";
import { listProduct, removeProduct, addProduct, productInfo } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", listProduct);
productRouter.post("/:productId", productInfo);
productRouter.post("/", addProduct);
productRouter.post("/:productId", removeProduct);

export default productRouter;