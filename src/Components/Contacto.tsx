import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type Props = {
  nombre: string;
  numero: number;
  icono: string;
  imagen?: string;
};

export default function Contacto({nombre, numero, icono, imagen}: Props) {
  const navigation = useNavigation();
  console.log('nombre', nombre);
  return (
    <View style={styles.containerInfo}>
     
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log("Este es mi numero gookkuuuu ahhh: " + numero);
        navigation.navigate('Transferir', {name: nombre, card_number: numero});
      }}>
      {imagen ? (
        <Image
          style={styles.Img}
          source={{
            uri: imagen,
          }}
        />
      ) : (
        <View style={styles.headerImgTextCont}>
          <Text style={styles.headerImgText}>{nombre[0].toUpperCase()}</Text>
        </View>
      )}
      <View>
        <Text style={styles.Text}>{nombre}</Text>
        <View style={styles.containerdos}>
          <Text style={styles.Textnumber}>{'● ' + numero?.toString().slice(-4)}</Text>
          <Icon name={icono} size={20} color="#3B44FF" />
        </View>
          <View style={styles.containertres}>
            
          </View>
      </View>
    </TouchableOpacity>
    <View style={styles.containertrash}>
        <Icon name="trash-alt" size={30} color="#3B44FF"  />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  containertrash: {
    flex : 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 15,
    marginTop: 20,
    alignSelf: 'center',
  },
  containertres: {
    backgroundColor: 'red',
  },
  Img: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  headerImgTextCont: {
    height: 70,
    width: 70,
    borderRadius: 100,
    backgroundColor: '#4A52FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImgText: {
    color: 'white',
    fontSize: 28,
  },
  containerInfo: {
    flex : 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 15,
    borderRadius: 4,
    borderColor: '#3B44FF', // Cambia 'red' al color que desees
    borderWidth: 2, // Cambia '2' al grosor que desees
  },
  Text: {
    fontSize: 18,
    fontWeight: '900',
    color: 'blue',
  },
  Textnumber: {
    fontSize: 18,
    fontWeight: '900',
    color: '#3B44FF',
  },
  containerdos: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 15,
  },
});
