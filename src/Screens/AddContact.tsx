import { View, StyleSheet } from 'react-native';
import React, { useState, useSyncExternalStore } from 'react';
import InputDestinatario from '../Components/InputDestinatario';
import FormButton from '../Components/Button';
import { useNavigation } from '@react-navigation/native';
import { AddContactDoc } from '../Firebase/db';

export default function AddContact() {
  const navigation = useNavigation();
  const [name, setName] = useState<string>('');
  const [number, setNumber] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('');
  const [clickedAdd, setClickedAdd] = useState<boolean>(false);

  const handleAddContact = async () => {
    try {
      AddContactDoc(name, number);
      navigation.navigate('Transferir', { name: name, card_number: number });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.campos}>
        <InputDestinatario
          placeholder="Nombre Completo"
          icono="user"
          onChange={(text) => setName(text)}
          modo="texto"
          showError={clickedAdd && !name}
        />
        <InputDestinatario
          onChange={(text) => setNickname(text)}
          placeholder="Alias"
          maxLength={5}
          modo="texto"
          icono=''
          showError={clickedAdd && !nickname}
        />
        <InputDestinatario
          placeholder="Numero de Cuenta"
          icono="wallet"
          onChange={(text) => setNumber(Number(text))}
          maxLength={16}
          modo="numero"
          showError={clickedAdd && !number}
        />
        <View style={styles.Inputbt}>
          <FormButton text="Agregar" fn={() => { setClickedAdd(true); handleAddContact(); }} disabled={!name || !number || !nickname} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEAEA',
    alignItems: 'center',
  },
  campos: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Inputbt: {
    marginTop: 50,
    width: '100%'
  },
});
