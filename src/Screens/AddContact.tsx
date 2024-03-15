import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Contacto from '../Components/Contacto';
import {useNavigation} from '@react-navigation/native';

export default function AddContact() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.Titledestino}>Destinatario</Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddContact');
        }}>
        <View style={styles.ContainerBottn}>
          <Icon name="add-circle" size={60} color="#4A52FF" />
          <Text style={styles.TextNuevo}>Nuevo</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.Titleguardado}>Guardados</Text>
      <ScrollView>
        <Contacto nombre="Yahir Cortes" numero={1234} icono="cc-visa" />
        <Contacto nombre="Roberto" numero={1234} icono="cc-mastercard" />
        <Contacto nombre="Enrique" numero={1234} icono="cc-visa" />
        <Contacto nombre="Ricardo Milos" numero={1234} icono="cc-mastercard" />
        <Contacto nombre="Yahir Cortes" numero={1234} icono="cc-visa" />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  Titledestino: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  TextNuevo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A52FF',
  },
  ContainerBottn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 20,
  },
  Titleguardado: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
