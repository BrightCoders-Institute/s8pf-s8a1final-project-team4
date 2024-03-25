import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Contacto from '../Components/Contacto';
import InputDestinatario from '../Components/InputDestinatario';
import FormButton from '../Components/Button';
import {useNavigation} from '@react-navigation/native';

export default function Transferir({route}: any) {
  const navigation = useNavigation();
  const currentUser = 'Yahir Cortes';
  const transferTo = route.params.name;
  const card_number = route.params.card_number;
  const [amount, setAmount] = useState<string>();
  const [concept, setConcept] = useState<number>();

  const handleClick = () => {
    console.log(amount, concept);
    //navigation.navigate('Home');
    // Alert.alert(`Has transferido con exito a: ${transferTo}`);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Estas Transfiriendo a: </Text>
      <Contacto
        nombre={transferTo}
        numero={card_number}
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
          onChange={setAmount}
        />
        <InputDestinatario
          placeholder="Concepto"
          icono="comment"
          onChange={setConcept}
        />
        <FormButton text="Enviar" fn={() => handleClick()} />
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
