import React from "react";
import styled from "styled-components/native";
import DismissKeyboard from "../../../components/DismissKeyboard";
import colors from "../../../resources/colors";
import { ActivityIndicator } from "react-native";
import Roomcard from "../../../components/RoomCard";

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

const SubmitBtn = styled.TouchableOpacity`
  background-color: ${colors.red};
  padding: 10px;
  margin: 10px 20px;
  border-radius: 10px;
  align-items: center;
`;
const SubmitText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const ResultsText = styled.Text`
  margin-top: 10px;
  text-align: center;
  font-size: 16px;
`;
const Results = styled.ScrollView`
  margin-top: 25px;
`;

export default ({
  navigation,
  beds,
  setBeds,
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  maxPrice,
  setMaxPrice,
  searching,
  triggerSearch,
  results,
}) => {
  return (
    <DismissKeyboard>
      <>
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
              <Filter onChangeText={text => setBeds(text)} value={beds} placeholder="0" keyboardType={"number-pad"} />
            </FilterContainer>
            <FilterContainer>
              <FilterLabel>Bedrooms</FilterLabel>
              <Filter
                onChangeText={text => setBedrooms(text)}
                value={bedrooms}
                placeholder="0"
                keyboardType={"number-pad"}
              />
            </FilterContainer>
            <FilterContainer>
              <FilterLabel>Bathrooms</FilterLabel>
              <Filter
                onChangeText={text => setBathrooms(text)}
                value={bathrooms}
                placeholder="0"
                keyboardType={"number-pad"}
              />
            </FilterContainer>
            <FilterContainer>
              <FilterLabel>Max. Price</FilterLabel>
              <Filter
                onChangeText={text => setMaxPrice(text)}
                value={maxPrice}
                placeholder="0"
                keyboardType={"number-pad"}
              />
            </FilterContainer>
          </FiltersContainer>
        </Container>
        <SubmitBtn onPress={searching ? null : triggerSearch}>
          {searching ? <ActivityIndicator color="white" /> : <SubmitText>Search</SubmitText>}
        </SubmitBtn>
        {results ? <ResultsText>Showing {results.count} results</ResultsText> : null}
        <Results contentContainerStyle={{ paddingHorizontal: 20 }}>
          {results?.results?.map(room => (
            <Roomcard
              key={room.id}
              name={room.name}
              price={room.price}
              photos={room.photos}
              id={room.id}
              isFavs={room.is_fav}
              isSuperHost={room.user.superhost}
              roomObj={room}
              from="Search"
            />
          ))}
        </Results>
      </>
    </DismissKeyboard>
  );
};
