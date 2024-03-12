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
   
  )
}

const styles = StyleSheet.create({
  
});
