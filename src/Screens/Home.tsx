import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NewIcon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../App';

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const {userInfo} = useContext(UserContext);
  const cardNumber = userInfo.tarjetaDebito.number.replace(
    /\d{4}(?=.)/g,
    '$& ',
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {userInfo.photo ? (
          <Image
            style={styles.headerImg}
            source={{
              uri: userInfo.photo,
            }}
          />
        ) : (
          <View style={styles.headerImgTextCont}>
            <Text style={styles.headerImgText}>{userInfo.name[0]}</Text>
          </View>
        )}

        <Text style={styles.headerText}>Hola, {userInfo.name}</Text>
        <TouchableOpacity
          style={styles.congifIconContainer}
          onPress={() => {
            navigation.navigate('Configuracion');
          }}>
          <Icon name="settings-outline" size={26} color={'white'} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.accountContainer}
        onPress={() => {
          navigation.navigate('CuentaDebitoFisica');
        }}>
        <View>
          <Text style={styles.accountTitle}>Cuentas</Text>
          <Text style={styles.accountNum}>● {cardNumber.split(' ')[3]}</Text>
        </View>
        <Text style={styles.accountBalance}>
          ${userInfo.tarjetaDebito.saldo}
        </Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity
          style={styles.optionTouchable}
          onPress={() => {
            navigation.navigate('TransferirA');
          }}>
          <View style={styles.optionView}>
            <Icon name="swap-horizontal-outline" size={45} color={'white'} />
          </View>
          <Text style={styles.optionText}>Transferir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionTouchable}
          onPress={() => {
            // navigation.navigate('CuentaDebitoFisica');
            //navigate to Historial
          }}>
          <View style={styles.optionView}>
            <Icon name="timer-outline" size={45} color={'white'} />
          </View>
          <Text style={styles.optionText}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionTouchable}
          onPress={() => {
            // navigation.navigate('CuentaDebitoFisica');
            //navigate to Retirar
          }}>
          <View style={styles.optionView}>
            <Icon name="cash-outline" size={45} color={'white'} />
          </View>
          <Text style={styles.optionText}>Retirar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardView}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('CuentaDebitoFisica');
          }}>
          <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={30}
                color={'white'}
              />
            </TouchableOpacity>
            <Text style={styles.cardNumber}>
              {showPassword
                ? cardNumber
                : '**** **** **** ' + cardNumber.split(' ')[3]}
            </Text>
          </View>
          <NewIcon
            name="cc-visa"
            size={35}
            color={'white'}
            style={styles.visaIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('TarjetaDebito');
        }}>
        <Text style={styles.buttonText}>Mis Tarjetas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flex: 1,
    gap: 40,
  },
  header: {
    backgroundColor: '#4A52FF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerImg: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  headerImgView: {
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
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
  headerText: {
    color: 'white',
    fontSize: 21,
    fontWeight: '600',
  },
  congifIconContainer: {
    alignSelf: 'flex-start',
  },
  accountContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 3,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 100},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 12,
  },
  accountTitle: {
    color: '#686868',
    textTransform: 'uppercase',
    fontSize: 16,
  },
  accountNum: {
    color: 'black',
    fontSize: 19,
    paddingVertical: 30,
    fontWeight: '900',
  },
  accountBalance: {
    color: 'black',
    fontSize: 28,
  },
  optionTouchable: {
    alignItems: 'center',
  },
  optionView: {
    backgroundColor: '#4A52FF',
    borderRadius: 100,
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionIcon: {
    height: 20,
  },
  optionText: {
    color: '#4A52FF',
    fontSize: 16,
  },
  cardView: {
    borderLeftColor: '#4A52FF',
    borderLeftWidth: 3,
    paddingVertical: 10,
    paddingLeft: 8,
    marginHorizontal: 25,
  },
  card: {
    backgroundColor: '#00079A',
    borderRadius: 2,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 35,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 100},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  cardIcon: {
    height: 25,
    color: 'white',
  },
  cardNumber: {
    color: 'white',
    fontSize: 20,
  },
  visaIcon: {
    // height: 20,
    position: 'absolute',
    right: 15,
    top: 15,
  },
  button: {
    backgroundColor: '#4A52FF',
    padding: 18,
    width: 200,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 100},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
});
