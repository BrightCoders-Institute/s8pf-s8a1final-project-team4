import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Contacto from '../Components/Contacto';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../App';
// import {getContact} from '../Firebase/db';

export default function SelectContact() {
  const {userInfo} = useContext(UserContext);
  const navigation = useNavigation();

  const contacts = userInfo.contactos;

  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <View style={styles.containertitleee}>
      <Text style={styles.Titledestino}>¿A quién le quieres transferir?</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddContact');
        }}>
        <View style={styles.ContainerBottn}>
          <Icon name="add-circle" size={60} color="#ffffff"/>
          <Text style={styles.TextNuevo}>Agregar Contacto</Text>
        </View>
      </TouchableOpacity>
      </View>
      <View style={styles.containerdos}>
      <Text style={styles.Titleguardado}>Tus contactos:</Text>
      
      <FlatList
        data={contacts}
        renderItem={item => (
          <Contacto 
            nombre={item.item.nombre}
            numero={item.item.numero}
            icono="cc-mastercard"
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
    backgroundColor: '#fff',
  },
  containertitleee: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  containerdos: {
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    backgroundColor: '#00079A',
    padding: 20,
    gap: 50,
    borderBottomRightRadius: 150,
    // paddingBottom: 20,
  },
  Titledestino: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  TextNuevo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  ContainerBottn: {
    
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 20,
  },
  Titleguardado: {
    fontSize: 20,
    marginTop: 20,
  },
});
