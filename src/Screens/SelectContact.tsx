import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Contacto from '../Components/Contacto';
import {useNavigation} from '@react-navigation/native';
import { getContact } from '../Firebase/db';

export default function SelectContact() {
  const navigation = useNavigation();
  const [contact,setContact] = useState([])
  const getData = async () =>{
    let arr = await getContact()
    console.log("COntacts",arr)
    setContact(arr)
  }
  useEffect(() =>{
   getData()
  },[])
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
      {
        contact.length == 0 && <Text>Cagando...</Text>
      }
      <FlatList data={contact}
      renderItem={(item) => (<Contacto nombre={item.item.name} numero={(item.item.number)} icono="cc-visa" />)}>

      </FlatList>
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
