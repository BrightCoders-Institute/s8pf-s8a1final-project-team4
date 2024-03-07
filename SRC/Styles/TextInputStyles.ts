/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export const StylesInput = StyleSheet.create({
  Container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 15,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'white',
    width: 280,
  },
  Icon: {
    fontSize: 28,
    color: 'black',
  },
  Input: {
    color: 'black',
    fontWeight: '600',
    flex: 1,
  },
});
