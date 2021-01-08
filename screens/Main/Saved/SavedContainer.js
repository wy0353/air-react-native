import React from "react";
import { useEffect } from "react/cjs/react.development";
import { isAndroid } from "../../../utilities/Validator";
import SavedPresenter from "./SavedPresenter";

export default ({ getFavs, rooms }) => {
  useEffect(() => {
    getFavs();
  }, []);
  return <SavedPresenter rooms={rooms} />;
};
