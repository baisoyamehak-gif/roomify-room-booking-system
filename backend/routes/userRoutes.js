// eslint-disable-next-line no-undef
const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
  createUserValidation,
  updateUserValidation,
  userIdValidation
} = require('../controllers/userController');
// eslint-disable-next-line no-undef
const { protect, authorize } = require('../middleware/auth');
// eslint-disable-next-line no-undef
const validate = require('../middleware/validation');

router.use(protect);
router.use(authorize('admin'));

router.get('/', getAllUsers);
router.post('/', createUserValidation, validate, createUser);
router.put('/:id', userIdValidation, validate, updateUserValidation, validate, updateUser);
router.delete('/:id', userIdValidation, validate, deleteUser);
router.patch('/:id/block', userIdValidation, validate, blockUser);
router.patch('/:id/unblock', userIdValidation, validate, unblockUser);

// eslint-disable-next-line no-undef
module.exports = router;