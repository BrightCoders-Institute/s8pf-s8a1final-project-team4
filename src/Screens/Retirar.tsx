import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import InputDestinatario from '../Components/InputDestinatario';
import Button from '../Components/Button';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../App';
import {useContext} from 'react';

export default function Retirar() {
  const navigation = useNavigation();
  const {userInfo} = useContext(UserContext);

  return (
    <View>
      <View>
        <Text>Retiro sin tarjeta</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="close-outline" size={45} color={'white'} />
        </TouchableOpacity>
        <Text>CUENTA DE RETIRO</Text>
        <Text>°4545</Text>
        <Text>$1950</Text>
      </View>
      <View>
        <Text>IMPORTE</Text>
        <InputDestinatario
          placeholder="$$"
          tipo="numeric"
          onChange={() => {}}
        />
      </View>
      <View>
        <Text>Concepto</Text>
        <InputDestinatario placeholder="(opcional)" onChange={() => {}} />
      </View>
      <Button text="Continuar" fn={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontWeight: '900',
    fontSize: 25,
  },
  background: {
    backgroundColor: '#4A52FF',
  },
});
