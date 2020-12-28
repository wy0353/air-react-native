import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const cacheImages = images => 
  images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);    
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  })

const cacheFonts = fonts => 
  fonts.map(font => Font.loadAsync(font))
  
export default function App() {
  const [isReady, setIsReady] = useState(false);
  const handleFinish = () => setIsReady(true);
  const loadAssets = () => {
    const images = [
      require("./assets/login_bg.jpg"),
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
    ];
    const fonts = [Ionicons.font]
    const imagePromises = cacheImages(images);
    const fontPromises = cacheFonts(fonts);
    console.log(...imagePromises, ...fontPromises)
    return Promise.all([...fontPromises, ...imagePromises,])
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
