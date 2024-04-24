import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import GetLocation, { Location } from 'react-native-get-location'
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
export default function Mapsview() {
  const [location,setLocation] = useState<Location | undefined>()
  const navigation = useNavigation()
  const getCurrentLocation = async () =>{
    try{
      const currenlocation = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
    timeout: 60000,
      })
      setLocation(currenlocation)
    }catch(err){
    }
  }
  useEffect(()=>{
    getCurrentLocation()
      },[])

    return (
        <View style={style.container}>
          
            <MapView
                provider={PROVIDER_GOOGLE}
                style={style.map}
                initialRegion={location}
                customMapStyle={mapStyle}
            />
            <TouchableOpacity style={style.btn} onPress={() => {
              navigation.goBack()
            } }>
            <Icon name='close' size={45} color={"white"} style={style.btn}/>
            </TouchableOpacity>
           
         
            
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height:"100%",
        width:"100%",
        justifyContent:"flex-end",
        alignItems:"center",
    },
    map:{
        ...StyleSheet.absoluteFillObject
    },
    btn:{

      position:"absolute",
      bottom:"93%",
      left:"83%",
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderRadius:30

    }
});
const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]
