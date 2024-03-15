import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
interface FormInput {
  text: string;
  iconName: string;
  onInputChange: (value: string) => void;
}
export default function FormInput({text, iconName, onInputChange}: FormInput) {
  return (
    <View style={styles.inputView}>
      <TextInput
        style={styles.input}
        placeholder={text}
        onChangeText={onInputChange}
      />
      <Icon
        name={iconName}
        size={30}
        color={'rgba(74, 82, 255, 1)'}
        style={styles.icon}
        onPress={() => {}}
      />
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
  input: {
    // width: '70%',
  },
  icon: {
    // bottom: 39,
    // alignSelf: 'flex-end',
    // right: 80,
  },
});
