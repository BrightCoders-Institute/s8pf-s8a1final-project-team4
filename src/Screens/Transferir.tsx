import {View, Text, StyleSheet, Alert} from 'react-native';
import React from 'react';
import Contacto from '../Components/Contacto';
import InputDestinatario from '../Components/InputDestinatario';
import FormButton from '../Components/Button';
import {useNavigation} from '@react-navigation/native';

export default function Transferir() {
  const navigation = useNavigation();
  const currentUser = 'Yahir Cortes';
  const transferTo = 'Ricardo ';

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Estas Transfiriendo a: </Text>
      <Contacto
        nombre={transferTo}
        numero={1234}
        icono="cc-visa"
        imagen="../../img/Iconperfil.png"
      />
      <Text style={styles.Text}>Desde tu cuenta: </Text>
      <Contacto
        nombre={currentUser}
        numero={1234}
        icono="cc-mastercard"
        imagen="../../img/Iconperfil.png"
      />
      <View style={styles.containerdos}>
        <InputDestinatario
          placeholder="Importe"
          tipo="number-pad"
          icono="money-bill-wave"
        />
        <InputDestinatario placeholder="Concepto" icono="comment" />
        <FormButton
          text="Enviar"
          fn={() => {
            //Alert
            Alert.alert(`Has transferido con exito a: ${transferTo}`);
            //Navigate
            navigation.navigate('Home');
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEAEA',
    padding: 20,
  },
  Text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },
  containerdos: {
    marginTop: 50,
    alignItems: 'center',
  },
});
