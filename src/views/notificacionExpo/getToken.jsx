import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import Constants from "expo-constants"; // Coge el "projectId" del app.json, vamos a ver si es útil en producción, caso contrario trabajaremos con ".env"

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid

    const projectId = Constants?.expoConfig?.extra?.eas?.projectId,
      // const projectId =
      //   Constants?.expoConfig?.extra?.eas?.projectId ??
      //   Constants?.easConfig?.projectId;
      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

    //const pushTokenString = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default registerForPushNotificationsAsync;
