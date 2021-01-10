import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";
import colors from "../../../resources/colors";

const { width, height } = Dimensions.get("screen");

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ScrollView = styled.ScrollView`
  position: absolute;
  bottom: 50px;
`;

const RoomContainer = styled.View`
  background-color: transparent;
  width: ${width}px;
  align-items: center;
`;
const RoomCard = styled.View`
  background-color: white;
  width: ${width - 80}px;
  height: 120px;
  margin-right: 20px;
  border-radius: 10px;
  padding: 0px 20px;
  flex-direction: row;
  align-items: center;
`;
const RoomPhoto = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 10px;
`;
const Column = styled.View``;
const RoomName = styled.Text`
  font-size: 16px;
  width: 80%;
`;
const RoomPrice = styled.Text`
  font-size: 16px;
  margin-top: 5px;
`;

const MarkerWrapper = styled.View`
  align-items: center;
`;
const MarkerContainer = styled.View`
  background-color: ${props => (props.selected ? colors.red : colors.green)};
  padding: 10px;
  border-radius: 10px;
  position: relative;
`;
const MarkerText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
`;
const MarkerTriangle = styled.View`
  width: 10px;
  border: 10px solid transparent;
  border-top-color: ${props => (props.selected ? colors.red : colors.green)};
`;
const RoomMarker = ({ selected, price }) => (
  <MarkerWrapper>
    <MarkerContainer selected={selected}>
      <MarkerText>${price}</MarkerText>
    </MarkerContainer>
    <MarkerTriangle selected={selected} />
  </MarkerWrapper>
);

export default ({ rooms, mapRef, currentIndex, onScroll, onRegionChangeComplete, isMoving }) => {
  return (
    <Container>
      <MapView
        onRegionChangeComplete={onRegionChangeComplete}
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        camera={{
          center: {
            latitude: rooms ? parseFloat(rooms[0].lat) : 0,
            longitude: rooms ? parseFloat(rooms[0].lng) : 0,
          },
          altitude: 10 * 500,
          pitch: 0,
          heading: 0,
          zoom: 11,
        }}>
        {rooms?.map((room, index) => (
          <Marker key={room.id} coordinate={{ latitude: parseFloat(room.lat), longitude: parseFloat(room.lng) }}>
            <RoomMarker selected={index === currentIndex} price={room.price} />
          </Marker>
        ))}
      </MapView>
      <ScrollView
        scrollEventThrottle={200}
        onScroll={isMoving ? null : onScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled>
        {rooms?.map(room => (
          <RoomContainer key={room.id}>
            <RoomCard>
              <RoomPhoto
                source={
                  room.photos[0]?.file ? { uri: room.photos[0]?.file } : require("../../../assets/room_default_001.jpg")
                }
              />
              <Column>
                <RoomName>{room.name}</RoomName>
                <RoomPrice>${room.price}</RoomPrice>
              </Column>
            </RoomCard>
          </RoomContainer>
        ))}
      </ScrollView>
    </Container>
  );
};
