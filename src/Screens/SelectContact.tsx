import React, {useContext, useEffect,useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Contacto from '../Components/Contacto';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../App';
import { getContact } from '../Firebase/db';

export default function SelectContact() {
  const {userInfo} = useContext(UserContext);
  const [contacs, setContacts] = useState([])
  const navigation = useNavigation();
  useEffect(() => {
    handleGetContacts()
   },[])
  
  const handleGetContacts = async () =>{
     let data = await getContact()
      setContacts(data)
  } 
  
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
        
           <FlatList
          data={contacs}
          renderItem={item => (
            
            <Contacto
              nombre={item.item.nombre}
              numero={item.item.numero}
              icono="cc-mastercard"
            />
          )}
        />
        
      
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
