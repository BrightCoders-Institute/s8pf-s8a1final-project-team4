import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../App';
import {useContext} from 'react';

export default function TarjetaCredito() {
  const navigation = useNavigation();
  const {userInfo} = useContext(UserContext);
  const cardNumber = userInfo.tarjetaCredito.number.replace(
    /\d{4}(?=.)/g,
    '$& ',
  );
  const cvv = userInfo.tarjetaCredito.cvv;

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={{paddingLeft: 20}}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Icon name="close-outline" size={45} color={'#4A52FF'} />
        </TouchableOpacity>
        <Text style={styles.tarjetas}>Mis Tarjetas</Text>
      </View>
      <View
        style={{flexDirection: 'row-reverse', alignItems: 'center', gap: 40}}>
        <View style={styles.debitTitle}>
          <Text style={styles.debitTitleText}>Credito</Text>
        </View>
        <TouchableOpacity
          style={styles.creditTitle}
          onPress={() => {
            navigation.navigate('TarjetaDebito');
          }}>
          <Text style={styles.creditTitleText}>Debito</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('CuentaCreditoFisica');
          }}>
          <Text style={styles.cardTitle}>Fisica</Text>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
              <Icon name="card-outline" size={45} color={'#4A52FF'} />
              <View style={{gap: 20}}>
                <Text style={styles.cardTitle}>Credito</Text>
                <Text style={styles.cardNumber}>
                  **** **** **** {cardNumber.split(' ')[3]}
                </Text>
              </View>
            </View>
            <Icon name="chevron-forward-outline" size={45} color={'#4A52FF'} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#F2F2F2',
    flex: 1,
    gap: 50,
  },
  tarjetas: {
    color: '#4A52FF',
    fontSize: 26,
    fontWeight: '900',
    paddingLeft: 50,
  },
  debitTitle: {
    backgroundColor: '#5A52FF',
    padding: 20,
    paddingHorizontal: 55,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 5,
  },
  debitTitleText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 1,
  },
  creditTitle: {
    backgroundColor: '#00079A',
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  creditTitleText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    borderTopColor: '#4A52FF',
    borderTopWidth: 3,
    borderBottomColor: '#4A52FF',
    borderBottomWidth: 3,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 20,
    shadowColor: 'nlue',
    shadowOffset: {width: 0, height: 100},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 12,
  },
  cardTitle: {
    color: '#4A52FF',
    fontWeight: '900',
    fontSize: 19,
  },
  cardNumber: {
    color: 'black',
    fontWeight: '900',
  },
});
