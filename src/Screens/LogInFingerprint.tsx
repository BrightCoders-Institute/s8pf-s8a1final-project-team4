import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import FormButton from '../Components/Button';
import {useNavigation} from '@react-navigation/native';
import {GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doc, setDoc, getDoc, onSnapshot} from 'firebase/firestore';
import {auth, db} from '../Firebase/firebaseconfig';
import {useEffect, useContext} from 'react';
import {UserContext} from '../../App';

function getRandomCardNumber() {
  const cardNum = [];
  for (let i = 0; i < 16; i++) {
    const randomNum = Math.floor(Math.random() * 10);
    cardNum.push(randomNum);
  }
  return cardNum.join('');
}
function getRandomCvv() {
  const cvv = [];
  for (let i = 0; i < 3; i++) {
    const randomNum = Math.floor(Math.random() * 10);
    cvv.push(randomNum);
  }
  return cvv.join('');
}
function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export default function LogInFingerprint() {
  const navigation = useNavigation();
  const {handleUserActive} = useContext(UserContext);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '665755295591-jkg5kodjv4c1446utumh51fs89o7h24j.apps.googleusercontent.com',
    });
  }, []);

  const handleLogInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, googleCredential);
      const uid = result.user.uid;
      await AsyncStorage.setItem('userUID', uid);
      const userDocRef = doc(db, 'users', uid); // Crear documento en Firestore en la colección "users"
      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) {
        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          tarjetaDebito: {
            number: getRandomCardNumber(),
            saldo: 10000,
            cvv: getRandomCvv(),
            movimientos: [
              {
                fecha: getCurrentDate(),
                monto: 10000,
                descripcion: 'Apertura de cuenta',
                tipo: 'Transferencia bancaria',
              },
            ],
          },
          tarjetaCredito: {
            number: getRandomCardNumber(),
            saldo: 10000,
            cvv: getRandomCvv(),
            movimientos: [
              {
                fecha: getCurrentDate(),
                monto: 10000,
                descripcion: 'Apertura de cuenta',
                tipo: 'Transferencia bancaria',
              },
            ],
          },
          contactos: [],
        };
        handleUserActive(userData);
        await setDoc(userDocRef, userData);
      } else {
        const userData = docSnap.data();
        handleUserActive(userData);
      }
      // Suscribirse a cambios en los datos del usuario
      const unsubscribe = onSnapshot(userDocRef, doc => {
        if (doc.exists()) {
          const userData = doc.data();
          handleUserActive(userData);
        }
      });
      navigation.navigate('Home');
      // Retornar la función de limpieza para cancelar la suscripción
      return () => unsubscribe();
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
      <Icon2 name="user" size={80} color={'#00079A'} style={styles.align} />
      <View style={{gap: 30}}>
        <FormButton
          text={'Log in'}
          fn={() => {
            navigation.navigate('LogIn');
          }}
        />
        <View style={{gap: 25}}>
          <FormButton
            text={'Log in with Google'}
            fn={() => handleLogInWithGoogle()}
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
        <View style={styles.align}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LogIn');
            }}
            style={{paddingTop: 20}}>
            <Icon name="fingerprint" size={160} color={'#4A52FF'} />
          </TouchableOpacity>
          <Text style={{color: 'grey', fontSize: 15}}>
            Entrar con huella digital
          </Text>
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
