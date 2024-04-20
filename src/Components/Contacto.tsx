import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ConfirmationModal from '../Components/ConfirmationModal';
import {DeleteContact} from '../Firebase/db';

type Props = {
  nombre: string;
  numero: number;
  icono: string;
  onDelete: () => {};
};

export default function Contacto({nombre, numero, icono, onDelete}: Props) {
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();
  console.log('nombre', nombre);
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.touchableContainer}
        onPress={() => {
          navigation.navigate('Transferir', {
            name: nombre,
            card_number: numero,
          });
        }}>
        <View style={styles.headerImgTextCont}>
          <Text style={styles.headerImgText}>{nombre[0].toUpperCase()}</Text>
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.Text}>{nombre}</Text>
          <View style={styles.containerdos}>
            <Text style={styles.Textnumber}>
              {'● ' + numero?.toString().slice(-4)}
            </Text>
            <Icon name={icono} size={28} color="#3B44FF" />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.containertrash}
        onPress={() => setShowModal(true)}>
        <Icon name="trash-alt" size={26} color="white" />
      </TouchableOpacity>
      <ConfirmationModal
        visible={showModal}
        message={`¿Estas seguro de borrar a ${nombre} de tus contactos?`}
        onConfirm={async () => {
          //delete contact
          await DeleteContact(nombre, numero);
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#021B9E',
    marginTop: 20,
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 1,
  },
  touchableContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 10,
  },
  Img: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  headerImgTextCont: {
    height: 70,
    width: 70,
    borderRadius: 100,
    backgroundColor: '#021B9E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImgText: {
    color: 'white',
    fontSize: 28,
  },
  // containertres: {
  //   backgroundColor: 'red',
  // },
  Text: {
    fontSize: 20,
    fontWeight: '900',
    color: 'blue',
    alignSelf: 'flex-start',
    // paddingBottom: 5,
  },
  Textnumber: {
    fontSize: 18,
    letterSpacing: 2,
    fontStyle: 'italic',
    fontWeight: '900',
    color: '#3B44FF',
  },
  containerdos: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 25,
    alignSelf: 'center',
  },
  containertrash: {
    padding: 10,
    // flex: 1,
    // backgroundColor: 'blue',
  },
});
