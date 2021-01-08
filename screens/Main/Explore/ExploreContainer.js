import React from "react";
import { useEffect } from "react";
import ExplorePresenter from "./ExplorePresenter";

export default ({ getRooms, rooms, page, increasePage }) => {
  useEffect(() => {
    getRooms(1);
  }, []);
  useEffect(() => {
    getRooms(page);
  }, [page]);
  return <ExplorePresenter rooms={rooms} increasePage={increasePage} />;
};
