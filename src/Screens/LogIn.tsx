import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Alert, TouchableOpacity} from 'react-native';
import FormButton from '../Components/Button';
import FormInput from '../Components/Input';
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {auth} from '../Firebase/firebaseconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/Feather';

export default function LogIn() {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '665755295591-jkg5kodjv4c1446utumh51fs89o7h24j.apps.googleusercontent.com',
    });
  }, []);

  const handleLogInWithFirebase = () => {
    console.log('user', user, password);
    signInWithEmailAndPassword(auth, user, password)
      .then(userCredential => {
        const user = userCredential.user;
        AsyncStorage.setItem('userID', user.uid);
        navigation.navigate('Home');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage === 'auth/user-not-found') {
          Alert.alert('Este usuario no esta registrado');
        } else {
          console.log('error', errorCode, errorMessage);
        }

        Alert.alert('Ocurrio un error en el servidor');
      });
  };

  const handleLogInWithGoogle = async () => {
    await GoogleSignin.signOut();
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, googleCredential);
      await AsyncStorage.setItem('userUID', result.user.uid);

      navigation.navigate('Home');
    } catch (err: any) {
      Alert.alert(
        'Ocurrio un error al iniciar sesion con google, trate nuevamente',
      );
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        <Text style={styles.logoText}>SnapPay</Text>
      </View>
      <Icon2 name="user" size={80} color={'#4A52FF'} style={styles.align} />
      <View style={styles.inputView}>
        <FormInput text="Correo" iconName="mail" onInputChange={setUser} />
        <FormInput
          text="Contraseña"
          iconName="eyeo"
          onInputChange={setPassword}
        />
      </View>
      <View style={styles.buttonView}>
        <FormButton
          text={'Log in'}
          fn={() => {
            handleLogInWithFirebase();
          }}
        />
        <FormButton
          text={'Log in with google'}
          fn={() => {
            handleLogInWithGoogle();
          }}
        />
        <View style={styles.textView}>
          <Text style={styles.text}>If you don't have an account,</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={styles.register}>register</Text>
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
    gap: 50,
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
