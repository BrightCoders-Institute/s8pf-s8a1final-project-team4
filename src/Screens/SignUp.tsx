import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Alert, TouchableOpacity} from 'react-native';
import FormButton from '../Components/Button';
import FormInput from '../Components/Input';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../Firebase/firebaseconfig';
import {GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/Feather';

export default function SignUp() {
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '665755295591-jkg5kodjv4c1446utumh51fs89o7h24j.apps.googleusercontent.com',
    });
  }, []);

  const handleSignUpFirebase = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        console.log('User created!');
        const user = userCredential.user;
        console.log('user', user);
        navigation.navigate('LogIn');
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage === 'auth/email-already-in-use') {
          Alert.alert('Este email ya esta registrado');
        } else {
          Alert.alert(errorMessage);
        }

        console.log('error', errorCode, errorMessage);
        // ..
      });
  };

  const handleSignUpWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      console.log(googleCredential);
      const result = await signInWithCredential(auth, googleCredential);
      await AsyncStorage.setItem('userUID', result.user.uid);
    } catch (err: any) {
      console.log(err);
      Alert.alert('Ocurrio un error al registrarse');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        <Text style={styles.logoText}>SnapPay</Text>
      </View>
      <Icon2 name="user" size={80} color={'#4A52FF'} style={styles.align} />
      <View style={styles.inputView}>
        <FormInput
          text="Nombre completo"
          iconName="user"
          onInputChange={setName}
        />
        <FormInput text="Email" iconName="mail" onInputChange={setEmail} />
        <FormInput
          text="Contraseña"
          iconName="eyeo"
          onInputChange={setPassword}
        />
      </View>
      <View style={styles.buttonView}>
        <FormButton
          text={'Sign up'}
          fn={() => {
            handleSignUpFirebase();
          }}
        />
        <FormButton
          text={'Sign up with google'}
          fn={() => {
            handleSignUpWithGoogle();
          }}
        />
        <View style={styles.textView}>
          <Text style={styles.text}>Already an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LogIn');
            }}>
            <Text style={styles.register}>Log in</Text>
          </TouchableOpacity>
          <Text style={styles.text}>now</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flex: 1,
    gap: 40,
  },
  logoView: {
    backgroundColor: '#00079A',
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderBottomRightRadius: 8,
  },
  logoText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  align: {
    alignSelf: 'center',
  },
  inputView: {
    alignItems: 'center',
    gap: 20,
  },
  buttonView: {
    alignItems: 'center',
    gap: 30,
  },
  textView: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: 'black',
    fontSize: 15,
  },
  register: {
    color: '#041CF0',
    textDecorationLine: 'underline',
    fontWeight: '900',
    fontSize: 18,
  },
});
