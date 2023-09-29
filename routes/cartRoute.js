import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { clearCartController, createCartController, deleteCartController, getCartController, updateCartController } from '../controllers/cartController.js';


const router = express.Router();

// when we hit add to cart from homepage or any other page
router.post('/create-cart/:id/:pid',createCartController);

// get cart at initial time when we hit /cart page
router.get('/get-cart/:id',getCartController);

// update cart or modify cart when delete any product
// we can send put request only once and then the header is set then it gives error
// its not like we can only send request once in put ,i was just sending status code 2 times so thats why the headers error 
router.post('/update-cart/:id/:pid',updateCartController);

// deleting the entire product
router.post('/delete-cart/:id/:pid',deleteCartController);
router.post('/clear-cart/:id',clearCartController);

export default router;
