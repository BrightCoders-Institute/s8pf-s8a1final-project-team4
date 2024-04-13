<<<<<<< Updated upstream
import { View, StyleSheet } from 'react-native';
import React, { useState, useSyncExternalStore } from 'react';
import InputDestinatario from '../Components/InputDestinatario';
import FormButton from '../Components/Button';
import { useNavigation } from '@react-navigation/native';
import { AddContactDoc } from '../Firebase/db';
=======
import { View, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import InputDestinatario from '../Components/InputDestinatario';
import FormButton from '../Components/Button';
import { useNavigation } from '@react-navigation/native';
import { AddContactDoc, checkIfAccountExists } from '../Firebase/db';
>>>>>>> Stashed changes

export default function AddContact() {
  const navigation = useNavigation();
  const [name, setName] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [clickedAdd, setClickedAdd] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleAddContact = async () => {
    try {
<<<<<<< Updated upstream
      AddContactDoc(name, number);
      navigation.navigate('Transferir', { name: name, card_number: number });
=======
      // Verificar si el número de cuenta existe antes de agregar el contacto
      const exists = await checkIfAccountExists(number);
      if (!exists) {
        setError('El número de cuenta no está dado de alta en la base de datos.');
        return;
      }

      // Agregar el contacto si el número de cuenta existe
      await AddContactDoc(name, number);
      navigation.navigate('Transferir', { name, card_number: number });
>>>>>>> Stashed changes
    } catch (err) {
      console.error('Error adding contact:', err);
      setError('Hubo un error al agregar el contacto.');
    }
  };

  const handleAddButtonPress = () => {
    setClickedAdd(true);
    setError(''); // Limpiar cualquier error anterior al hacer clic en el botón "Agregar"
    handleAddContact();
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
<<<<<<< Updated upstream
          onChange={(text) => setNumber(Number(text))}
=======
          onChange={text => setNumber(text)}
>>>>>>> Stashed changes
          maxLength={16}
          modo="numero"
          showError={clickedAdd && !number}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.Inputbt}>
<<<<<<< Updated upstream
          <FormButton text="Agregar" fn={() => { setClickedAdd(true); handleAddContact(); }} disabled={!name || !number || !nickname} />
=======
          <FormButton
            text="Agregar"
            fn={handleAddButtonPress}
            disabled={!name || !number || !nickname}
          />
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    flex: 1,
=======
>>>>>>> Stashed changes
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Inputbt: {
    marginTop: 50,
    width: '100%'
  },
  errorText: {
    color: 'red',
    width: '100%',
    textAlign: 'center',
  },
});
