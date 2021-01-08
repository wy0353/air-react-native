import React from "react";
import styled from "styled-components/native";
import Pt from "prop-types";
import { Dimensions, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import { Ionicons } from "@expo/vector-icons";
import { isAndroid } from "../utilities/Validator";
import { useDispatch } from "react-redux";
import { toggleFav } from "../redux/usersSlice";
import colors from "../resources/colors";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("screen");

const Container = styled.View`
  width: 100%;
  margin-bottom: 50px;
  align-items: flex-start;
  position: relative;
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

const FavButton = styled.View`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;

const TOpacity = styled.TouchableOpacity`
  position: absolute;
  z-index: 10;
  right: 10px;
  top: 10px;
`;

function getIconName(isFav) {
  const isAnd = isAndroid();
  if (isAnd) {
    if (isFav) {
      return "md-heart";
    }
    return "md-heart-outline";
  } else {
    if (isFav) {
      return "ios-heart";
    }
    return "ios-heart-outline";
  }
}

const Roomcard = ({ id, isFavs, isSuperHost, photos, name, price, roomObj }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("RoomDetail", { ...roomObj })}>
      <Container>
        <TOpacity onPress={() => dispatch(toggleFav(id))}>
          <FavButton>
            <Ionicons color={isFavs ? colors.red : "black"} size={25} name={getIconName(isFavs)} />
          </FavButton>
        </TOpacity>
        <PhotoContainer>
          {photos.length === 0 ? (
            <SlideImage resizeMode="repeat" source={require("../assets/room_default_001.jpg")} />
          ) : (
            <Swiper
              paginationStyle={{ marginBottom: -15 }}
              dotColor={"rgba(200, 200, 200, 0.8)"}
              activeDotColor={"white"}>
              {photos.map(photo => (
                <SlideImage key={photo.id} source={{ uri: photo.file }} />
              ))}
            </Swiper>
          )}
        </PhotoContainer>
        {isSuperHost ? (
          <Superhost>
            <SuperhostText>Superhost</SuperhostText>
          </Superhost>
        ) : null}
        <Name>{name}</Name>
        <PriceContainer>
          <PriceNumber>${price}</PriceNumber>
          <PriceText> / night</PriceText>
        </PriceContainer>
      </Container>
    </TouchableOpacity>
  );
};

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
  roomObj: Pt.object.isRequired,
};

export default Roomcard;
