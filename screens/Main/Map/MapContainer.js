import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import api from "../../../utilities/api";
import MapPresenter from "./MapPresenter";

const { width, height } = Dimensions.get("screen");

export default ({ rooms, token }) => {
  const mapRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allRooms, setAllRooms] = useState(rooms);
  const [isMoving, setIsMoving] = useState(false);
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
    setIsMoving(true);
    mapRef?.current?.animateCamera(
      {
        center: {
          latitude: parseFloat(allRooms[currentIndex].lat),
          longitude: parseFloat(allRooms[currentIndex].lng),
        },
      },
      { duration: 500 }
    );
    setTimeout(() => {
      setIsMoving(false);
    }, 500);
  };

  useEffect(() => {
    moveMap();
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

      const {
        data: { results },
      } = await api.search(form, token);

      const all = [...allRooms, ...results];
      const cleanedRooms = all.filter((room, index, self) => self.findIndex(t => t.id === room.id) === index);
      setAllRooms(cleanedRooms);
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <MapPresenter
      rooms={allRooms}
      mapRef={mapRef}
      currentIndex={currentIndex}
      onScroll={onScroll}
      onRegionChangeComplete={handleRegionChange}
      isMoving={isMoving}
    />
  );
};
