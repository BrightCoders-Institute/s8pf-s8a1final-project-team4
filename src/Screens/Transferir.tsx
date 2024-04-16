import {View, Text, StyleSheet, Alert, Image} from 'react-native';
import React, {useContext, useState} from 'react';
import Contacto from '../Components/Contacto';
import InputDestinatario from '../Components/InputDestinatario';
import FormButton from '../Components/Button';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../App';
import {transferToCard } from '../Firebase/db';
import Icon from 'react-native-vector-icons/FontAwesome5';




export default function Transferir({route}: any) {
  const {userInfo} = useContext(UserContext);
  const navigation = useNavigation();
  const transferTo = route.params.name;
  const card_number = route.params.card_number;
  const [amount, setAmount] = useState<number>(0);
  const [concept, setConcept] = useState<string>('');
  const [clickedSend, setClickedSend] = useState<boolean>(false);
  const [borderAlert, setBorderAler] = useState<boolean>(false);

  const handleClick = () => {


    console.log("Numero adentro: " + card_number)
    transferToCard(amount, card_number, concept, userInfo.tarjetaDebito.saldo, transferTo).then(() => {
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
  console.log(userInfo.photo)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.Text}>Estas Transfiriendo a: </Text>
          <View style={styles.containerInfo}>
            <View style={styles.containert}>
                <View style={styles.headerImgTextCont}>
                  <Text style={styles.headerImgText}>{transferTo[0].toUpperCase()}</Text>
                </View>
              <Text style={styles.Text}>{transferTo}</Text>
              <Text style={styles.Text}>● {card_number?.toString().slice(-4)}</Text>
              <View style={styles.Icons}>
              <Icon name="cc-mastercard" size={20} color="white" />
              </View>
              </View>
          </View>
      <Text style={styles.Text}>Desde tu cuenta: </Text>
          <View style={styles.containerInfo}>
            <View style={styles.containert}>
              <View style={styles.headerImgTextCont}>
                <Text style={styles.headerImgText}>{userInfo.name[0].toUpperCase()}</Text>
              </View>
                <Text style={styles.Text}>{userInfo.name.split(' ') [0]}</Text>
                <Text style={styles.Text}>● {userInfo.tarjetaDebito.number.toString().slice(-4)}</Text>
                <View style={styles.Icons}>
                <Icon name="cc-visa" size={20} color="white" />
                </View>
              </View>
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
    backgroundColor: 'white', 
  },
  Icons: {
      flex : 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      right: 25,
  },
  containert: {
    flex : 1,
    gap: 10,
    alignContent: 'center',
    alignItems: 'center',

    flexDirection: 'row',
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
  Img: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  containerInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#00079A',
    padding: 20,
    gap: 50,
    borderBottomRightRadius: 150,
    // paddingBottom: 20,
  },
  Text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  containerdos: { 
    alignItems: 'center',
  },
});
