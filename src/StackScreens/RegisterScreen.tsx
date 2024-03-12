import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenButton from '../Components/ScreenButton';
import PasswordInput from '../Components/PasswordInput';
import { useNavigation } from '@react-navigation/native';



type Props = {
  imagenUser: string;
  name: string;
  email: string;
  password: string;
};

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [visualizePass, setVisualizePass] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.userImage}
          source={{
            uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
          }}
        />
      </View>
      <View style={styles.inputsContainer}>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Nombre Completo"
            placeholderTextColor="#999"
            style={styles.input}
          />
          <Icon name="person-outline" style={styles.icon} />
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            style={styles.input}
          />
          <Icon name="mail-outline" style={styles.icon} />
        </View>
         <PasswordInput onChangeText={() => {}} />
        </View>

        <View>
        <ScreenButton  fn={() => navigation.navigate('Home')} text='Register' />
        </View>

      <View style={styles.loginView}>
        <Text>Alreay have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.login}>Log In</Text>
        </TouchableOpacity>
        <Text>now</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7D6FD1',
    paddingTop: 100,
    paddingHorizontal: 30,
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    gap: 40,
  },
  header: {
    display: 'flex',
    gap: 20,
    alignItems: 'center',
  },
  userImage: {
    borderRadius: 100,
    height: 100,
    width: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: 'white',
  },
  inputsContainer: {
    display: 'flex',
    gap: 20,
  },
  inputView: {
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    color: 'black',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  input: {
    color: 'black',
    fontWeight: '600',
    flex: 1,
  },
  icon: {
    fontSize: 28,
    color: 'blue',


  },
  loginView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    color: 'blue',
    fontWeight: '900',
    fontSize: 16,
  },
});
