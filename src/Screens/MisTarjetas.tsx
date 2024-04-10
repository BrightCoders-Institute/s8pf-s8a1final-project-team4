import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../App';
import {useContext} from 'react';

export default function MisTarjetas() {
  const navigation = useNavigation();
  const {userInfo} = useContext(UserContext);
  const cardNumber = userInfo.tarjetaDebito.number.replace(
    /\d{4}(?=.)/g,
    '$& ',
  );
  const creditNumber = userInfo.tarjetaCredito.number.replace(
    /\d{4}(?=.)/g,
    '$& ',
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerdos}>
        <Text style={styles.tarjetas}>Mis Tarjetas</Text>
        <TouchableOpacity
          style={{paddingRight: 20}}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Icon name="close-outline" size={45} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 40}}>
          <Text style={styles.titlecards}>Debito</Text>
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate('CuentaDebitoFisica');
            }}>
            <Text style={styles.cardTitle}>Fisica</Text>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 40,
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Icon name="card-outline" size={65} color={'#4A52FF'} />
                <View style={{gap: 10, alignItems: 'center'}}>
                  <Text style={styles.cardTitle}>Debito</Text>
                  <Text style={styles.cardNumber}>
                    ● {cardNumber.split(' ')[3]}
                  </Text>
                </View>
              </View>
              <Icon
                name="chevron-forward-outline"
                size={45}
                color={'#4A52FF'}
              />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.titlecards}>Credito</Text>
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
              <View
                style={{
                  flexDirection: 'row',
                  gap: 40,
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Icon name="card-outline" size={65} color={'#4A52FF'} />
                <View style={{gap: 10, alignItems: 'center'}}>
                  <Text style={styles.cardTitle}>Credito</Text>
                  <Text style={styles.cardNumber}>
                    ● {creditNumber.split(' ')[3]}
                  </Text>
                </View>
              </View>
              <Icon
                name="chevron-forward-outline"
                size={45}
                color={'#4A52FF'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  containerdos: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#021B9E',
    borderRadius: 0,
    padding: 15,
    // shadowColor: 'white',
    // // shadowOffset: {width: 0, height: 100},
    // shadowOpacity: 0.9,
    // shadowRadius: 10,
    // elevation: 10,
  },
  header: {
    backgroundColor: '#00079A',
    padding: 0,
    gap: 50,
    height: '80%',
    borderBottomRightRadius: 150,
  },
  tarjetas: {
    color: 'white',
    fontSize: 26,
    fontWeight: '900',
    paddingLeft: 50,
  },
  titlecards: {
    color: 'white',
    fontWeight: '900',
    fontSize: 26,
    paddingLeft: 50,
    marginTop: 25,
  },
  debitTitle: {
    backgroundColor: '#4A52FF',
    padding: 20,
    paddingHorizontal: 55,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 5,
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
    marginLeft: 37,
    marginRight: 25,
    backgroundColor: '#4A52FF',
    borderRadius: 10,
  },
  card: {
    transform: [{translateX: -12}, {translateY: -12}],
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    gap: 12,
  },
  cardTitle: {
    color: '#4A52FF',
    fontWeight: '900',
    fontSize: 22,
  },
  cardNumber: {
    color: '#00079A',
    fontWeight: '900',
    fontSize: 20,
    letterSpacing: 1,
  },
});
