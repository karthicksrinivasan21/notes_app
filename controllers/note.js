const Note = require('../models/Note');
const asyncHandler = require('../middleware/async');

/**
 * @desc    Create new note
 * @route   POST /api/v1/notes
 * @access  Public
 */
const createNote = asyncHandler(async (req, res, next) => {
    const body = req.body;

    delete body.deletedAt;
    delete body.isActive;

    const note = await Note.create(body);

    if (!note) {
        return new ErrorResponse('Unable to create note', 400);
    }

    res.status(200).json({
        success: true,
        data: note
    })
})



/**
 * @desc    Get all notes
 * @route   GET /api/v1/notes
 * @access  Public
 */
const getAllNotes = asyncHandler(async (req, res, next) => {
   
        const notes = await Note.find();

        res.status(200).json({
            success: true,
            count: notes.length,
            data: notes
        });

})

module.exports = {
    getAllNotes,
    getNotesById
}