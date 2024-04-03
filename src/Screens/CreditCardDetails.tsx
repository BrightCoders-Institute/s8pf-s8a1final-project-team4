import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import NewIcon from 'react-native-vector-icons/FontAwesome5';
import {UserContext} from '../../App';
import {useContext, useState} from 'react';
import MoveCard from '../Components/MoveCard';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CreditCardDetails() {
  const [showCvv, setShowCvv] = useState(false);
  const {userInfo} = useContext(UserContext);
  const cardNumber = userInfo.tarjetaCredito.number.replace(
    /\d{4}(?=.)/g,
    '$& ',
  );
  const saldo = userInfo.tarjetaCredito.saldo;
  const cvv = userInfo.tarjetaCredito.cvv;

  return (
    <View style={styles.container}>
      <View style={styles.accountContainer}>
        <Text style={styles.accountTitle}>Credito</Text>
        <Text style={styles.accountBalance}>
          ${saldo.toLocaleString('es-ES')}
        </Text>
        <Text style={styles.accountDesc}>Saldo Disponible</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardView}>
          <Text style={styles.cardNumber}>{cardNumber}</Text>
          <NewIcon name="cc-visa" size={35} color={'white'} />
        </View>
        <View style={styles.cvvView}>
          <Text style={styles.cvv}>{showCvv ? cvv : 'cvv'}</Text>
          <TouchableOpacity onPress={() => setShowCvv(!showCvv)}>
            <Icon
              name={showCvv ? 'eye-outline' : 'eye-off-outline'}
              size={32}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.lastMove}>Ultimos Movimientos:</Text>
      </View>
      <View>
        {userInfo.tarjetaDebito.movimientos.map((move, index) => (
          <MoveCard
            key={index}
            date={move.fecha}
            desc={move.descripcion}
            monto={move.monto}
            tipo={move.tipo}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#F2F2F2',
    flex: 1,
    gap: 40,
    paddingHorizontal: 22,
  },
  accountContainer: {
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 15,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 100},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 12,
  },
  accountTitle: {
    color: '#4A52FF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2,
    alignSelf: 'flex-start',
  },
  accountBalance: {
    color: 'black',
    fontSize: 30,
    paddingTop: 20,
  },
  accountDesc: {
    color: 'grey',
    fontSize: 15,
    fontStyle: 'italic',
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#00079A',
    borderRadius: 4,
    padding: 30,
    paddingVertical: 20,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 15,
    gap: 15,
  },
  cardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  cardNumber: {
    color: 'white',
    fontSize: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 3,
    padding: 3,
  },
  cvvView: {
    alignSelf: 'flex-end',
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(60, 105, 255, .5)',
    paddingRight: 5,
  },
  cvv: {
    fontSize: 18,
    letterSpacing: 3,
    fontStyle: 'italic',
    backgroundColor: 'rgba(60, 105, 255, .5)',
    borderRadius: 2,
    color: 'white',
    padding: 5,
    fontWeight: '900',
  },
  lastMove: {
    color: '#4A52FF',
    fontWeight: '900',
    fontSize: 19,
    letterSpacing: 1,
  },
});
