import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import InputDestinatario from '../Components/InputDestinatario';
import FormButton from '../Components/Button';
import {useNavigation} from '@react-navigation/native';
import {AddContactDoc, checkIfAccountExists} from '../Firebase/db';
import Icon from 'react-native-vector-icons/Ionicons';

export default function VirtualAddContact() {
  const navigation = useNavigation();
  const [name, setName] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [clickedAdd, setClickedAdd] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleAddContact = async () => {
    try {
      //Verificar si el número de cuenta existe antes de agregar el contacto
      const exists = await checkIfAccountExists(number);
      if (!exists) {
        setError(
          'El número de cuenta no está dado de alta en la base de datos.',
        );
        return;
      }

      //Agregar el contacto
      await AddContactDoc(name, number);
      navigation.pop();
      navigation.navigate('VirtualTransferir', {name, card_number: number});
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
      <View style={styles.headerScreen}>
        <Text style={styles.headerTitle}>Agregar nuevo contacto</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close-outline" size={45} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <View style={styles.campos}>
          <View style={styles.containerTitle}>
            <Text style={{fontSize: 20, color: 'white'}}>Nombre</Text>
          </View>
          <InputDestinatario
            placeholder="Nombre Completo"
            icono="user"
            onChange={text => setName(text)}
            modo="texto"
            showError={clickedAdd && !name}
          />
          <View style={{padding: 20}} />
          <View style={styles.containerTitle}>
            <Text style={{fontSize: 20, color: 'white'}}>Numero de Cuenta</Text>
          </View>
          <InputDestinatario
            placeholder="Numero de Cuenta"
            icono="wallet"
            onChange={text => setNumber(text)}
            maxLength={16}
            modo="numero"
            showError={clickedAdd && !number}
          />
        </View>
      </View>
      <View style={styles.InputBtn}>
        <FormButton
          text="Agregar"
          fn={handleAddButtonPress}
          disabled={!name || !number}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEAEA',
  },
  containerTitle: {
    flexDirection: 'row',
    width: '100%',
  },
  headerScreen: {
    backgroundColor: '#004FBB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
  },
  header: {
    backgroundColor: '#0054C6',
    padding: 60,
    gap: 50,
    borderBottomRightRadius: 150,
  },
  campos: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  InputBtn: {
    marginTop: 50,
    width: '100%',
  },
  errorText: {
    color: 'red',
    width: '100%',
    textAlign: 'center',
  },
});
