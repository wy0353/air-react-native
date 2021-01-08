import React, { useEffect } from "react";
import styled from "styled-components/native";
import RoomPhotos from "../../components/RoomPhotos";
import colors from "../../resources/colors";

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

function formatQtt(number, name) {
  if (number === 1) {
    return `${number} ${name}`;
  } else {
    return `${number} ${name}s`;
  }
}

export default ({ route: { params }, navigation }) => {
  useEffect(() => {
    navigation.setOptions({ title: params.name });
  }, []);
  console.log(params);
  return (
    <Container>
      <RoomPhotos photos={params.photos} factor={2} />
      <DataContainer>
        <Address>{params.address}</Address>
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
      </DataContainer>
    </Container>
  );
};
