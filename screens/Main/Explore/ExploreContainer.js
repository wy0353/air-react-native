import React from "react";
import { useEffect } from "react";
import ExplorePresenter from "./ExplorePresenter";

export default ({ getRooms, rooms, page }) => {
  useEffect(() => {
    getRooms();
  }, []);
  return <ExplorePresenter rooms={rooms} />;
};
