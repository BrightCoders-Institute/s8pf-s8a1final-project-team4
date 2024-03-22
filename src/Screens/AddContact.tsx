import {View, StyleSheet} from 'react-native';
import React, {useState, useSyncExternalStore} from 'react';
import InputDestinatario from '../Components/InputDestinatario';
import FormButton from '../Components/Button';
import {useNavigation} from '@react-navigation/native';
import {AddContactDoc} from '../Firebase/db';

export default function AddContact() {
  const navigation = useNavigation();
  const [name, setName] = useState<string>('');
  const [number, setNumber] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('');

  const handleAddContact = async () => {
    try {
      AddContactDoc(name, number);
      navigation.navigate('Transferir', {name: name, card_number: number});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <InputDestinatario
        style={styles.Input}
        placeholder="Nombre Completo"
        icono="user"
        onChange={setName}
      />
      <InputDestinatario onChange={setNickname} placeholder="Alias" />
      <InputDestinatario
        style={styles.Inputbt}
        placeholder="Numero de Cuenta"
        icono="wallet"
        tipo="number-pad"
        onChange={setNumber}
      />
      <FormButton text="Agregar" fn={() => handleAddContact()} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEAEA',
    alignItems: 'center',
    padding: 20,
  },
  containerBtn: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  Input: {
    marginTop: 100,
  },
  Inputbt: {
    marginBottom: 60,
  },
});
