import { StyleSheet, View, Alert } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";

function LocationPicker() {
  const [permission, requestPermission] = useForegroundPermissions();

  async function verifyPermissions() {
    if (permission.status === PermissionStatus.UNDETERMINED) {
      //   const permissionResponse = await requestPermission();
      const { status } = await Camera.requestCameraPermissionsAsync();
      //   return permissionResponse.granted;
      return status;
    }

    if (permission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant camera permissions to use this app."
      );

      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    console.log(location);
  }

  function pickOnMapHandler() {}
  return (
    <View>
      <View style={styles.mapPreview}></View>
      <View style={styles.actions}>
        <OutlinedButton onPress={getLocationHandler} icon="location">
          locate User
        </OutlinedButton>
        <OutlinedButton icon="map">Pick on Map</OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
  },
});
