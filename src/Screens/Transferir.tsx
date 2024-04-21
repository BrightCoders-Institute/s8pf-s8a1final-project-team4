import {View, Text, StyleSheet, Alert, Image} from 'react-native';
import React, {useContext, useState} from 'react';
import Contacto from '../Components/Contacto';
import InputDestinatario from '../Components/InputDestinatario';
import FormButton from '../Components/Button';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../App';
import {transferToCard} from '../Firebase/db';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Transferir({route}: any) {
  const {userInfo} = useContext(UserContext);
  const navigation = useNavigation();
  const transferTo = route.params.name;
  const card_number = route.params.card_number;
  const formatedCardNumber = route.params.card_number
    .toString()
    .replace(/\d{4}(?=.)/g, '$& ');

  const [amount, setAmount] = useState<number>(0);
  const [concept, setConcept] = useState<string>('');
  const [clickedSend, setClickedSend] = useState<boolean>(false);
  const [borderAlert, setBorderAler] = useState<boolean>(false);

  const handleClick = () => {
    transferToCard(
      amount,
      card_number,
      concept,
      userInfo.tarjetaDebito.saldo,
      transferTo,
    ).then(() => {
      navigation.navigate('Home');
    });

    if (!amount || !concept) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    if (concept.length > 15) {
      Alert.alert('Error', 'El concepto no puede exceder los 15 caracteres.');
      return;
    }

    console.log(amount, concept);
    transferToCard(amount, card_number);

    navigation.navigate('Home');
    Alert.alert(`Has transferido con exito a: ${transferTo}`);

    //modal message
  };

  // Verificar si los campos de importe y concepto están vacíos
  const areFieldsEmpty = !amount || !concept;
  console.log(userInfo.photo);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.Text}>Estas Transfiriendo a: </Text>
        <View style={styles.containerInfo}>
          <View style={styles.headerImgTextCont}>
            <Text style={styles.headerImgText}>
              {transferTo[0].toUpperCase()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              gap: 10,
            }}>
            <Text style={styles.nombre}>{transferTo}</Text>
            <Text style={styles.cardNum}>{formatedCardNumber}</Text>
          </View>
        </View>
        <Text style={styles.Text}>Desde tu cuenta: </Text>
        <View style={styles.myInfo}>
          <View
            style={{
              flexDirection: 'column',
              gap: 10,
            }}>
            <Text style={styles.nombre}>Debito</Text>
            <Text style={styles.myNum}>
              ● {userInfo.tarjetaDebito.number.toString().slice(-4)}
            </Text>
          </View>
          <Icon name="cc-visa" size={35} color="white" />
        </View>
      </View>

      <View style={styles.containerdos}>
        <InputDestinatario
          placeholder="Importe"
          icono="money-bill-wave"
          onChange={text => setAmount(Number(text))}
          modo="numero"
          showError={clickedSend && !amount}
        />
        <InputDestinatario
          placeholder="Concepto"
          icono="comment"
          onChange={text => setConcept(text)}
          modo="texto"
          maxLength={15}
          showError={clickedSend && !concept}
        />
        <FormButton
          text="Enviar"
          fn={() => {
            setClickedSend(true);
            handleClick();
          }}
          disabled={areFieldsEmpty} // Deshabilitar el botón si los campos están vacíos
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    paddingBottom: 15,
  },
  header: {
    backgroundColor: '#00079A',
    padding: 30,
    gap: 25,
    borderBottomRightRadius: 120,
    marginBottom: 25,
  },
  myInfo: {
    alignItems: 'center',
    paddingBottom: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 30,
  },
  myNum: {
    fontSize: 24,
    color: 'white',
    letterSpacing: 2,
    fontWeight: '900',
  },
  Text: {
    fontSize: 20,
    color: 'white',
  },
  nombre: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 21,
  },
  cardNum: {
    fontWeight: 'bold',
    fontSize: 21,
    color: 'white',
    fontStyle: 'italic',
  },
  containerdos: {
    alignItems: 'center',
    gap: 10,
  },
});
