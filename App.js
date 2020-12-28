import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';

const cacheImages = images => 
  images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);    
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
})

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const handleFinish = () => setIsReady(true);
  const loadAssets = () => {
    const images = [
      require("./assets/login_bg.jpg"),
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.redbubble.com%2Fi%2Fposter%2FAirbnb-logo-and-pattern-by-joshuanaaa%2F43588186.LVTDI&psig=AOvVaw3HUyrTwY9bw5HSCKjhDjdA&ust=1609206440166000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKDEhqbH7-0CFQAAAAAdAAAAABAD",
    ];

    console.log(cacheImages(images));
  }

  return isReady ? (
    <Text>I'm ready</Text>
  ) : (
    <AppLoading
      onError={console.error}
      onFinish={handleFinish}
      startAsync={loadAssets}
    />
  );
}
