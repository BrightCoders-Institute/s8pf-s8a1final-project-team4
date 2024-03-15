import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Contacto from '../Components/Contacto';
import InputDestinatario from '../Components/InputDestinatario';
import FormButton from '../Components/Button';

export default function Transferir() {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Estas Transfiriendo a: </Text>
      <Contacto
        nombre="Juan Perez"
        numero={1234}
        icono="cc-visa"
        imagen="../../img/Iconperfil.png"
      />
      <Text style={styles.Text}>Desde tu cuenta: </Text>
      <Contacto
        nombre="Yahir Cortes"
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
        <FormButton text="Enviar" fn={() => {}} />
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
