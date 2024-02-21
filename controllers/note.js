const Note = require('../models/Note');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc    Create new note
 * @route   POST /api/v1/notes
 * @access  Public
 */
const createNote = asyncHandler(async (req, res, next) => {
    const body = req.body;
    const userId = req.user._id;
    delete body.deletedAt;
    delete body.isActive;

    body.userId = userId;
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

    const userId = req.user._id;

    const notes = await Note.find({ userId });

    res.status(200).json({
        success: true,
        count: notes.length,
        data: notes
    });

});

/** 
 * @desc    Get single note
 * @route   GET /api/v1/notes/:id
 * @access  Public
*/

const getNoteById = asyncHandler(async (req, res, next) => {

    const noteId = req.params.id;
    const note = await Note.findById(noteId);

    res.status(200).json({
        success: true,
        data: note
    })

});

/**
 * @desc    Update note
 * @route   PUT /api/v1/notes/:id
 * @access  Public 
 */
const updateNote = asyncHandler(async (req, res, next) => {

    const noteId = req.params.id;
    const note = await Note.findById(noteId);

    // Update the note properties based on the request body
    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    note.updatedAt = Date.now(); // Assuming you have an 'updatedAt' field in your schema

    // Save the updated note
    await note.save();

    // Send the updated note as a response
    res.status(200).json({
        success: true,
        data: note
    });


})


/**
 * @desc    Delete note
 * @route   DELETE /api/v1/notes/:id
 * @access  Public
 * @returns {success: true}
 */

const deleteNote = asyncHandler(async (req, res, next) => {

    const id = req.params.id;

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
        return next(new ErrorResponse('No note found with that ID', 404));
    }

    res.status(200).json({
        success: true
    })

})

module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
}