import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import Mapsview from '../Components/MapView'


export default function MapScreen() {
  return (
    <View style={style.main}>  
        
        <Mapsview></Mapsview>
    </View>
  )
}
const style = StyleSheet.create({
    main:{
        flex:1
    }
})
