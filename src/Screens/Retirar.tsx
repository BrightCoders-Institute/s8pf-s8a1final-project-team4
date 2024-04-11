import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import InputDestinatario from '../Components/InputDestinatario';
import Button from '../Components/Button';
import ConfirmationModal from '../Components/ConfirmationModal';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../App';
import {useContext, useState} from 'react';
import {userWithdraw} from '../Firebase/db';

export default function Retirar() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showError, setShowError] = useState('');
  const [importe, setImporte] = useState('');
  const [concepto, setConcepto] = useState('');
  const navigation = useNavigation();
  const {userInfo} = useContext(UserContext);
  const cardNum = userInfo.tarjetaDebito.number.replace(/\d{4}(?=.)/g, '$& ');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Retiro sin tarjeta</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="close-outline" size={45} color={'white'} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.accountTitle}>CUENTA DE RETIRO</Text>
          <View style={styles.accountView}>
            <Text style={styles.accountNum}>● {cardNum.split(' ')[3]}</Text>
            <Text style={styles.accountBalance}>
              ${userInfo.tarjetaDebito.saldo.toLocaleString('es-ES')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputTitle}>IMPORTE</Text>
        <InputDestinatario
          placeholder="$"
          tipo="numeric"
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
            setModalVisible(true);
          } else {
            setShowError('Ingresa una cantidad');
          }
        }}
      />

      <ConfirmationModal
        visible={modalVisible}
        message={'¿Estas seguro de realizar el retiro?'}
        onCancel={() => setModalVisible(false)}
        onConfirm={() => {
          if (concepto === '') {
            userWithdraw(importe, 'Retiro sin tarjeta');
          } else {
            userWithdraw(importe, concepto);
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
    gap: 30,
    // alignContent: 'center',
  },
  header: {
    backgroundColor: '#00079A',
    padding: 20,
    gap: 50,
    borderBottomRightRadius: 150,
    // paddingBottom: 20,
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
    fontSize: 19,
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
