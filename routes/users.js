const router = require('express').Router();
const { createUser, getAllUsers , getUserByID,deleteUser } = require('../controllers/user');
const protect = require('../middleware/auth');

router.get('/', protect,getAllUsers);
router.get('/:id', getUserByID);
router.post('/', createUser);
router.delete('/:id', deleteUser);

module.exports = router;
