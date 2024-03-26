import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconC from 'react-native-vector-icons/Ionicons';
import IconS from 'react-native-vector-icons/Ionicons';
import {UserContext} from '../../App';
import {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
// import {auth} from '../Firebase/firebaseconfig';

export default function Config() {
  const {userInfo} = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <View style={style.mainContainer}>
      <View style={style.ContentContainer}>
        {userInfo.photo ? (
          <Image
            style={style.Img}
            source={{
              uri: userInfo.photo,
            }}
          />
        ) : (
          <View style={style.headerImgTextCont}>
            <Text style={style.headerImgText}>{userInfo.name[0]}</Text>
          </View>
        )}
        <Text style={style.TextNombre}> {userInfo.name}</Text>
      </View>

      <View style={style.ViewsContainer}>
        <TouchableOpacity>
          <View style={style.Viewcontainer}>
            <Icon name="user" size={45} color="blue" />
            <Text style={style.TextView}> Configurar datos personales</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={style.Viewcontainer}>
            <IconS name="shield-checkmark-outline" size={45} color="blue" />
            <Text style={style.TextView}> Seguridad</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            try {
              //CERRAR SESION
              // await auth().signOut();
              // console.log('auth');
              navigation.navigate('LogInFingerprint');
            } catch (error) {
              console.log(error);
            }
          }}>
          <View style={style.Viewcontainer}>
            <IconC name="return-down-back" size={45} color="blue" />
            <Text style={style.TextView}> Cierra sesion</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  ContentContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  ViewsContainer: {
    flex: 1,
    marginTop: 20,
  },
  Viewcontainer: {
    marginTop: 25,
    marginHorizontal: 30,
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  Img: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  headerImgTextCont: {
    height: 70,
    width: 70,
    borderRadius: 100,
    backgroundColor: '#00079A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImgText: {
    color: 'white',
    fontSize: 28,
  },
  TextNombre: {
    fontSize: 25,
    fontWeight: '900',
    textAlignVertical: 'center',
    color: '#00079A',
  },
  TextView: {
    fontSize: 20,
    color: 'blue',
  },
});
