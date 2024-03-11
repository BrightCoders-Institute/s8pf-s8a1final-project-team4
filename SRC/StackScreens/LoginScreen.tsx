import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import ImageComp from '../Components/ImageComponent';

export default function Login({route}) {
    const navigation = useNavigation()

    const [email, setEmail] = React.useState<String>('')
    const [password, setPassword] = React.useState<String>('')

    const logIn = () => {
        console.log(email, password)
    }
    const googleLogIn = () => {

    }

    const profileImage = route.params?.profileImage;

    return (
        
    )
}

const styles = StyleSheet.create({
   

})
