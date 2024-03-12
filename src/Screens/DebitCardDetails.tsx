import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function DebitCardDetails() {
  // const getDebitCard = 1;
  return (
    <View style={styles.container}>
      <View style={styles.accountContainer}>
        <Text style={styles.accountTitle}>Debito</Text>
        <Text style={styles.accountBalance}>$1990</Text>
        <Text style={styles.accountDesc}>Saldo Disponible</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardNumber}>1234 1234 1324 4545</Text>
        <Text style={styles.visaIcon}>Visa</Text>
      </View>
      <View>
        <Text style={styles.lastMove}>Ultimos Movimientos</Text>
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
    // marginHorizontal: 20,
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
    // marginHorizontal: 20,
    backgroundColor: '#00079A',
    borderRadius: 4,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 100},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 15,
  },
  cardNumber: {
    color: 'white',
    fontSize: 20,
  },
  visaIcon: {
    height: 20,
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
