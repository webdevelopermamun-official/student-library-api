import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { loginUser, registerUser, logoutUser, userAccountActive, getAllStudent, singleUser, deleteUser, updateUser} from "../controllers/userController.js";

// router
const router = express.Router();

//routing


// student get all data and single data
router.get('/all-sutudent', authMiddleware, getAllStudent);
router.get('/single-sutudent/:id', authMiddleware, singleUser);
router.get('/delete-sutudent/:id', authMiddleware, deleteUser);
router.patch("/update/:id", authMiddleware, updateUser)

// user login logout
router.route('/login').post(loginUser);
router.get('/logout', logoutUser);

//user registeration and activation
router.route('/register').post(registerUser);
router.get('/activate/:token', userAccountActive);


//export defult
export default router;
