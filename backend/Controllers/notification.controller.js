import { find, findByIdAndUpdate } from '../Models/notification.model';

const getNotifications = async (req, res) => {
  const userId = req.user.id; // Assumant que vous avez un middleware d'authentification qui définit req.user

  const notifications = await find({ receiverId: userId, read: false });

  res.json(notifications);
};

const markAsRead = async (req, res) => {
  const notificationId = req.params.id;

  await Notification.findByIdAndUpdate(notificationId, { read: true });

  res.status(204).send();
};

export { getNotifications, markAsRead };