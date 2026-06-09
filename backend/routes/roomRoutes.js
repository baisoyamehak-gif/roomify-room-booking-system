const express = require('express');
const router = express.Router();
const {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  toggleRoomStatus,
  checkAffectedBookings,
  relocateBookings,
  createRoomValidation,
  updateRoomValidation,
  roomIdValidation
} = require('../controllers/roomController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validation');

router.use(protect);

// All authenticated users can view rooms
router.get('/', getAllRooms);

// Admin and Approver can manage rooms
router.use(authorize('admin', 'approver'));
router.post('/', createRoomValidation, validate, createRoom);
router.put('/:id', roomIdValidation, validate, updateRoomValidation, validate, updateRoom);
router.delete('/:id', roomIdValidation, validate, deleteRoom);
router.patch('/:id/status', roomIdValidation, validate, toggleRoomStatus);
router.get('/:id/affected-bookings', roomIdValidation, validate, checkAffectedBookings);
router.post('/:id/relocate', roomIdValidation, validate, relocateBookings);

module.exports = router;