import { View, Text, StyleSheet, Image, Touchable, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import InputTransferir from '../Components/TextInputC';


export default function HomeScreen() {
  return (
    
    <View style={styles.Container}>
        <View style={styles.Header}>
            <Image style={styles.IconP} source={require('../../img/Iconperfil.png')}/>
            <View>
                <Text style={styles.TextBnv}>Hola</Text>
                <Text style={styles.TextName}>Ricardo</Text>
            </View>

            <View style={styles.BtnContainer}>
                <TouchableOpacity style={styles.TouchBtn}>
                    <Icon name='swap-horizontal-outline' size={30} color={'black'} ></Icon>
                    <Text>Transferir</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.ContainerDos}>
            <View style={styles.Tarjeta}>
                
            </View>

            <View style={styles.BtnTarjetas}>
                <Text style={styles.TextTarjetas}>Ver Tajetas</Text>
            </View>

            <Text style={styles.TextDeposito}>Depositar</Text>
            <InputTransferir text='Numero de tarjeta' icon='card-outline'/>
            <InputTransferir text='Cantidad' icon='cash-outline'/>

            <TouchableOpacity style={styles.BtnEnviar}>
                <Text style={styles.BtnText}>Enviar</Text>
            </TouchableOpacity>
                
        </View>
        
    </View>


  )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    Header: {
        backgroundColor: '#7D6FD1',
        width: '100%',
        height: '18%',
        borderBottomLeftRadius : 20,
        borderBottomRightRadius : 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    IconP:{
        borderRadius: 50,
        width: 100,
        height: 100,
        marginLeft: 10,
    },
    TextBnv:{
        color: 'black',
        fontSize: 20,
        marginLeft: 20,
        fontWeight: 'bold'
    },
    TextName:{ 
        color: 'black',
        fontSize: 20,
        marginLeft: 20,
    },
    BtnContainer:{
        flex : 1,
        alignItems: 'flex-end',
        
    },
    TouchBtn:{
        marginRight: 10,
        alignItems: 'center',
        marginBottom: 50,
    },
    ContainerDos:{
        flex: 1,
        alignItems: 'center',
    },
    Tarjeta:{
        backgroundColor: 'black',
        width: '90%',
        height: '30%',
        borderRadius: 20,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    BtnTarjetas:{
        backgroundColor: '#7D6FD1',
        borderRadius: 40,
        width: '90%',
        height: '10%',
        marginTop: 20,
    },
    TextTarjetas:{
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    TextDeposito:{
        color: 'black',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 30,
    },
    BtnEnviar:{
        backgroundColor: '#53207B',
        borderRadius: 40,
        width: '30%',
        height: 30,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    BtnText:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});