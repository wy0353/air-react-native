import React, { useEffect } from "react";
import ProfilePresenter from "./ProfilePresenter";

export default ({ getUserById, user }) => {
  useEffect(() => {
    getUserById();
  }, []);
  return <ProfilePresenter user={user} />;
};
