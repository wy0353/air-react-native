import React from "react";
import styled from "styled-components/native";
import Pt from "prop-types";
import { Dimensions } from "react-native";
import Swiper from "react-native-swiper";

const { height } = Dimensions.get("screen");

const Container = styled.View`
  width: 100%;
  margin-bottom: 50px;
  align-items: flex-start;
`;

const Name = styled.Text`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 7px;
`;
const Superhost = styled.Text`
  padding: 3px 5px;
  border: 1px solid black;
  border-radius: 4px;
  margin-bottom: 7px;
`;
const SuperhostText = styled.Text`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 10px;
`;
const PriceContainer = styled.View`
  flex-direction: row;
`;
const PriceText = styled.Text`
  font-size: 16px;
`;
const PriceNumber = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;

const PhotoContainer = styled.View`
  margin-bottom: 7px;
  overflow: hidden;
  width: 100%;
  height: ${height / 4}px;
`;

const SlideImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const Roomcard = ({ id, isFavs, isSuperHost, photos, name, price }) => (
  <Container>
    {isSuperHost ? (
      <Superhost>
        <SuperhostText>Superhost</SuperhostText>
      </Superhost>
    ) : null}
    <PhotoContainer>
      {photos.length === 0 ? (
        <SlideImage resizeMode="repeat" source={require("../assets/room_default_001.jpg")} />
      ) : (
        <Swiper>
          {photos.map(photo => (
            <SlideImage key={photo.id} source={{ uri: photo.file }} />
          ))}
        </Swiper>
      )}
    </PhotoContainer>
    <Name>{name}</Name>
    <PriceContainer>
      <PriceNumber>${price}</PriceNumber>
      <PriceText> / night</PriceText>
    </PriceContainer>
  </Container>
);

Roomcard.propTypes = {
  id: Pt.number.isRequired,
  isFavs: Pt.bool.isRequired,
  isSuperHost: Pt.bool.isRequired,
  photos: Pt.arrayOf(
    Pt.shape({
      file: Pt.string,
    })
  ),
  name: Pt.string.isRequired,
  price: Pt.number.isRequired,
};

export default Roomcard;
