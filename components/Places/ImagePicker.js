import { useState, useRef } from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  MediaTypeOptions,
} from "expo-image-picker";
import { Camera } from "expo-camera";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({ onTakeImage }) {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const cameraRef = useRef(null);

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [pickedImage, setPickedImage] = useState();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      //   const permissionResponse = await requestPermission();
      const { status } = await Camera.requestCameraPermissionsAsync();
      //   return permissionResponse.granted;
      return status;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant camera permissions to use this app."
      );

      return false;
    }
    return true;
  }

  //   async function takeImageHandler() {
  //     const hasPermission = await verifyPermissions();

  //     if (!hasPermission) {
  //       return;
  //     }

  //     const image = await launchCameraAsync({
  //       mediaTypes: MediaTypeOptions.All,
  //       allowsEditing: true,
  //       aspect: [16, 9],
  //       quality: 0.5,
  //     });
  //     // console.log(image);
  //   }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      //   console.log(data.uri);
      setPickedImage(data.uri);
      onTakeImage(data.uri);
    }
  };
  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>

      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center",
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <OutlinedButton icon="camera" onPress={takePicture}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
