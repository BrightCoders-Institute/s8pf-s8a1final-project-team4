import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import NewIcon from 'react-native-vector-icons/FontAwesome5';
import {UserContext} from '../../App';
import {useContext, useState} from 'react';
import MoveCard from '../Components/MoveCard';
import {formatDate} from '../Components/MoveCard';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import InfoModal from '../Components/InfoModal';
// import {object} from 'yup';

function getRandomCvv() {
  const cvv = [];
  for (let i = 0; i < 3; i++) {
    const randomNum = Math.floor(Math.random() * 10);
    cvv.push(randomNum);
  }
  return cvv.join('');
}

export default function VirtualCardDetails() {
  const [showCvv, setShowCvv] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const {userInfo} = useContext(UserContext);
  const [turnOnCard, setTurnOnCard] = useState(false);
  const navigation = useNavigation();
  const cardNumber = userInfo.tarjetaCredito.number.replace(
    /\d{4}(?=.)/g,
    '$& ',
  );
  const saldo = userInfo.tarjetaCredito.saldo;

  const grouped = userInfo.tarjetaCredito.movimientos.reduce(
    (acc: any, movement: object) => {
      const date = movement.fecha;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(movement);
      return acc;
    },
    {},
  );
  const groupedByDate = Object.entries(grouped);
  console.log(groupedByDate);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Debito Virtual</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="close-outline" size={45} color={'white'} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.accountInfo}>
          <View style={styles.balanceView}>
            <Text style={styles.accountBalance}>
              $ {saldo.toLocaleString('es-ES')}
            </Text>
            <Text style={styles.desc}>Saldo Disponible</Text>
          </View>

          <View style={styles.cardNumView}>
            <Text style={styles.cardNumber}>{cardNumber}</Text>
            <NewIcon name="cc-visa" size={35} color={'white'} />
          </View>
          <View>
            <Text style={styles.cvvDinamico}>
              {showCvv ? 'CVV' : 'Crear CVV'} dinamico
            </Text>
            <View style={styles.cvvView}>
              <Text style={styles.cvv}>{showCvv ? getRandomCvv() : 'cvv'}</Text>
              <TouchableOpacity onPress={() => setShowCvv(!showCvv)}>
                <Icon
                  name={
                    showCvv
                      ? 'checkmark-circle-outline'
                      : 'ellipsis-horizontal-circle-outline'
                  }
                  size={32}
                  color={'white'}
                />
              </TouchableOpacity>
            </View>
          </View>
          {showCvv && (
            <>
              <View style={styles.timer}>
                <Text style={styles.textTimer}>5:00</Text>
              </View>
              <Text style={{color: 'white'}}>
                Tu codigo de seguridad (cvv) tiene una validez de 5 minutos
              </Text>
            </>
          )}
          <View style={styles.turnOnCard}>
            <Text style={styles.cvvDinamico}>
              {turnOnCard ? 'Apagar' : 'Encender'} mi tarjeta virtual
            </Text>
            <Switch
              trackColor={{false: '#00079A', true: 'white'}}
              thumbColor={turnOnCard ? '#59A2FF' : 'white'}
              onValueChange={setTurnOnCard}
              value={turnOnCard}
            />
          </View>
        </View>

        <View style={styles.movesView}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            {showCvv ? (
              <>
                <TouchableOpacity
                  style={styles.optionTouchable}
                  onPress={() => {
                    navigation.navigate('TransferirA');
                  }}>
                  <Icon
                    name="swap-horizontal-outline"
                    size={35}
                    color={'white'}
                  />
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
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.optionTouchableDisabled}
                  onPress={() => {
                    setMessage('Enciende tu tarjeta y crea tu CVV dinamico');
                    setShowModal(true);
                  }}>
                  <Icon
                    name="swap-horizontal-outline"
                    size={35}
                    color={'white'}
                  />
                  <Text style={styles.optionText}>Transferir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionTouchableDisabled}
                  onPress={() => {
                    //show modal
                  }}>
                  <View style={styles.optionView}>
                    <Icon name="cash-outline" size={35} color={'white'} />
                  </View>
                  <Text style={styles.optionText}>Retirar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View>
            <Text style={styles.lastMove}>Ultimos Movimientos:</Text>
          </View>
          <View>
            {groupedByDate.map(([fecha, movimientos]) => (
              <View key={fecha}>
                <Text style={styles.date}>{formatDate(fecha)}</Text>
                {movimientos.map((move, index) => (
                  <MoveCard
                    key={index}
                    desc={move.descripcion}
                    monto={move.monto}
                    tipo={move.tipo}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <InfoModal
        message={message}
        onCancel={() => setShowModal(false)}
        visible={showModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#004FBB',
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
    backgroundColor: '#0054C6',
    borderBottomRightRadius: 80,
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
    fontSize: 40,
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
  cvvDinamico: {
    color: 'white',
    fontSize: 17,
    paddingBottom: 8,
  },
  cvvView: {
    alignSelf: 'flex-start',
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(60, 125, 255, .5)',
    paddingRight: 5,
    borderRadius: 5,
  },
  cvv: {
    backgroundColor: 'rgba(60, 125, 255, 1)',
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
  timer: {
    backgroundColor: 'white',
    borderRadius: 100,
    width: 75,
    height: 75,
    alignSelf: 'center',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTimer: {
    color: 'blue',
    fontSize: 20,
    fontWeight: '900',
  },
  turnOnCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  movesView: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
    gap: 15,
  },
  optionTouchable: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#003D91',
    borderRadius: 20,
    flexDirection: 'row',
    padding: 10,
    width: '46%',
  },
  optionTouchableDisabled: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(38, 64, 97,.3)',
    borderRadius: 20,
    flexDirection: 'row',
    padding: 10,
    width: '46%',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
  lastMove: {
    color: '#0064EB',
    fontWeight: '900',
    fontSize: 22,
    paddingLeft: 10,
    paddingTop: 10,
  },
  date: {
    color: 'black',
    fontWeight: '900',
    fontStyle: 'italic',
    fontSize: 18,
    paddingBottom: 12,
  },
});
