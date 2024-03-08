import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import ImageComp from '../Components/ImageComponent';
import { useDb } from '../Firebase/db';
export default function Login({route}) {
    const navigation = useNavigation()

    const [email, setEmail] = React.useState<String>('')
    const [password, setPassword] = React.useState<String>('')

    const logIn = () => {
        console.log(email, password)
    }
    const googleLogIn = () => {
        console.log("google signin")
        const res = useDb()
        console.log(res)
    }
    
    const profileImage = route.params?.profileImage;

    return (
        <View style={styles.mainView}>

            <View style={styles.formContainer}>
                <View>
                <TouchableOpacity onPress={() => navigation.navigate('ImageProfile')}>
                        <View style={styles.img}>
                            <ImageComp sourceUri={profileImage} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputView}>
                    <TextInput placeholder='Email' style={styles.input} onChangeText={setEmail} />

                </View>
                <View style={styles.inputView}>
                    <TextInput placeholder='Contraseña' style={styles.input} onChangeText={setPassword} />
                    <Icon name='remove-red-eye' size={40} style={styles.icon} />

                </View>

                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.btn} onPress={logIn}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={googleLogIn} >
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Log in with Google</Text>
                    </TouchableOpacity>
                    <Text>If you don't have an account,<Text style={{ color: "blue", textDecorationLine: "underline" }}> register</Text> now </Text>

                </View>
                <Icon name='fingerprint' size={80} style={{ marginTop: 20 }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#7D6FD1"
    },
    inputView: {
        margin: 0,
        padding: 15,
        width: "100%",

    },
    input: {
        borderRadius: 25,
        borderColor: "black",
        borderWidth: 2,
    },
    btnView: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    btn: {
        backgroundColor: "#003B66",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: "70%",
        borderRadius: 25,
        margin: 10
    },
    img: {
        borderRadius: 50,
        height: 80,
        width: 80
    },
    formContainer: {
        borderColor: "black",
        borderWidth: 2,
        height: "70%",
        backgroundColor: "white",
        width: "95%",
        display: "flex",
        justifyContent: "flex-start",
        padding: 30,
        alignItems: "center",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,


    }, icon: {
        position: "absolute",
        alignSelf: "flex-end",
        right: 30,
        top: 22

    }

})
