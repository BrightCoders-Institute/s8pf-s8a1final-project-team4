import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import InputDestinatario from '../Components/InputDestinatario';
import Button from '../Components/Button';
import ConfirmationModal from '../Components/ConfirmationModal';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../App';
import {useContext, useState} from 'react';
import {virtualWithdraw} from '../Firebase/db';
import Mapsview from '../Components/MapView';

export default function VirtualCreditRetiro() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showError, setShowError] = useState('');
  const [importe, setImporte] = useState('');
  const [concepto, setConcepto] = useState('');
  const navigation = useNavigation();
  const {userInfo} = useContext(UserContext);
  const saldo: number = Number(userInfo.tarjetaCredito.saldo);
  const cardNum: string = userInfo.tarjetaCredito.number.replace(
    /\d{4}(?=.)/g,
    '$& ',
  );

  return (
    <View style={styles.container}>
         <View style={styles.headerScreen}>
            <Text style={styles.headerTitle}>Retiro Sin Tarjeta</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close-outline" size={45} color={'white'} />
            </TouchableOpacity>
        </View>
      <View style={styles.header}>
        <View>
          <Text style={styles.accountTitle}>CUENTA DE RETIRO/VIRTUAL</Text>
          <View style={styles.accountView}>
            <Text style={styles.accountNum}>● {cardNum.split(' ')[3]}</Text>
            <Text style={styles.accountBalance}>
              ${userInfo.tarjetaCredito.saldo.toLocaleString('es-ES')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputTitle}>IMPORTE</Text>
        <InputDestinatario
          placeholder="$"
          modo="numero"
          onChange={val => {
            if (parseInt(val, 10) < 50 || parseInt(val, 10) % 50 !== 0) {
              setShowError('Solo multiplos de 50');
            } else {
              setShowError('');
            }
            setImporte(val);
          }}
        />
        {showError !== '' && <Text style={styles.error}>{showError}</Text>}
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputTitle}>CONCEPTO</Text>
        <InputDestinatario
          placeholder="(opcional)"
          onChange={val => setConcepto(val)}
        />
      </View>
      <Button
        text="Continuar"
        fn={() => {
          if (importe !== '') {
            if (saldo - Number(importe) < 0) {
              setShowError('Saldo insuficiente');
            } else {
              setModalVisible(true);
            }
          } else {
            setShowError('Ingresa una cantidad');
          }
        }}
      />

      <ConfirmationModal
        visible={modalVisible}
        message={`Estas por realizar un retiro por la cantidad de $${importe}\n \n        ¿Deseas continuar?`}
        onCancel={() => setModalVisible(false)}
        onConfirm={() => {
          if (concepto === '') {
            virtualWithdraw(importe, 'Retiro sin tarjeta');
          } else {
            virtualWithdraw(importe, concepto);
          }
          //actualizar contexto
          setModalVisible(false);
          navigation.navigate('RetiroDetalles', {
            importe: importe,
            concepto: concepto !== '' ? concepto : 'Retiro sin tarjeta',
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignContent: 'center',
  },
  header: {
    backgroundColor: '#0054C6',
    padding: 30,
    gap: 25,
    borderBottomRightRadius: 120,
    marginBottom: 25,
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
  title: {
    color: 'white',
    fontSize: 22,
    paddingLeft: 20,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountTitle: {
    color: 'white',
    fontWeight: '900',
    fontSize: 23,
  },
  accountView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountNum: {
    color: 'white',
    fontSize: 21,
    paddingVertical: 30,
    fontWeight: '900',
  },
  accountBalance: {
    color: 'white',
    fontSize: 28,
    fontStyle: 'italic',
    paddingRight: 50,
  },
  inputView: {
    alignSelf: 'center',
    // width: '100%',
  },
  inputTitle: {
    color: 'black',
    fontWeight: '900',
    fontSize: 15,
  },
  error: {
    color: 'red',
    alignSelf: 'center',
  },
});
