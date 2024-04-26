import asyncHandler from "../middleware/asyncHandler.js";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc Auth user & get token
//@routes POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {

  const {email, password} = req.body;
  const user = await User.findOne({email});

  if(user && (await user.matchPassword(password))){

    generateToken(res, user._id);

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
  } else {
    throw new Error('Invalid email or password')
  }
});

//@desc logout user and clear cookie
//@routes POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: "logged out successfully"});
});

//@desc Register user
//@routes POST /api/users/
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    } 

    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        generateToken(res, user._id);
        
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data")
    }
});

//@desc get user profile
//@routes GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user  = await User.findById(req.user._id);

    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404);
        throw new Error('user not found');
    }
});

//@desc update user profile
//@routes PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user  = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('user not found');
    }
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