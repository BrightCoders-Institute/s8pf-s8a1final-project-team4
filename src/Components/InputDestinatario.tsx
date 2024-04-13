import { View, StyleSheet, TextInput, Text } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

type Props = {
  style?: {};
  modo: 'numero' | 'texto';
  placeholder: string;
  icono: string;
  onChange: (value: string) => void;
  maxLength?: number;
  showError: boolean;
};

export default function InputDestinatario({
  placeholder,
  icono,
  style,
  onChange,
  maxLength,
  modo,
  showError,
}: Props) {
  const [isValidLength, setIsValidLength] = useState<boolean>(true);

  const handleChangeText = (text: string) => {
    if (maxLength && text.length !== maxLength) {
      setIsValidLength(false);
    } else {
      setIsValidLength(true);
    }

    if (modo === 'numero') {
      text = text.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
    } else if (modo === 'texto') {
      text = text.replace(/[^a-zA-Z ]/g, ''); // Eliminar caracteres no alfabéticos
    }

    onChange(text);
  };

  return (
    <View>
      <View style={[styles.InputContainer, style, !isValidLength && styles.invalid]}>
        <TextInput
          style={styles.InputSty}
          placeholder={placeholder}
          placeholderTextColor="lightgrey"
          keyboardType={modo === 'numero' ? 'numeric' : 'default'}
          onChangeText={handleChangeText}
        />
        <Icon style={styles.IconSty} name={icono} size={25} color="blue" />
      </View>
      {showError && !isValidLength && (
        <Text style={styles.ErrorText}>
          La longitud debe ser {maxLength} caracteres.
        </Text>
      )}
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
    paddingVertical: 2,
  },
  InputSty: {
    color: 'black',
    flex: 1,
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
  },
  IconSty: {
    padding: 10,
  },
  ErrorText: {
    color: 'red',
    fontSize: 12,
  },
  invalid: {
    borderColor: 'red',
  },
});
