import {View, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {StylesInput} from '../Styles/TextInputStyles';

interface PasswordInputProps {
  onChangeText: (text: string) => void;
}

export default function PasswordInput({onChangeText}: PasswordInputProps) {
  const [blockPass, setBlockPass] = useState(false);
  return (
    <View style={StylesInput.Container}>
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry={blockPass}
        style={StylesInput.Input}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={() => setBlockPass(!blockPass)}>
        <Icon
          name={blockPass ? 'eye-off-outline' : 'eye-outline'}
          style={StylesInput.Icon}
        />
      </TouchableOpacity>
    </View>
  );
}
