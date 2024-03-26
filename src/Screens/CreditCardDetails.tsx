import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NewIcon from 'react-native-vector-icons/FontAwesome5';
import {UserContext} from '../../App';
import {useContext} from 'react';

export default function CreditCardDetails() {
  const {userInfo} = useContext(UserContext);
  const cardNumber = userInfo.tarjetaCredito.number.replace(
    /\d{4}(?=.)/g,
    '$& ',
  );
  const saldo = userInfo.tarjetaCredito.saldo;

  return (
    <View style={styles.container}>
      <View style={styles.accountContainer}>
        <Text style={styles.accountTitle}>Credito</Text>
        <Text style={styles.accountBalance}>${saldo}</Text>
        <Text style={styles.accountDesc}>Saldo Disponible</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardNumber}>{cardNumber}</Text>
        <NewIcon name="cc-visa" size={35} color={'white'} />
      </View>
      <View>
        <Text style={styles.lastMove}>Ultimos Movimientos:</Text>
      </View>
      <View>
        <Text style={styles.date}>8 marzo 2024</Text>
        <View style={styles.moveContainer}>
          <View>
            <Text style={styles.payName}>Pago Cuenta asdf</Text>
            <Text style={styles.payDesc}>Transferencia bancaria</Text>
          </View>
          <Text style={styles.payNum}>$500</Text>
        </View>
      </View>
      <View>
        <Text style={styles.date}>9 marzo 2024</Text>
        <View style={styles.moveContainer}>
          <View>
            <Text style={styles.payName}>Pago Cuenta asdf</Text>
            <Text style={styles.payDesc}>Transferencia bancaria</Text>
          </View>
          <Text style={styles.payNum}>$-500</Text>
        </View>
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
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 100},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 15,
    alignItems: 'center',
  },
  cardNumber: {
    color: 'white',
    fontSize: 20,
  },
  lastMove: {
    color: '#4A52FF',
    fontWeight: '900',
    fontSize: 19,
    letterSpacing: 1,
  },
  //styles for movements (Component)
  date: {
    color: 'black',
    fontWeight: '900',
    fontStyle: 'italic',
    fontSize: 15,
    paddingBottom: 10,
  },
  moveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  payName: {
    color: '#00079A',
    fontStyle: 'italic',
    fontSize: 18,
  },
  payDesc: {
    color: 'grey',
    fontSize: 15,
  },
  payNum: {
    color: '#4A52FF',
    fontSize: 20,
  },
});
