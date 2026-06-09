const Notification = require('../models/Notification');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const getMyNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id })
      .populate('bookingId', 'roomId date startTime endTime purpose status')
      .populate('bookingId.roomId', 'name')
      .sort({ createdAt: -1 })
      .limit(50);

    const unreadCount = await Notification.countDocuments({
      userId: req.user._id,
      isRead: false
    });

    return successResponse(res, { notifications, unreadCount }, 'Notifications retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findOne({ _id: id, userId: req.user._id });
    if (!notification) {
      return errorResponse(res, 'Notification not found', 404);
    }

    notification.isRead = true;
    await notification.save();

    return successResponse(res, { notification }, 'Notification marked as read');
  } catch (error) {
    next(error);
  }
};

const markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { userId: req.user._id, isRead: false },
      { isRead: true }
    );

    return successResponse(res, null, 'All notifications marked as read');
  } catch (error) {
    next(error);
  }
};

const getUnreadCount = async (req, res, next) => {
  try {
    const count = await Notification.countDocuments({
      userId: req.user._id,
      isRead: false
    });

    return successResponse(res, { count }, 'Unread count retrieved');
  } catch (error) {
    next(error);
  }
};

const createNotification = async (userId, bookingId, type, title, message) => {
  try {
    const notification = await Notification.create({
      userId,
      bookingId,
      type,
      title,
      message
    });
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
};

module.exports = {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  createNotification
};
