import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import RoomPhotos from "../../components/RoomPhotos";
import colors from "../../resources/colors";
import { isAndroid } from "../../utilities/Validator";

const Container = styled.ScrollView``;

const DataContainer = styled.View`
  padding: 0px 15px;
`;

const Address = styled.Text`
  font-size: 24px;
  font-weight: 500;
  margin-top: 10px;
`;

const PropertyInfoContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
`;
const PropertyInfoData = styled.View`
  background-color: ${colors.green};
  margin-right: 10px;
  border-radius: 5px;
`;
const PropertyInfoText = styled.Text`
  color: white;
  padding: 5px 10px;
  font-weight: 500;
`;

const CheckContainer = styled.View`
  margin-top: 20px;
`;
const CheckTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const CheckTitle = styled.Text`
  font-size: 18px;
  margin-left: 10px;
`;
const CheckTime = styled.Text``;

const MapContainer = styled.View`
  width: 100%;
  height: 200px;
  margin-top: 20px;
  margin-bottom: 40px;
`;

function formatQtt(number, name) {
  if (number === 1) {
    return `${number} ${name}`;
  } else {
    return `${number} ${name}s`;
  }
}

function formatTime(time) {
  const [hour, min, sec] = time.split(":");
  return `${hour} o'click`;
}

export default ({ route: { params }, navigation }) => {
  useEffect(() => {
    navigation.setOptions({ title: params.name });
  }, []);
  // console.log(params);
  return (
    <Container>
      <RoomPhotos photos={params.photos} factor={2} />
      <DataContainer>
        <Address>
          {params.address} / ${params.price}
        </Address>
        <PropertyInfoContainer>
          <PropertyInfoData>
            <PropertyInfoText>{formatQtt(params.beds, "bed")}</PropertyInfoText>
          </PropertyInfoData>
          <PropertyInfoData>
            <PropertyInfoText>{formatQtt(params.bedrooms, "bedroom")}</PropertyInfoText>
          </PropertyInfoData>
          <PropertyInfoData>
            <PropertyInfoText>{formatQtt(params.bathrooms, "bathroom")}</PropertyInfoText>
          </PropertyInfoData>
        </PropertyInfoContainer>
        <CheckContainer>
          <CheckTitleContainer>
            <Ionicons size={24} name={isAndroid() ? "md-timer-outline" : "ios-timer-outline"} />
            <CheckTitle>check-in / check-out</CheckTitle>
          </CheckTitleContainer>
          <CheckTime>
            {formatTime(params.check_in)} / {formatTime(params.check_out)}
          </CheckTime>
        </CheckContainer>
        <MapContainer>
          <MapView
            camera={{
              center: {
                latitude: parseFloat(params.lat),
                longitude: parseFloat(params.lng),
              },
              altitude: 10 * 200, // note. for iOS
              zoom: 12, // note. for Android
              pitch: 25,
              heading: 0,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
            style={{ width: "100%", height: "100%" }}>
            <Marker coordinate={{ latitude: parseFloat(params.lat), longitude: parseFloat(params.lng) }} />
          </MapView>
        </MapContainer>
      </DataContainer>
    </Container>
  );
};
