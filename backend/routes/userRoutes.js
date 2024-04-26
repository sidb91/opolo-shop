import express from "express";

import { 
    authUser,
    logoutUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    updateUser,
    deleteUser 
} from "../controller/userController.js";
import {protect, admin } from "../middleware/authMiddleware.js";


const router = express.Router();

//only admin routes 
router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers);

router.post('/auth', authUser);
router.post('/logout', logoutUser);

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route('/:id')
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);


export default router;