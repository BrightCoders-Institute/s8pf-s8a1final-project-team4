import {View, StyleSheet, Text} from 'react-native';
import React, {useState, useSyncExternalStore} from 'react';
import InputDestinatario from '../Components/InputDestinatario';
import FormButton from '../Components/Button';
import {useNavigation} from '@react-navigation/native';
import {AddContactDoc} from '../Firebase/db';

export default function AddContact() {
  const navigation = useNavigation();
  const [name, setName] = useState<string>('');
  const [number, setNumber] = useState<number>(0);
  const [clickedAdd, setClickedAdd] = useState<boolean>(false);

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
      <View style={styles.header}>
        
      <View style={styles.campos}>
          <View style={styles.containertittle}>
            <Text style={{fontSize: 20, color: 'white',}}>
              Nombre
            </Text>
          </View>
        <InputDestinatario
          placeholder="Nombre Completo"
          icono="user"
          onChange={text => setName(text)}
          modo="texto"
          showError={clickedAdd && !name}
        />
       <View style={styles.containertittle}>
            <Text style={{fontSize: 20, color: 'white',}}>
              Numero de Cuenta
            </Text>
          </View>
        <InputDestinatario
          placeholder="Numero de Cuenta"
          icono="wallet"
          onChange={text => setNumber(Number(text))}
          maxLength={16}
          modo="numero"
          showError={clickedAdd && !number}
        />
        </View>
        </View>
        <View style={styles.Inputbt}>
          <FormButton
            text="Agregar"
            fn={() => {
              setClickedAdd(true);
              handleAddContact();
            }}
            disabled={!name || !number}
          />
          </View>
      </View>
  
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEAEA',
  },
  containertittle: {
    flexDirection: 'row',
    width: '100%',
  },
  header: {
    backgroundColor: '#00079A',
    padding: 60,
    gap: 50,
    borderBottomRightRadius: 150,
    // paddingBottom: 20,
  },
  campos: {
    // flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Inputbt: {
    marginTop: 50,
    width: '100%',
  },
});
