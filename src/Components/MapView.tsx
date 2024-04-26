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

      const bankLocations = [
        { id: 1, name: 'Banco 1', latitude: 19.252855653389062, longitude: -103.72263488678351 },
        { id: 2, name: 'Banco 2', latitude: 19.255804494890313, longitude: -103.71516437117339 },
        { id: 3, name: 'Banco 3', latitude: 19.25560790710621, longitude: -103.71565893492458 },
        { id: 4, name: 'Banco 4', latitude: 19.254158064921818, longitude: -103.71243125570625 },
        { id: 5, name: 'Banco 5', latitude: 19.25620341639337, longitude: -103.68831555230342 },
        { id: 6, name: 'Banco 6', latitude: 19.255876117113864, longitude: -103.69482275817568 },
        { id: 7, name: 'Banco 7', latitude: 19.272385359157852, longitude: -103.73483128571371 },
        { id: 8, name: 'Banco 8', latitude: 19.27229348146824, longitude: -103.73669536952966 },
        { id: 9, name: 'Banco 9', latitude: 19.282902317032228, longitude: -103.73194859265031 },
        { id: 10, name: 'Banco 10', latitude: 19.264043326302332, longitude: -103.73524848715478 },
      ];
      const region = {
        latitude:19.248810292202965, 
        longitude: -103.72425844809113,
        latitudeDelta: 0.09 ,
        longitudeDelta: 0.09
      }
      

    return (
        <View style={style.container}>
          
            <MapView
                provider={PROVIDER_GOOGLE}
                style={style.map}
                initialRegion={region}
                customMapStyle={mapStyle}
                showsUserLocation={true}
                >
                  
                  {bankLocations.map((bank) => (
                    <Marker
                    key={bank.id}
                    coordinate={{ latitude: bank.latitude, longitude: bank.longitude }}
                    title={bank.name}
                  />
                  ))}
                </MapView>
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
