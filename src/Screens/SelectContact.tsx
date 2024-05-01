import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Contacto from '../Components/Contacto';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../App';

export default function SelectContact() {
  const {userInfo} = useContext(UserContext);
  const navigation = useNavigation();

  const contacts = userInfo.contactos;

  return (
    <View style={styles.container}>
      <View style={styles.headerScreen}>
        <Text style={styles.headerTitle}>Seleccionar contacto</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close-outline" size={45} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <View style={styles.containertitleee}>
          <Text style={styles.Titledestino}>
            ¿A quién le quieres transferir?
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddContact');
          }}>
          <View style={styles.ContainerBottn}>
            <Icon name="add-circle" size={70} color="#ffffff" />
            <Text style={styles.TextNuevo}>Agregar Contacto</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.containerdos}>
        <Text style={styles.Titleguardado}>Tus contactos:</Text>
        {contacts.length === 0 && (
          <Text
            style={{
              color: '#4A52FF',
              alignSelf: 'center',
              fontSize: 18,
              paddingTop: 20,
            }}>
            !Aun no tienes ningun contacto!
          </Text>
        )}
        <FlatList
          data={contacts}
          renderItem={item => (
            <Contacto
              nombre={item.item.nombre}
              numero={item.item.numero}
              icono="cc-visa"
              virtual={false}
            />
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  containertitleee: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  headerScreen: {
    backgroundColor: '#021B9E',
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
  containerdos: {
    // backgroundColor: '#fff',
    padding: 26,
  },
  header: {
    backgroundColor: '#00079A',
    paddingVertical: 40,
    paddingHorizontal: 35,
    gap: 20,
    borderBottomRightRadius: 100,
  },
  Titledestino: {
    fontSize: 20,
    color: '#ffffff',
    // fontWeight: 'bold',
  },
  TextNuevo: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'white',
  },
  ContainerBottn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 20,
  },
  Titleguardado: {
    fontSize: 19,
    // marginTop: 10,
    color: 'grey',
  },
});
