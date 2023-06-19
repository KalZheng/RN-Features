import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    //here add db insert
    await insertPlace(place);
    navigation.navigate("AllPlaces", {
      place: place,
    });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
