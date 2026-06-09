const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    unique: true,
    required: [true, 'Room ID is required']
  },
  name: {
    type: String,
    required: [true, 'Room name is required'],
    trim: true,
    unique: true,
    maxlength: [100, 'Room name cannot exceed 100 characters']
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: [1, 'Capacity must be at least 1']
  },
  facilities: [{
    type: String,
    trim: true
  }],
  building: {
    type: String,
    required: [true, 'Building is required'],
    trim: true,
    maxlength: [100, 'Building name cannot exceed 100 characters']
  },
  floor: {
    type: String,
    required: [true, 'Floor is required'],
    trim: true,
    maxlength: [50, 'Floor cannot exceed 50 characters']
  },
  roomCode: {
    type: String,
    required: [true, 'Room code is required'],
    trim: true,
    maxlength: [50, 'Room code cannot exceed 50 characters']
  },
  status: {
    type: String,
    enum: ['available', 'maintenance'],
    default: 'available'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);