import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  margin-top: 60px;
`;

const Text = styled.Text``;

export default ({ user }) => {
  console.log(user);
  return (
    <Container>
      <Text>Profile</Text>
    </Container>
  );
};
