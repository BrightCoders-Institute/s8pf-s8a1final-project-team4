import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
//por ahora este componente tiene errores al manejarlo como funcion, en futuras issues se puede seccionar para poder reutilizarlo
type movimiento = {
  descripcion: string;
  tipo: string;
  monto: number;
};
export const Movement = ({item}: any) => {
  return (
    <View style={styles.main}>
      <View style={styles.card}>
        {Number(item.monto) > 0 ? (
          <View
            style={{
              width: 25,
              height: 25,
              backgroundColor: '#5AB643',
              borderRadius: 20,
            }}
          />
        ) : (
          <View
            style={{
              width: 25,
              height: 25,
              backgroundColor: '#DA375C',
              borderRadius: 20,
            }}
          />
        )}
        <View style={styles.texts}>
          <View style={{alignSelf: 'flex-end'}}>
            <Text style={styles.transferName}>{item.descripcion}</Text>
            <Text style={styles.transferType}>{item.tipo}</Text>
          </View>
          {Number(item.monto) > 0 ? (
            <Text style={styles.number}>
              ${item.monto.toLocaleString('es-ES')}
            </Text>
          ) : (
            <Text style={[styles.number, {color: 'red'}]}>
              ${item.monto.toLocaleString('es-ES')}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 10,
  },
  transferName: {
    color: 'black',
    fontStyle: 'italic',
    fontSize: 20,
  },
  transferType: {
    fontSize: 16,
    color: 'grey',
  },
  number: {
    color: '#54AB5F',
    fontSize: 22,
    alignSelf: 'flex-start',
  },
  texts: {
    flexDirection: 'row',
    flex: 1,
    // width: 300,
    justifyContent: 'space-between',
  },
});
