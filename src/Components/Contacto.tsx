import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

type Props = {
  nombre: string;
  numero: number;
  icono: string;
  imagen: string;
};

export default function Contacto({nombre, numero, icono, imagen}: Props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('Transferir',{name:nombre, card_number:numero});
      }}>
      <Image style={styles.Img} source={require('../../img/Iconperfil.png')} />
      <View style={styles.containerInfo}>
        <Text style={styles.Text}>{nombre}</Text>
        <View style={styles.containerdos}>
          <Text style={styles.Text}>{ "**** " + numero?.toString().slice(-4)}</Text>
          <Icon name={icono} size={30} color="white"/>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  Img: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  containerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#00079A',
    padding: 10,
  },
  Text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  containerdos: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,
  },
});
