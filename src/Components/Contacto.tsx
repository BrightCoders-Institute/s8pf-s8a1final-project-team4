import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import ConfirmationModal from '../Components/ConfirmationModal';
import {DeleteContact} from '../Firebase/db';

type Props = {
  nombre: string;
  numero: number;
  icono: string;
  virtual: boolean;
};

export default function Contacto({nombre, numero, icono, virtual}: Props) {
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();
  return (
    <View style={virtual ? styles.virtualCard : styles.card}>
      <TouchableOpacity
        style={styles.touchableContainer}
        onPress={() => {
          if (virtual) {
            navigation.navigate('VirtualTransferir', {
              name: nombre,
              card_number: numero,
            });
          } else {
            navigation.navigate('Transferir', {
              name: nombre,
              card_number: numero,
            });
          }
        }}>
        <View
          style={
            virtual ? styles.virtualHeaderImgTextCont : styles.headerImgTextCont
          }>
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
        message={`¿Estas seguro de borrar a \n\n${nombre}de tus contactos?`}
        onConfirm={async () => {
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
  virtualCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#004FBB',
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
  virtualHeaderImgTextCont: {
    height: 70,
    width: 70,
    borderRadius: 100,
    backgroundColor: '#004FBB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImgText: {
    color: 'white',
    fontSize: 28,
  },
  Text: {
    fontSize: 20,
    fontWeight: '900',
    color: 'blue',
    alignSelf: 'flex-start',
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
  },
});
