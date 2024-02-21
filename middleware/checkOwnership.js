const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const checkOwnership =(model)=> asyncHandler(async (req, res, next) => {
    const userId = req.user._id; // Assuming you have the authenticated user ID in the request object
    const resourceId = req.params.id; // Assuming you're getting the resource ID from the request parameters

    // Fetch the resource by its ID (e.g., note, post, etc.)
    const resource = await model.findById(resourceId);

    // Check if the resource exists
    if (!resource) {
        return next(new ErrorResponse('Resource not found', 404));
    }

    console.log(resource.userId !== userId);

    // Check if the authenticated user owns the resource
    if (resource.userId.toString() !== userId.toString()) {
        return next(new ErrorResponse('Not authorized to access this resource', 401));
    }

    // If the user owns the resource, proceed to the next middleware or route handler
    next();
});

module.exports = checkOwnership;
