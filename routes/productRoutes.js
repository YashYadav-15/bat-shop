import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// ROUTES
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// ROUTES
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// GET PRODUCTS
router.get("/get-product", getProductController);

// SINGLE PRODUCT ROUTES
router.get("/get-product/:slug", getSingleProductController);

// GET PHOTO
router.get("/product-photo/:pid", productPhotoController);

// DELETE PRODUCT
router.delete("/delete-product/:pid", deleteProductController);

// FILTER PRODUCT
router.post("/product-filters", productFilterController);

// PAGINATION
// PRODUCT COUNT
router.get("/product-count", productCountController);

// PRODUCT PER PAGE
router.get("/product-list/:page", productListController);

// SEARCH PRODUCT
router.get("/search/:keyword", searchProductController);

// SIMILAR PRODUCT
router.get("/related-product/:pid/:cid", relatedProductController);

// CATEGORY WISE PRODUCT
router.get("/product-category/:slug", productCategoryController);

// PAYMENT ROUTES
// TOKEN
router.get("/braintree/token", braintreeTokenController);

// PAYMENTS
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
