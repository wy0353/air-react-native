import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../../../components/DismissKeyboard";

const Container = styled.View``;

const SearchContainer = styled.View`
  margin-top: 50px;
  padding: 10px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const SearchBar = styled.TextInput`
  height: 40px;
  width: 80%;
  background-color: white;
  box-shadow: 1px 5px 5px rgba(200, 200, 200, 0.5);
  border-radius: 7px;
  justify-content: center;
  padding-left: 10px;
`;
const CancelContainer = styled.TouchableOpacity``;

const CancelText = styled.Text``;

const FiltersContainer = styled.ScrollView`
  flex-direction: row;
  margin-top: 10px;
`;

const FilterContainer = styled.View`
  margin-right: 15px;
  align-items: center;
`;
const FilterLabel = styled.Text`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 5px;
`;
const Filter = styled.TextInput`
  width: 80px;
  padding: 10px;
  background-color: white;
  border-radius: 20px;

  box-shadow: 1px 2.5px 2.5px rgba(200, 200, 200, 0.5);
`;

export default () => {
  const navigation = useNavigation();

  return (
    <DismissKeyboard>
      <Container>
        <SearchContainer>
          <SearchBar autoFocus={true} placeholder="Search by city.." />
          <CancelContainer onPress={() => navigation.goBack()}>
            <CancelText>Cancel</CancelText>
          </CancelContainer>
        </SearchContainer>
        <FiltersContainer
          contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}>
          <FilterContainer>
            <FilterLabel>Beds</FilterLabel>
            <Filter placeholder="0" keyboardType={"number-pad"} />
          </FilterContainer>
          <FilterContainer>
            <FilterLabel>Bedrooms</FilterLabel>
            <Filter placeholder="0" keyboardType={"number-pad"} />
          </FilterContainer>
          <FilterContainer>
            <FilterLabel>Bathrooms</FilterLabel>
            <Filter placeholder="0" keyboardType={"number-pad"} />
          </FilterContainer>
          <FilterContainer>
            <FilterLabel>Max. Price</FilterLabel>
            <Filter placeholder="0" keyboardType={"number-pad"} />
          </FilterContainer>
        </FiltersContainer>
      </Container>
    </DismissKeyboard>
  );
};
