import React,{useEffect} from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import FormButton from '../Components/Button'
import FormInput from '../Components/Input'
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebaseconfig';
import { GoogleAuthProvider,signInWithCredential } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SignUp() {
    const [name,setName] = React.useState<string>('');
    const [email,setEmail] = React.useState<string>('');
    const [password,setPassword] = React.useState<string>('');
    useEffect(()=>{
        GoogleSignin.configure({
          webClientId: '665755295591-jkg5kodjv4c1446utumh51fs89o7h24j.apps.googleusercontent.com',
      });
      },[])

      const handleSignUpFirebase = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log("User created!")
                const user = userCredential.user;
                console.log("user", user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorMessage == 'auth/email-already-in-use') {
                    Alert.alert("Este email ya esta registrado")
                } else {
                    Alert.alert(errorMessage)
                }

                console.log("error", errorCode, errorMessage)
                // ..
            });
    }
    const handleSignUpWithGoogle = async  () => {
        try{
           await GoogleSignin.hasPlayServices()
           const {idToken}  = await GoogleSignin.signIn()
           const googleCredential = GoogleAuthProvider.credential(idToken)
           console.log(googleCredential)
           const result = await signInWithCredential(auth,googleCredential)
           await AsyncStorage.setItem('userUID',result.user.uid)
          
        }catch(err:any){
            console.log(err)
            Alert.alert("Ocurrio un error al registrarse")
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.imgView}>
                <View style={styles.userImg}></View>
            </View>
            <View style={styles.inputView}>
                <FormInput text='Nombre completo' iconName='user' onInputChange={setName}></FormInput>
                <FormInput text='Email' iconName='mail' onInputChange={setEmail}></FormInput>
                <FormInput text='Contraseña' iconName='eyeo' onInputChange={setPassword}></FormInput>
            </View>
            <View style={styles.buttonView}>
                <FormButton text={"Sign up"} fn={() => { handleSignUpFirebase() }}></FormButton>
                <FormButton text={"Sign up with google"} fn={() => { handleSignUpWithGoogle() }}></FormButton>
            </View>
            <View style={styles.linksView}>
                <Text style={styles.links}>If you alredy have an account, <Text onPress={() => { }} style={{ color: "blue", textDecorationLine: "underline" }}>log in</Text> now</Text>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
        flex: 2,
        display: "flex"

    },
    imgView: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        flex: 2,

    },
    userImg: {
        borderRadius: 100,
        width: 120,
        height: 120,
        backgroundColor: "white"
    },
    buttonView: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 2,

    },

    linksView: {
        flex: 2,
        justifyContent: "flex-start",
        alignItems: "center",


    },
    links: {
        fontSize: 15
    },
    inputView: {
        flex: 3,
        justifyContent: "flex-end",
        alignItems: "center",


    },
})

