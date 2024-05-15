import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import InputDestinatario from '../Components/InputDestinatario';
import FormButton from '../Components/Button';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../App';
import {transferToCard} from '../Firebase/db';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import ConfirmationModal from '../Components/ConfirmationModal';
import PushNotification from 'react-native-push-notification';

export default function VirtualTransferir({route}: any) {
  const {userInfo} = useContext(UserContext);
  const navigation = useNavigation();
  const transferTo = route.params.name;
  const card_number = route.params.card_number;
  const formatedCardNumber = route.params.card_number
    .toString()
    .replace(/\d{4}(?=.)/g, '$& ');
  const myBalance = parseInt(userInfo.tarjetaCredito.saldo);
  const [amount, setAmount] = useState<number>(0);
  const [concept, setConcept] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  const handleTransfer = async () => {
    await transferToCard(amount, card_number, concept, true).then(() => {
      showTransferSuccessNotification();
      navigation.pop();
      navigation.navigate('TransferDetalles', {
        importe: amount,
        concepto: concept,
        destinatario: transferTo,
        cardNum: card_number,
      });
    });
  };

  const showTransferSuccessNotification = () => {
    PushNotification.localNotification({
      title: '¡Transferencia exitosa!',
      message: `Se ha enviado $${amount} a la cuenta de ${transferTo}`,
      channelId: 'channel-id',
    });
  };

  const areFieldsEmpty =
    !amount ||
    !concept ||
    concept.length > 20 ||
    (amount === 0 && concept.length > 0);

  return (
    <View style={styles.container}>
      <View style={styles.headerScreen}>
        <Text style={styles.headerTitle}>Transferir</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon2 name="close-outline" size={45} color={'white'} />
        </TouchableOpacity>
      </View>
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
            <Text style={styles.nombre}>Debito Virtual</Text>
            <Text style={styles.myNum}>
              ● {userInfo.tarjetaCredito.number.toString().slice(-4)}
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
          errorMessage="Tu saldo es insuficiente"
          showError={myBalance < amount}
        />
        <InputDestinatario
          placeholder="Concepto"
          icono="comment"
          onChange={text => setConcept(text)}
          modo="texto"
          errorMessage={'El concepto debe ser menor a 20 caracteres'}
          showError={concept.length > 20}
        />
        {amount === 0 && concept.length > 0 && (
          <Text style={styles.ErrorText}>Rellena todos los campos</Text>
        )}
        <FormButton
          text="Enviar"
          fn={() => {
            setShowModal(true);
          }}
          disabled={areFieldsEmpty}
        />
      </View>
      <ConfirmationModal
        visible={showModal}
        message={`¿Estas seguro de enviar $${amount} a la cuenta ●${card_number.slice(
          12,
        )} de ${transferTo}?`}
        onCancel={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          handleTransfer();
        }}
      />
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
    backgroundColor: '#00079A',
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
  headerScreen: {
    backgroundColor: '#004FBB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
  },
  header: {
    backgroundColor: '#0054C6',
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
  ErrorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});
