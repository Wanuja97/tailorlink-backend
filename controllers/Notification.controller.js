const notificationModel = require('../models/Notification.model');

// create new notification
exports.createNewNotification = async (req, res) => {
    try {
        const notification = new notificationModel(req.body);
        await notification.save();
        res.status(200).json({
            message: "Notification created successfully",
            data: {
                notification,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while creating notification",
            error: error.message,
        });
    }
}

exports.getAllNotificationsForUser = async (req, res) => {
    try {
        const notifications = await notificationModel.find({ user: req.params.id });
        res.status(200).json({
            message: "Notifications fetched successfully",
            results: notifications.length,
            data: {
                notifications,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while fetching notifications",
            error: error.message,
        });
    }
}

exports.deleteNotification = async (req, res) => {
    try {
        const notifcation = await notificationModel.findByIdAndDelete(req.params.id);
        if (!notifcation) {
            res.status(404).send('Notifcations not found');
        }
        res.send(notifcation);
    } catch (error) {
        res.status(500).json({
            message: "Error while deleting notifications",
            error: error.message,
        });
    }
}

exports.deleteAllNotificationsForUser = async (req, res) => {
    try {
        const notifcations = await notificationModel.deleteMany({ user: req.params.id });
        if (!notifcations) {
            res.status(404).send('Notifcations not found');
        }
        res.send(notifcations);
    } catch (error) {
        res.status(500).json({
            message: "Error while deleting notifications",
            error: error.message,
        });
    }
}

exports.markNotificationsAsReadForUser = async (req, res) => {
    try {
        const notification  = await notificationModel.findByIdAndUpdate(req.params.id, { is_read: true }, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            message: "Notification marked as read successfully",
            data: {
                notification,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error while marking notification as read",
            error: error.message,
        });
    }
}