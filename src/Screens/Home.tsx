import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NewIcon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const {userInfo} = useContext(UserContext);

  const getData = async () => {
    const id = await AsyncStorage.getItem('userUID');
    console.log('id', id);
    console.log('userinfo', userInfo);
  };

  useEffect(() => {
    getData();
  }, []);

  const cardNumber = userInfo?.tarjetaDebito.number
    .toString()
    .replace(/\d{4}(?=.)/g, '$& ');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIcons}>
          <Icon name="help-circle-outline" size={32} color={'white'} />
          <TouchableOpacity
            style={styles.congifIconContainer}
            onPress={() => {
              navigation.navigate('Configuracion');
            }}>
            <Icon name="settings-outline" size={30} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerName}>
          {userInfo?.photo ? (
            <Image
              style={styles.headerImg}
              source={{
                uri: userInfo?.photo,
              }}
            />
          ) : (
            <View style={styles.headerImgTextCont}>
              <Text style={styles.headerImgText}>{userInfo?.name[0]}</Text>
            </View>
          )}
          <Text style={styles.headerText}>Hola, {userInfo?.name}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.accountContainer}
        onPress={() => {
          navigation.navigate('CuentaDebitoFisica');
        }}>
        <View>
          <Text style={styles.accountTitle}>Cuentas</Text>
          <Text style={styles.accountNum}>● {cardNumber?.split(' ')[3]}</Text>
        </View>
        <Text style={styles.accountBalance}>
          ${userInfo?.tarjetaDebito.saldo.toLocaleString('es-ES')}
        </Text>
      </TouchableOpacity>
      <View style={styles.secondContainer}>
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
        <View style={styles.line} />

        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={styles.optionTouchable}
            onPress={() => {
              navigation.navigate('TransferirA');
            }}>
            <Icon name="swap-horizontal-outline" size={45} color={'white'} />
            <Text style={styles.optionText}>Transferir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionTouchable}
            onPress={() => {
              navigation.navigate('Retirar');
            }}>
            <View style={styles.optionView}>
              <Icon name="cash-outline" size={45} color={'white'} />
            </View>
            <Text style={styles.optionText}>Retirar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={styles.optionTouchable}
            onPress={() => {
              navigation.navigate('History');
              //navigate to Historial
            }}>
            <Icon name="timer-outline" size={45} color={'white'} />
            <Text style={styles.optionText}>Historial</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionTouchable}
            onPress={() => {
              navigation.navigate('TarjetaDebito');
            }}>
            <Icon name="card-outline" size={45} color={'white'} />
            <Text style={styles.optionText}>Mis Tarjetas</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flex: 1,
    // gap: 40,
  },
  header: {
    backgroundColor: '#021B9E',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 20,
    paddingBottom: 60,
  },
  headerIcons: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 22,
  },
  headerName: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20,
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
    borderRadius: 24,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 12,
    transform: [{translateX: 0}, {translateY: -20}],
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
  secondContainer: {
    paddingTop: 10,
    gap: 20,
  },
  line: {
    borderBottomColor: '#4A52FF',
    borderBottomWidth: 3,
    marginHorizontal: 50,
  },
  optionTouchable: {
    alignItems: 'center',
    backgroundColor: '#4A52FF',
    borderRadius: 20,
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    // height: 80,
    width: '45%',
    // justifyContent: 'center',
  },
  optionIcon: {
    height: 10,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-evenly',
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
