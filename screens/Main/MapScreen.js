import { func } from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { connect } from "react-redux";
import styled from "styled-components/native";
import colors from "../../resources/colors";

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

const Map = ({ rooms }) => {
  const mapRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const onScroll = e => {
    const {
      nativeEvent: {
        contentOffset: { x },
      },
    } = e;

    const position = Math.abs(Math.round(x / width));
    setCurrentIndex(position);
  };

  useEffect(() => {
    if (currentIndex !== 0) {
      mapRef?.current?.animateCamera(
        {
          center: {
            latitude: parseFloat(rooms[currentIndex].lat),
            longitude: parseFloat(rooms[currentIndex].lng),
          },
        },
        { duration: 2000 }
      );
    }
  }, [currentIndex]);
  return (
    <Container>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        camera={{
          center: {
            latitude: parseFloat(rooms[0].lat),
            longitude: parseFloat(rooms[0].lng),
          },
          altitude: 10 * 300,
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
        onScroll={onScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled>
        {rooms?.map(room => (
          <RoomContainer key={room.id}>
            <RoomCard>
              <RoomPhoto
                source={
                  room.photos[0]?.file ? { uri: room.photos[0]?.file } : require("../../assets/room_default_001.jpg")
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

function mapStateToProps(state) {
  return { rooms: state.roomsReducer.explore.rooms };
}

export default connect(mapStateToProps)(Map);
