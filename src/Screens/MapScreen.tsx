import React from 'react';
import {StyleSheet, View} from 'react-native';
import Mapsview from '../Components/MapView';

export default function MapScreen() {
  return (
    <View style={style.main}>
      <Mapsview />
    </View>
  );
}
const style = StyleSheet.create({
  main: {
    flex: 1,
  },
});
