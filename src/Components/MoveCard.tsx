import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export function formatDate(fecha) {
  const partesFecha = fecha.split('-');
  const año = partesFecha[0];
  const mes = parseInt(partesFecha[1]);
  const dia = parseInt(partesFecha[2]);
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
  return dia + ' ' + meses[mes - 1] + ' ' + año;
}

export default function MoveCard({date, desc, tipo, monto}) {
  return (
    <View>
      <Text style={styles.date}>{formatDate(date)}</Text>
      <View style={styles.moveContainer}>
        <View>
          <Text style={styles.payName}>{desc}</Text>
          <Text style={styles.payDesc}>{tipo}</Text>
        </View>
        <Text style={styles.payNum}>${monto.toLocaleString('es-ES')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    color: 'black',
    fontWeight: '900',
    fontStyle: 'italic',
    fontSize: 15,
    paddingBottom: 5,
  },
  moveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
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
