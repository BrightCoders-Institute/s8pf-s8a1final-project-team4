import React, {useEffect, useContext} from 'react';
import {StyleSheet, View, Text, Alert, TouchableOpacity} from 'react-native';
import FormButton from '../Components/Button';
import FormInput from '../Components/Input';
import Icon2 from 'react-native-vector-icons/Feather';
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, StackActions} from '@react-navigation/native';
import {doc, setDoc, collection, addDoc, getDoc} from 'firebase/firestore';
import {auth, db} from '../Firebase/firebaseconfig';
import {UserContext} from '../../App';

function getRandomCardNumber() {
  const cardNum = [];
  for (let i = 0; i < 16; i++) {
    const randomNum = Math.floor(Math.random() * 10);
    cardNum.push(randomNum);
  }
  return cardNum.join('');
}

export default function LogIn() {
  const [user, setUser] = React.useState('');
  const [userError, setUserError] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');
  const [rePasswordVisible, setRePasswordVisible] = React.useState(true);
  const navigation = useNavigation();
  const {handleUserActive} = useContext(UserContext);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '665755295591-jkg5kodjv4c1446utumh51fs89o7h24j.apps.googleusercontent.com',
    });
  }, []);

  const handleEmailChange = (value: string) => {
    // Expresión regular que verifica si el valor es un correo electrónico válido
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (regex.test(value) || value === '') {
      setUser(value);
      setUserError(''); // Limpiar el mensaje de error
    } else {
      setUserError('El correo electrónico no es válido');
    }
  };

  const handleLogInWithFirebase = () => {
    console.log('user', user, password);
    signInWithEmailAndPassword(auth, user, password)
      .then(userCredential => {
        const userUID = userCredential.user.uid;
        AsyncStorage.setItem('userID', userUID);
        //asignar userUid a context
        handleUserActive();
        navigation.dispatch(StackActions.replace('Home'));
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage === 'auth/user-not-found') {
          Alert.alert('Este usuario no esta registrado');
        } else {
          console.log('error', errorCode, errorMessage);
        }
        setPasswordError('El correo o la Contraseña son incorrectos');
      });
  };

  const handleLogInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, googleCredential);
      const uid = result.user.uid;
      await AsyncStorage.setItem('userUID', uid);
      //asignar uid a context
      handleUserActive();
      // Crear documento en Firestore en la colección "users"
      const userDocRef = doc(db, 'users', uid);
      const docSnap = await getDoc(userDocRef);
      //// CHECK IF IT EXIST
      console.log(docSnap.exists());
      if (!docSnap.exists()) {
        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        };
        await setDoc(userDocRef, userData);
        // Crear documento en la subcolección "cards" dentro de la colección "users"
        const cardsCollectionRef = collection(db, `users/${uid}/cards`);
        const cardData = {
          number: getRandomCardNumber(),
          saldo: 10000,
          tipo: 'debito',
        };
        await addDoc(cardsCollectionRef, cardData);
        const cardData2 = {
          number: getRandomCardNumber(),
          saldo: 5000,
          tipo: 'credito',
        };
        await addDoc(cardsCollectionRef, cardData2);
      }
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
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
          text="Correo"
          iconName="user"
          msgError={userError}
          onInputChange={value => handleEmailChange(value)}
        />
        <FormInput
          text="Contraseña"
          secureTextEntry={rePasswordVisible}
          iconName={rePasswordVisible ? 'eye-off' : 'eye'}
          viewPass={() => setRePasswordVisible(!rePasswordVisible)}
          msgError={passwordError}
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
              navigation.navigate('Home');
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
