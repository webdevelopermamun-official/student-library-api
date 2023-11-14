import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { getAllBook, createBook, updatebook, singlebook, deleteBook } from "../controllers/bookController.js";

// router
const router = express.Router();

// user token verify
router.use(authMiddleware)



// upload books and get books
router.route('/book').get(getAllBook).post(createBook);

// update delete single books
router.patch("/update-book/:id", authMiddleware, updatebook)
router.get('/single-book/:id', authMiddleware, singlebook);
router.get('/delete-book/:id', authMiddleware, deleteBook);

//export defult
export default router;
