import { Notifications } from "expo";
import * as Permissions from 'expo-permissions'
import { AsyncStorage } from "react-native";

const NOTIFICATION_KEY = "mobileflashCards:notifications";

export function generateId() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

export const createLocalNotification = () => ({
  title: "Don't forget to practice",
  body: "Daily practices keep you updated",
  ios: {
    sound: false
  },
  android: {
    sound: false,
    vibrate: false,
    priority: "high",
    sticky: false
  }
});

export const clearLocalNotification = () => {
  AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync()
  );
};

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(12);
            tomorrow.setMinutes(30);

            Notifications.scheduleLocalNotificationAsync(createLocalNotification(), {
              time: tomorrow,
              repeat: "day"
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
};
