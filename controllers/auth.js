const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');


/**
 * @desc    Login user
 * @route   POST /api/v1/auth
 * @access  Public
 */
const login = asyncHandler(async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    const signedToken = user.getSignedJwtToken();

    console.log("signedToken", signedToken);

    res.status(200).json({
        success: true,
        token: signedToken
    })
});

module.exports = {
    login
}