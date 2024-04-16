import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
// import Icon from 'react-native-vector-icons/AntDesign';

interface buttonInterface {
  text: string;
  fn: () => void;
  disabled: boolean;
  //   iconName?: string;
}
export default function FormButton({text, fn, disabled}: buttonInterface) {
  return (
    <TouchableOpacity
      onPress={fn}
      style={disabled ? styles.disabledButton : styles.buttons}
      disabled={disabled}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buttons: {
    backgroundColor: 'rgba(74, 82, 255, 1)',
    width: '60%',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 100},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 13,
    alignSelf: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
  },
  disabledButton: {
    backgroundColor: '#58629C',
    width: '60%',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 100},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 13,
    alignSelf: 'center',
  },
});
