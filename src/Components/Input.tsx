import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
interface FormInput {
  text: string;
  iconName: string;
  msgError: string;
  viewPass?: () => void
  secureTextEntry?: boolean;

  onInputChange: (value: string) => void;
}
export default function FormInput({text, iconName, msgError ,onInputChange, viewPass, secureTextEntry}: FormInput) {
  return (
    <View style={{alignItems: 'center'}}>
      <View style={styles.inputView}>
        <TextInput
          placeholder={text}
          secureTextEntry={secureTextEntry}
          onChangeText={onInputChange}
        />
        <Icon
          name={iconName}
          size={30}
          color={'rgba(74, 82, 255, 1)'}
          onPress={viewPass}
        />
      </View>
      <Text style={styles.msgError}>{msgError}</Text>
    </View>
    
  );
}
const styles = StyleSheet.create({
  inputView: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  msgError: {
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
  },
  
});
