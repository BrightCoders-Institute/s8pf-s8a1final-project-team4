import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

function getKeyNumber() {
  const num = [];
  for (let i = 0; i < 16; i++) {
    const randomNum = Math.floor(Math.random() * 10);
    num.push(randomNum.toString());
  }
  const formattedNum = num.join('');
  return formattedNum.replace(/\d{4}(?=.)/g, '$& ').split(' ');
}
function getCurrentDate() {
  const meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '');
  const day = String(currentDate.getDate()).padStart(2, '');
  const formattedDate = `${day} ${meses[month - 1]} ${year}`;
  return formattedDate;
}
function getCurrentHour() {
  function padLeft(num) {
    return num < 10 ? '0' + num : num;
  }
  const now = new Date();
  const hora = padLeft(now.getHours());
  const minutos = padLeft(now.getMinutes());
  const segundos = padLeft(now.getSeconds());
  return `${hora}:${minutos}:${segundos}`;
}

export default function RetiroDetalles({route}) {
  const navigation = useNavigation();
  const key = getKeyNumber();
  const importe = route.params.importe;
  const concepto = route.params.concepto;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Retiro sin tarjeta</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="close-outline" size={45} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', gap: 30}}>
          <Text style={styles.detailsTitle}>Detalles de retiro</Text>
          <View style={{gap: 10, alignItems: 'center'}}>
            <Text style={styles.details}>{getCurrentDate()}</Text>
            <Text style={styles.details}>{getCurrentHour()} h</Text>
          </View>
          <View style={{gap: 10, alignItems: 'center'}}>
            {concepto !== 'Retiro sin tarjeta' && (
              <Text style={styles.accountConcept}>{concepto}</Text>
            )}
            <Text style={styles.accountBalance}>${importe}</Text>
          </View>
          <Text>Este retiro no genera comision</Text>
        </View>
        <View style={{paddingHorizontal: 22, paddingBottom: 20}}>
          <Text style={styles.detailsTitle}>Clave de retiro</Text>
          <View style={styles.keyContainer}>
            <View style={styles.keyView}>
              <Text style={styles.key}>{key[0]}</Text>
            </View>
            <View style={styles.keyView}>
              <Text style={styles.key}>{key[1]}</Text>
            </View>
            <View style={styles.keyView}>
              <Text style={styles.key}>{key[2]}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.detailsTitle}>Clave de retiro</Text>
            <View style={styles.keyContainer}>
              <View style={styles.keyView}>
                <Text style={styles.key}>{key[3]}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          borderColor: '#211B91',
          borderWidth: 1,
          borderRadius: 8,
          width: 100,
          alignItems: 'center',
          alignSelf: 'center',
        }}
        onPress={() => navigation.navigate('Home')}>
        <Text
          style={{
            color: '#2B1885',
            fontWeight: '900',
            fontSize: 20,
            padding: 8,
          }}>
          Salir
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 30,
  },
  header: {
    backgroundColor: '#2B1885',
    // padding: 20,
    gap: 50,
    borderBottomRightRadius: 130,
  },
  title: {
    color: 'white',
    fontSize: 22,
    paddingLeft: 30,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#311B95',
  },
  detailsTitle: {
    color: 'white',
    fontWeight: '900',
    fontSize: 23,
  },
  accountBalance: {
    color: 'white',
    fontSize: 28,
    fontWeight: '900',
  },
  accountConcept: {
    color: 'white',
    fontSize: 24,
    fontWeight: '900',
  },
  details: {
    fontSize: 15,
    color: 'white',
    letterSpacing: 1.5,
  },
  keyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  keyView: {
    backgroundColor: 'white',
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 3,
  },
  key: {
    color: 'black',
    fontSize: 20,
    fontWeight: '900',
  },
});
