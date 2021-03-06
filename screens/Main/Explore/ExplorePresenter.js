import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, StatusBar, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import Roomcard from "../../../components/RoomCard";
import colors from "../../../resources/colors";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0px 15px;
`;

const FakeBar = styled.View`
  height: 40px;
  width: 100%;
  background-color: white;
  box-shadow: 1px 5px 5px rgba(200, 200, 200, 0.5);
  margin: 80px 10px 10px 0px;
  border-radius: 7px;
  justify-content: center;
  padding-left: 10px;
`;

const FakeText = styled.Text`
  font-size: 14px;
  font-weight: 300;
`;

const LoadMore = styled.View`
  background-color: ${colors.green};
  align-items: center;
  padding: 15px 10px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const LoadMoreText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

export default ({ rooms, increasePage }) => {
  const navigation = useNavigation();
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      {rooms.length === 0 ? (
        <ActivityIndicator color="black" />
      ) : (
        <>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("Search")}>
            <FakeBar>
              <FakeText>Search...</FakeText>
            </FakeBar>
          </TouchableWithoutFeedback>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
            contentContainerStyle={{ paddingTop: 30 }}>
            {rooms.map(room => (
              <Roomcard
                key={room.id}
                name={room.name}
                price={room.price}
                photos={room.photos}
                id={room.id}
                isFavs={room.is_fav}
                isSuperHost={room.user.superhost}
                roomObj={room}
              />
            ))}

            <TouchableOpacity onPress={increasePage}>
              <LoadMore>
                <LoadMoreText>Load More</LoadMoreText>
              </LoadMore>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </Container>
  );
};
