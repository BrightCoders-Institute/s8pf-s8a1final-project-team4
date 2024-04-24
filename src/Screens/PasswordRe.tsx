import React from 'react';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconC from 'react-native-vector-icons/Ionicons';
import IconS from 'react-native-vector-icons/Ionicons';
import {UserContext} from '../../App';
import {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {signOut} from 'firebase/auth';
import {auth} from '../Firebase/firebaseconfig';
import FormInput from '../Components/Input';
import FormButton from '../Components/Button';
import { updatePassword } from 'firebase/auth';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider} from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PasswordRe() {
  const [name, setName] = React.useState<string>('');
  const [nameError, setNameError] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');
  const [rePasswordVisible, setRePasswordVisible] = React.useState(true);
  const {userInfo, handleUserActive} = useContext(UserContext);
  const navigation = useNavigation();

  

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

  const handlePasswordUpdate = async (newPassword: string) => {
    const user = getAuth().currentUser;
    if (user) {
      try {
        await updatePassword(user, newPassword);
        Alert.alert('Contraseña actualizada con éxito');
        navigation.goBack();
      } catch (error) {
        Alert.alert('Error al actualizar la contraseña: ', error);
      }
    } else {
      Alert.alert('No hay usuario activo');
    }
  };

  return (
    <View style={style.mainContainer}>
      <View style={style.header}>
        <Text style={style.headerTitle}>Configuración</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <IconC name="close-outline" size={45} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={style.ContentContainer}>
        {userInfo.photo ? (
          <Image
            style={style.Img}
            source={{
              uri: userInfo.photo,
            }}
          />
        ) : (
          <View style={style.headerImgTextCont}>
            <Text style={style.headerImgText}>{userInfo.name[0]}</Text>
          </View>
        )}
        <View style={style.nameView}>
          <Text style={style.TextNombre}> {userInfo.name}</Text>
          <Text style={style.TextEmail}>{userInfo.email}</Text>
        </View>
      </View>

      <View style={style.ViewsContainer}>
        <FormInput
         text="Contraseña"
         secureTextEntry={rePasswordVisible}
         iconName={rePasswordVisible ? 'eye-off' : 'eye'}
         viewPass={() => setRePasswordVisible(!rePasswordVisible)}
         msgError={passwordError}
         onInputChange={handlePasswordChange}
        />
        <FormInput
         text="Repetir Contraseña"
         secureTextEntry={rePasswordVisible}
         iconName={rePasswordVisible ? 'eye-off' : 'eye'}
         viewPass={() => setRePasswordVisible(!rePasswordVisible)}
         msgError={passwordError}
         onInputChange={handlePasswordChange}
        />
       <View style={style.buttonView}>
       <TouchableOpacity
            style={style.buttonTouchable}
            onPress={() => handlePasswordUpdate(password)}>
            <Text style={style.TextView}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: '',
  },
  header: {
    backgroundColor: '#343DFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    color: 'white',
  },
  ContentContainer: {
    paddingTop: 35,
    paddingBottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    backgroundColor: '#3B44FF',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  nameView: {
    justifyContent: 'flex-end',
    gap: 30,
    alignItems: 'center',
  },
  TextNombre: {
    fontSize: 25,
    fontWeight: '900',
    textAlignVertical: 'center',
    color: 'white',
  },
  TextEmail: {
    color: 'white',
    fontSize: 15,
  },
  ViewsContainer: {
    flex: 1,
    marginTop: 20,
  },
  buttonTouchable: {
    marginTop: 30,
    marginHorizontal: 30,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderBottomColor: 'blue',
    borderBottomWidth: 3,
    // elevation: 50,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 6,
  },
  Img: {
    height: 90,
    width: 90,
    borderRadius: 100,
  },
  headerImgTextCont: {
    height: 70,
    width: 70,
    borderRadius: 100,
    backgroundColor: '#00079A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImgText: {
    color: 'white',
    fontSize: 28,
  },
  TextView: {
    fontSize: 20,
    fontWeight: '900',
    color: 'blue',
    flex: 1,
    textAlign: 'center',
  },
  buttonView: {
    alignItems: 'center',
    gap: 30,
  },
});
