import express from 'express';
import {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getBowlCategoryProducts,
  getSetCategoryProducts,
  getCutleryCategoryProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router
  .get('/top', getTopProducts)
  .get('/bowls', getBowlCategoryProducts)
  .get('/set', getSetCategoryProducts)
  .get('/cutlery', getCutleryCategoryProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
