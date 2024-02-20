const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc    Create new User
 * @route   POST /api/v1/users
 * @access  Public
 */
const createUser = asyncHandler(async (req, res, next) => {

    const body = req.body;

    const user = await User.create(body);

    if (!user) {
        return res.status(400).json({
            success: false
        });
    }

    res.status(200).json({
        success: true,
        data: req.body
    });
})

/**
 * @desc    Get all Users
 * @route   GET /api/v1/users
 * @access  Public
 */
const getAllUsers = asyncHandler(async (req, res,next) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        data: users,
    })

})

/**
 * @desc    Get User By ID
 * @route   GET /api/v1/users/:id
 * @access  Public
 */
const getUserByID = asyncHandler(async (req, res,next) => {

    const id = req.params.id

    const user = await User.findById(id);

    if(!user){
        return next(new ErrorResponse('No user found with that ID', 404));
    }

    res.status(200).json({
        success: true,
        data: user,
    })
})

/**
 * @desc    Delete User
 * @route   DELETE /api/v1/users/:id
 * @access  Public
 */
const deleteUser = asyncHandler(async (req, res,next) => {
    const id = req.params.id;


    const user = await User.findByIdAndDelete(id);

    if(!user){
        return next(new ErrorResponse('No user found with that ID', 404));
    }

    res.status(200).json({
        success: true
    });

})

module.exports = {
    createUser,
    getAllUsers,
    getUserByID,
    deleteUser
}