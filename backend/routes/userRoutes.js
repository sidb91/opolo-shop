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


const router = express.Router();

router.route('/').post(registerUser).get(getUsers);

router.post('/login', authUser);
router.post('/logout', logoutUser);

router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);


export default router;