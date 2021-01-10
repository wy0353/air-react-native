import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import api from "../../../utilities/api";
import MapPresenter from "./MapPresenter";

const { width, height } = Dimensions.get("screen");

export default ({ rooms, token }) => {
  const mapRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const onScroll = e => {
    const {
      nativeEvent: {
        contentOffset: { x },
      },
    } = e;

    const position = Math.abs(Math.round(x / width));
    setCurrentIndex(position);
  };

  const moveMap = () => {
    mapRef?.current?.animateCamera(
      {
        center: {
          latitude: parseFloat(rooms[currentIndex].lat),
          longitude: parseFloat(rooms[currentIndex].lng),
        },
      },
      { duration: 2000 }
    );
  };

  useEffect(() => {
    if (currentIndex !== 0) {
      moveMap();
    }
  }, [currentIndex]);

  const handleRegionChange = async () => {
    try {
      const { northEast, southWest } = await mapRef.current?.getMapBoundaries();
      const form = {
        east: northEast.longitude,
        west: southWest.longitude,
        south: southWest.latitude,
        north: northEast.latitude,
      };

      const { data } = await api.search(form, token);
      console.log(data);
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <MapPresenter
      rooms={rooms}
      mapRef={mapRef}
      currentIndex={currentIndex}
      onScroll={onScroll}
      onRegionChangeComplete={handleRegionChange}
    />
  );
};
