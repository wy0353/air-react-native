import React from "react";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Pt from "prop-types";
import { Dimensions } from "react-native";

const { height } = Dimensions.get("screen");

const PhotoContainer = styled.View`
  margin-bottom: 7px;
  overflow: hidden;
  width: 100%;
  height: ${props => `${height / props.factor}`}px;
`;

const SlideImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const RoomPhotos = ({ photos, factor = 4 }) => (
  <PhotoContainer factor={factor}>
    {photos.length === 0 ? (
      <SlideImage resizeMode="repeat" source={require("../assets/room_default_001.jpg")} />
    ) : (
      <Swiper paginationStyle={{ marginBottom: -15 }} dotColor={"rgba(200, 200, 200, 0.8)"} activeDotColor={"white"}>
        {photos.map(photo => (
          <SlideImage key={photo.id} source={{ uri: photo.file }} />
        ))}
      </Swiper>
    )}
  </PhotoContainer>
);

RoomPhotos.propTypes = {
  photos: Pt.arrayOf(
    Pt.shape({
      file: Pt.string,
    })
  ),
};

export default RoomPhotos;
