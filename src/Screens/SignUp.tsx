import React, {useEffect, useContext} from 'react';
import {StyleSheet, View, Text, Alert, TouchableOpacity} from 'react-native';
import FormButton from '../Components/Button';
import FormInput from '../Components/Input';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../Firebase/firebaseconfig';
import {GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/Feather';
import {doc, setDoc, collection, addDoc, getDoc} from 'firebase/firestore';
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

export default function SignUp() {
  const [name, setName] = React.useState<string>('');
  const [nameError, setNameError] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');
  const [rePasswordVisible, setRePasswordVisible] = React.useState(true);
  const navigation = useNavigation();
  const {handleUserActive} = useContext(UserContext);

  useEffect(() => {
    (async () => {
      await AsyncStorage.removeItem('userID');
    })();
  }, []);

  const handleEmailChange = (value: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(value) || value === '') {
      setEmail(value);
      setEmailError(''); // Limpiar el mensaje de error
    } else {
      setEmailError('El correo electrónico no es válido');
    }
  };

  const handlePasswordChange = (value: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (regex.test(value) || value === '') {
      setPassword(value);
      setPasswordError(''); // Limpiar el mensaje de error
    } else {
      setPasswordError(
        'La contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula, una letra minúscula y un número',
      );
    }
  };

  const handleNameChange = (value: string) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setName(value);
      setNameError(''); // Limpiar el mensaje de error
    } else {
      setNameError('El nombre solo puede contener letras y espacios');
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '665755295591-jkg5kodjv4c1446utumh51fs89o7h24j.apps.googleusercontent.com',
    });
  }, []);

  const handleSignUpFirebase = async () => {
    if (name.length === 0 && email.length === 0 && password.length === 0) {
      setNameError('El nombre solo puede contener letras y espacios');
      setEmailError('El correo electrónico no es válido');
      setPasswordError(
        'La contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula, una letra minúscula y un número',
      );
    } else {
      if (
        nameError.length === 0 &&
        emailError.length === 0 &&
        passwordError.length === 0
      ) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const uid = userCredential.user.uid;
          await AsyncStorage.setItem('userUID', uid);
          const userDocRef = doc(db, 'users', uid); // Crear documento en Firestore en la colección "users"
          const userData = {
            email: email,
            name: name,
            password: password,
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
          navigation.navigate('Home');
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorMessage === 'auth/email-already-in-use') {
            setEmailError('Este correo ya esta en uso');
          } else {
            setEmailError('Este correo ya esta en uso');
          }
          console.log('error', errorCode, errorMessage);
        }
      }
    }
  };

  const handleSignUpWithGoogle = async () => {
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
          text="Nombre completo"
          iconName="user"
          msgError={nameError}
          onInputChange={handleNameChange}
        />
        <FormInput
          text="Email"
          iconName="mail"
          msgError={emailError}
          onInputChange={value => handleEmailChange(value)}
        />
        <FormInput
          text="Contraseña"
          secureTextEntry={rePasswordVisible}
          iconName={rePasswordVisible ? 'eye-off' : 'eye'}
          viewPass={() => setRePasswordVisible(!rePasswordVisible)}
          msgError={passwordError}
          onInputChange={handlePasswordChange}
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
