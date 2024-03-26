import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import FormInput from '../Components/Input';

export default function ConfigUser() {
  return (
    <View style={style.mainContainer}>
      <View style={style.ContentContainer}>
        <Image
          style={style.Img}
          source={{
            uri: 'https://i.pinimg.com/736x/25/ed/64/25ed6467aa8b4677bf04e60295797802.jpg',
          }}
        />
        <Text style={style.TextNombre}> Ricardo </Text>
        <FormInput text="Nombre" iconName="user" />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  ContentContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 20,
  },
  Img: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  TextNombre: {
    fontSize: 25,
    marginTop: 15,
    marginBottom: 25,
  },
});
