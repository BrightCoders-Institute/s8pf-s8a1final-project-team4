import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import NewIcon from 'react-native-vector-icons/FontAwesome5';
import {UserContext} from '../../App';
import {useContext, useState} from 'react';
import MoveCard from '../Components/MoveCard';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export default function DebitCardDetails() {
  const [showCvv, setShowCvv] = useState(false);
  const {userInfo} = useContext(UserContext);
  const navigation = useNavigation();
  const cardNumber = userInfo.tarjetaDebito.number.replace(
    /\d{4}(?=.)/g,
    '$& ',
  );
  const saldo = userInfo.tarjetaDebito.saldo;
  const cvv = userInfo.tarjetaDebito.cvv;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Debito Fisica</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="close-outline" size={45} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={styles.accountInfo}>
          <View style={styles.balanceView}>
            <Text style={styles.accountBalance}>
              ${saldo.toLocaleString('es-ES')}
            </Text>
            <Text style={styles.desc}>Saldo Disponible</Text>
          </View>

          <View style={styles.cardNumView}>
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

        <View style={styles.movesView}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity
              style={styles.optionTouchable}
              onPress={() => {
                navigation.navigate('TransferirA');
              }}>
              <Icon name="swap-horizontal-outline" size={35} color={'white'} />
              <Text style={styles.optionText}>Transferir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionTouchable}
              onPress={() => {
                navigation.navigate('Retirar');
              }}>
              <View style={styles.optionView}>
                <Icon name="cash-outline" size={35} color={'white'} />
              </View>
              <Text style={styles.optionText}>Retirar</Text>
            </TouchableOpacity>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#021B9E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
  },
  accountInfo: {
    backgroundColor: '#00079A',
    borderBottomRightRadius: 60,
    paddingVertical: 40,
    paddingHorizontal: 28,
    gap: 25,
  },
  balanceView: {
    alignSelf: 'center',
    gap: 6,
    paddingBottom: 20,
  },
  accountBalance: {
    color: 'white',
    fontWeight: '900',
    fontSize: 35,
    alignSelf: 'center',
  },
  desc: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15,
    fontStyle: 'italic',
    // paddingTop: 10,
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
  accountDesc: {
    color: 'grey',
    fontSize: 15,
    fontStyle: 'italic',
    paddingTop: 10,
  },
  cardNumView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNumber: {
    color: 'white',
    fontSize: 22,
    letterSpacing: 2,
    fontStyle: 'italic',
  },
  cvvView: {
    alignSelf: 'flex-start',
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(60, 105, 255, .5)',
    paddingRight: 5,
    borderRadius: 5,
  },
  cvv: {
    backgroundColor: 'rgba(60, 105, 255, .7)',
    borderRadius: 5,
    padding: 8,
    fontSize: 22,
    letterSpacing: 3,
    fontStyle: 'italic',
    color: 'white',
    fontWeight: '900',
    width: 70,
    textAlign: 'center',
  },
  movesView: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
    gap: 20,
  },
  optionTouchable: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4A52FF',
    borderRadius: 20,
    flexDirection: 'row',
    padding: 14,
    width: '45%',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
  lastMove: {
    color: '#4A52FF',
    fontWeight: '900',
    fontSize: 22,
    paddingLeft: 10,
    paddingTop: 10,
  },
});
