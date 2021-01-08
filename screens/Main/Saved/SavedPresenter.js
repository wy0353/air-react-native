import React from "react";
import styled from "styled-components/native";
import Roomcard from "../../../components/RoomCard";

const Container = styled.View`
  margin-top: 80px;
  padding: 0px 15px;
`;

const ScrollView = styled.ScrollView`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: 500;
`;

const NoFavs = styled.Text``;

export default ({ rooms }) => {
  return (
    <Container>
      <Title>Favourite ({rooms.length})</Title>
      <ScrollView showsVerticalScrollIndicator={false}>
        {rooms.length !== 0 ? (
          rooms.map(room => (
            <Roomcard
              key={room.id}
              name={room.name}
              price={room.price}
              photos={room.photos}
              id={room.id}
              isFavs={true}
              isSuperHost={room.user.superhost}
              roomObj={room}
            />
          ))
        ) : (
          <NoFavs>You don't have any favs</NoFavs>
        )}
      </ScrollView>
    </Container>
  );
};
