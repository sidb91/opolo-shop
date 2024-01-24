import asyncHandler from "../middleware/asyncHandler.js";
import User from "../model/userModel.js";

//@desc Auth user & get token
//@routes POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  res.send('auth user login')
});

//@desc logout user and clear cookie
//@routes POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.send('logout user')
});

//@desc Register user
//@routes POST /api/users/
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    res.send('register user')
});

//@desc get user profile
//@routes GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('getUserProfile')
});

//@desc update user profile
//@routes PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('updateUserProfile')
});


//// ADMIN FUNCTIONS ////


//@desc get users
//@routes GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('getUsers for admin')
});

//@desc get user by id
//@routes GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('getUserById admin')
});

//@desc update users
//@routes PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('updateUser admin')
});

//@desc delete users
//@routes DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('deleteUser admin')
});

export {
    authUser,
    logoutUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}