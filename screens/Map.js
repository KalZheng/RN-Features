import { useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

function Map() {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    //dummy data
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    // const lat = event.nativeEvent.coordinate.latitude;
    // const lng = event.nativeEvent.coordinate.longitude;
    // setSelectedLocation({
    //   lat: lat,
    //   lng: lng,
    // });
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({
      latitude,
      longitude,
    });
  }
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        // <Marker
        //   title="Picked Location"
        //   coordinate={{
        //     latitude: selectedLocation.lat,
        //     longitude: selectedLocation.lng,
        //   }}
        // />
        <Marker title="Picked Location" coordinate={selectedLocation} />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
