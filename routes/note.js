const router = require('express').Router();
const Note = require('../models/Note');
const note = require('../controllers/note');
const protect  = require('../middleware/auth');
const checkOwnership = require('../middleware/checkOwnership');

router.post('/',protect,note.createNote);
router.get('/',protect,note.getAllNotes);
router.get('/:id',protect,checkOwnership(Note),note.getNoteById);
router.put('/:id', protect, checkOwnership(Note), note.updateNote);
router.delete('/:id',protect,checkOwnership(Note), note.deleteNote);

module.exports = router;