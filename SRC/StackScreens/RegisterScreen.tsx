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

type Props = {
  imagenUser: string;
  name: string;
  email: string;
  password: string;
};

export default function RegisterScreen() {
  const [visualizePass, setVisualizePass] = useState(false);
  return (
    <View></View>
  )
}

const styles = StyleSheet.create({
 
});
