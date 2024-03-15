import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
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
      <View style={styles.imgView}>
        <View style={styles.userImg} />
      </View>
      <View style={styles.inputView}>
        <FormInput
          text="No de cuenta"
          iconName="creditcard"
          onInputChange={setUser}
        />
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
      </View>
      <View style={styles.linksView}>
        <Text style={styles.links}>
          If you don't have an account,{' '}
          <Text
            onPress={() => {
              navigation.navigate('SignUp');
            }}
            style={{color: 'blue', textDecorationLine: 'underline'}}>
            register
          </Text>{' '}
          now
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flex: 2,
    display: 'flex',
  },
  imgView: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 2,
  },
  userImg: {
    borderRadius: 100,
    width: 120,
    height: 120,
    backgroundColor: 'white',
  },
  buttonView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },

  linksView: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  links: {
    fontSize: 15,
  },
  inputView: {
    flex: 3,

    justifyContent: 'center',
    alignItems: 'center',
  },
  inputs: {
    width: '70%',
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 5,
  },
});
