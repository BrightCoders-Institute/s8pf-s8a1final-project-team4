import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useContext, useState} from 'react';
import Contacto from '../Components/Contacto';
import InputDestinatario from '../Components/InputDestinatario';
import FormButton from '../Components/Button';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../App';
import {minusTransfer, transferToCard} from '../Firebase/db';

export default function Transferir({route}: any) {
  const {userInfo} = useContext(UserContext);
  const navigation = useNavigation();
  const transferTo = route.params.name;
  const card_number = route.params.card_number;
  const [amount, setAmount] = useState<number>(0);
  const [concept, setConcept] = useState<string>('');
  const [clickedSend, setClickedSend] = useState<boolean>(false);

  const handleClick = () => {

    transferToCard(amount, card_number, concept);


    if (!amount || !concept) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    if (concept.length > 15) {
      Alert.alert('Error', 'El concepto no puede exceder los 15 caracteres.');
      return;
    }

    console.log(amount, concept);
    transferToCard(amount,card_number)

    navigation.navigate('Home');
    Alert.alert(`Has transferido con exito a: ${transferTo}`);
    //modal message
  };

  // Verificar si los campos de importe y concepto están vacíos
  const areFieldsEmpty = !amount || !concept;

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Estas Transfiriendo a: </Text>
      <Contacto
        nombre={transferTo}
        numero={card_number}
        icono="cc-mastercard"
      />
      <Text style={styles.Text}>Desde tu cuenta: </Text>
      <Contacto
        nombre={userInfo.name.split(' ')[0]}
        numero={userInfo.tarjetaDebito.number}
        icono="cc-visa"
        imagen={userInfo.photo ? userInfo.photo : ''}
      />
      <View style={styles.containerdos}>
      <InputDestinatario
          placeholder="Importe"
          icono="money-bill-wave"
          onChange={(text) => setAmount(Number(text))}
          modo="numero"
          showError={clickedSend && !amount}
        />
        <InputDestinatario
          placeholder="Concepto"
          icono="comment"
          onChange={(text) => setConcept(text)}
          modo="texto"
          maxLength={15}
          showError={clickedSend && !concept}
        />
         <FormButton 
          text="Enviar" 
          fn={() => {setClickedSend(true); handleClick();}} 
          disabled={areFieldsEmpty} // Deshabilitar el botón si los campos están vacíos
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
    color: 'darkgrey',
  },
  containerdos: {
    marginTop: 50,
    alignItems: 'center',
  },
});
