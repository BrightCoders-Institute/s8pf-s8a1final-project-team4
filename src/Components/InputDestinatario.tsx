import {View, Text, StyleSheet, TextInput, KeyboardType} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

type Props = {
  style: {};
  tipo: KeyboardType;
  placeholder: string;
  nombre: string;
  numero: number;
  icono: string;
  onChange:(value:string) => void;
};

export default function InputDestinatario({
  placeholder,
  nombre,
  numero,
  icono,
  style,
  tipo,
  onChange
}: Props) {
  return (
    <View style={[styles.InputContainer, style]}>
      <TextInput
        style={styles.InputSty}
        placeholder={placeholder}
        keyboardType={tipo}
        onChangeText={onChange}
      />
      <Icon style={styles.IconSty} name={icono} size={25} color="blue" />
    </View>
  );
}

const styles = StyleSheet.create({
  InputContainer: {
    flexDirection: 'row',
    width: '80%',
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 5,
    marginVertical: 15,
  },
  InputSty: {
    flex: 1,
    fontSize: 15,
    padding: 10,
    fontWeight: 'bold',
  },
  IconSty: {
    padding: 10,
  },
});
