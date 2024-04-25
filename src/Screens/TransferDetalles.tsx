import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../Components/Button';
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

export default function TransferDetalles({route}) {
  const navigation = useNavigation();
  const key = getKeyNumber();
  const key2 = getKeyNumber();
  const importe = route.params.importe;
  const concepto = route.params.concepto;
  const destinatario = route.params.destinatario;
  const cuentaDest = route.params.cardNum.slice(12);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Transferir</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="close-outline" size={45} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', gap: 30}}>
          <Text style={styles.detailsTitle}>Transferencia exitosa</Text>
          <View style={{gap: 10, alignItems: 'center'}}>
            <Text style={styles.details}>{getCurrentDate()}</Text>
            <Text style={styles.details}>{getCurrentHour()} h</Text>
          </View>
          <View style={{gap: 10, alignItems: 'center'}}>
            <Text style={styles.accountBalance}>
              ${importe.toLocaleString('es-ES')}
            </Text>
            <Text style={{color: 'white'}}>Este retiro no genera comision</Text>
          </View>
          <View style={{gap: 10, alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 15}}>Concepto</Text>
            <Text style={styles.accountConcept}>{concepto}</Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              paddingLeft: 50,
              paddingBottom: 10,
            }}>
            Destino
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              // width: '100%',
              paddingBottom: 50,
            }}>
            <Text style={styles.detailsTitle}>{destinatario}</Text>
            <Text style={styles.detailsTitle}>● {cuentaDest}</Text>
          </View>
        </View>
      </View>
      <View style={{alignSelf: 'center'}}>
        <Text style={styles.clave}>Clave rastreo: {key} </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 30,
        }}>
        <Text style={styles.clave}>
          Referencia: {key2[0]}
          {key[1]}
        </Text>
        <Text style={styles.clave}>
          Folio: {key2[3]}
          {key2[4]}
        </Text>
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
    // paddingVertical: 10,
    gap: 50,
    backgroundColor: '#2B1885',
    // backgroundColor: '#390096',
    borderBottomRightRadius: 130,
  },
  title: {
    color: 'white',
    fontSize: 22,
    paddingLeft: 10,
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
    fontSize: 32,
    fontWeight: '900',
  },
  accountConcept: {
    color: 'white',
    fontSize: 26,
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
  clave: {
    color: 'black',
    fontSize: 15,
    fontWeight: '900',
  },
});
