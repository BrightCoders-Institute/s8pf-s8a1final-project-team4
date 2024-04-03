import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

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
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
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
      <View style={styles.containerInfo}>
        <Text style={styles.Text}>{nombre}</Text>
        <View style={styles.containerdos}>
          <Text style={styles.Text}>{'● ' + numero?.toString().slice(-4)}</Text>
          <Icon name={icono} size={30} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 20,
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#00079A',
    padding: 15,
    borderRadius: 4,
  },
  Text: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
  },
  containerdos: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 15,
  },
});
