import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import FormButton from '../Components/Button';
import {useNavigation} from '@react-navigation/native';
import {GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doc, setDoc, collection, addDoc, getDoc} from 'firebase/firestore';
import {auth, db} from '../Firebase/firebaseconfig';
import {useEffect} from 'react';


function getRandomCardNumber() {
  const cardNum = [];
  for (let i = 0; i < 16; i++) {
    const randomNum = Math.floor(Math.random() * 10);
    cardNum.push(randomNum);
  }
  return cardNum.join('');
}

export default function LogInFingerprint() {
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      await AsyncStorage.removeItem('userID');
    })();
  }, []);

  const handleLogInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, googleCredential);
      const uid = result.user.uid;
      await AsyncStorage.setItem('userUID', uid);
      // Crear documento en Firestore en la colección "users"
      const userDocRef = doc(db, 'users', uid);
      const docSnap = await getDoc(userDocRef);
      //// CHECK IF EXIST
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

  const handleLogInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, googleCredential);
      const uid = result.user.uid;
      await AsyncStorage.setItem('userUID', uid);
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
              navigation.navigate('Home');
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
