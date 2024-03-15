import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import IconC from 'react-native-vector-icons/Ionicons';
import IconS from 'react-native-vector-icons/Ionicons';

export default function ConfigUser() {
    return (
        <View style={style.mainContainer}>
            <View style={style.ContentContainer}>
                <Image
                    style={style.Img}
                    source={{
                        uri: 'https://i.pinimg.com/736x/25/ed/64/25ed6467aa8b4677bf04e60295797802.jpg',
                    }}
                />
                <Text style={style.TextNombre}> Ricardo </Text>
            </View>

            <View style={style.ViewsContainer}>
                <TouchableOpacity>
                    <View style={style.Viewcontainer}>
                        <Icon name="user"size={45} color="blue" />
                        <Text style={style.TextView}> Configurar datos personales</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={style.Viewcontainer}>
                        <IconS name="shield-checkmark-outline"size={45} color="blue" />
                        <Text style={style.TextView}> Seguridad</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={style.Viewcontainer}>
                        <IconC name="return-down-back"size={45} color="blue" />
                        <Text style={style.TextView}> Cierra sesion</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    ContentContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 70,
    },
    ViewsContainer: {
        flex: 1,
        marginTop: 20,
    },
    Viewcontainer: {
        marginTop: 25,
        marginHorizontal: 30,
        backgroundColor: 'white',
        flexDirection:'row',
        height: 50,
        alignItems: 'center',
    },
    Img: {
        height: 100,
        width: 100,
        borderRadius: 100,
    },
    TextNombre: {
        fontSize: 25,
        textAlignVertical:'center',
        marginLeft: 20,
    },
    TextView: {
        fontSize: 20,
        color:'blue'
    },
})