import { View, Text, StyleSheet, Touchable, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import InputDestinatario from '../Components/InputDestinatario'
import FormButton from '../Components/Button'

export default function Destinatario() {
return (
    <View style={styles.container}>
            <InputDestinatario style={styles.Input} placeholder='Nombre Completo' icono='user'/>
            <InputDestinatario placeholder='Alias'   />
            <InputDestinatario style={styles.Inputbt} placeholder='Numero de Cuenta' icono='wallet' tipo='number-pad' />
            <FormButton text='Agregar' fn={() => {}}/>
    </View>
)
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#EEEAEA',
    alignItems: 'center',
    padding: 20,
    },
    containerBtn: {
    backgroundColor: '#fff',
    marginTop: 10, 
    },
    Input: {
    marginTop: 100,
    },
    Inputbt: {
    marginBottom: 60,
    },
  });