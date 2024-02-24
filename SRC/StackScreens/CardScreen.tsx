/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-lone-blocks */
import React from 'react';
import { StyleSheet, TextInput, View, Text, Image, TouchableOpacity } from 'react-native';
{/* Importaciones de iconos */ }
import mail from 'react-native-vector-icons/Entypo';
import card from 'react-native-vector-icons/Entypo';
import money from 'react-native-vector-icons/FontAwesome6';
import nip from 'react-native-vector-icons/AntDesign';
import back from 'react-native-vector-icons/Ionicons';
{/* Importaciones de estilos */ }
import { StylesInput } from '../Styles/TextInputStyles';
import { StylesText } from '../Styles/TextStyles';
import { StylesImage } from '../Styles/ImageStyles';
import { Stylesbuttons } from '../Styles/ButtonStyles';

export const CardScreen = () => {
    const handleClick = () => {
        console.log('Se hizo clic en la flecha');
    };
    return (
        <View style={styles.container}>
            <View style={styles.Containercampos}>
                {/* Boton de regreso || back */}
                <View style={styles.containerback}>
                    <back.Button
                        name="arrow-back"
                        color={'black'}
                        backgroundColor="#7d6fd1"
                        size={35}
                        onPress={handleClick}
                    />
                </View>
                {/* Contenedor de la imagen y el titulo */}
                <View style={styles.containerimagen}>
                    <Image style={StylesImage.image} source={{ uri: 'https://i.pinimg.com/originals/a1/99/07/a19907361762c957d935379c128aa353.jpg' }} />
                    <Text style={StylesText.titles}>Registro de tarjeta</Text>
                </View>
                {/* Contenedor de los text input */}
                <View style={styles.campos}>
                    <View style={StylesInput.InputView}>
                        <TextInput placeholder="Nombre completo"></TextInput>
                        {/* Contenedor de los iconos */}
                            <mail.Button
                                name="mail"
                                color={'black'}
                                backgroundColor="'transparent'"
                                size={30}
                            />
                    </View>
                    <View style={StylesInput.InputView}>
                        <TextInput placeholder="Saldo inicial"></TextInput>
                        <money.Button
                            name="money-check-dollar"
                            color={'black'}
                            backgroundColor="transparent"
                            size={30}
                        />
                    </View>
                    <View style={StylesInput.InputView}>
                        <TextInput placeholder="nip"></TextInput>
                        <nip.Button
                            name="lock1"
                            color={'black'}
                            backgroundColor="transparent"
                            size={30}
                        />
                    </View>
                    <View style={StylesInput.InputView}>
                        <TextInput placeholder="tipo de tarjeta"></TextInput>
                        <card.Button
                            name="credit-card"
                            color={'black'}
                            backgroundColor="transparent"
                            size={30}
                        />
                    </View>
                    {/* Contenedor de los botones */}
                    <View style={styles.ContainerButton}>
                        <TouchableOpacity style={Stylesbuttons.Button}>
                            <Text style={Stylesbuttons.TextButton}>Crear tarjeta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.containericons}>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(125, 111, 209)',
        paddingTop: 5,
        paddingHorizontal: 10,
    },
    Containercampos: {
        flex: 1,
        padding: 10,
    },
    containerback: {
        alignItems: 'flex-start',
        backgroundColor: 'rgb(125, 111, 209)',
    },
    containerimagen: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
        marginTop: 20,
    },
    ContainerButton: {
        marginTop: 30,
        alignItems: 'center',
    },
    containericons: {
        flexDirection: 'row',
        backgroundColor: 'rgb(125, 111, 209)',
    },
    campos: {
        marginTop: 10,
    },
});
