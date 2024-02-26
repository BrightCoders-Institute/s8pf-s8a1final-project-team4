import { View, Text, StyleSheet, TextInput} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

export default function InputTransferir({text,icon} : {text: string,icon: string}) {
  return (

    
    <View style={styles.Container}>
        <Text style={styles.Text}>{text}</Text>
        <TextInput style={styles.InputN} keyboardType='number-pad'/>
        <Icon style={styles.icons} name={icon} size={30} color={'black'}/>

        

    </View>
  )
}
const styles = StyleSheet.create({
    Text: {
        fontSize: 20,
        color: '#53207B',
        fontWeight: 'bold',
    },

    Container: {
         width: '90%',

    },
    InputN: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 5,
        fontWeight: 'bold',
        backgroundColor: '#D9D9D9',
        borderRadius: 30,
        padding: 5,
        borderWidth: 2,
    },
    icons: {
        color: '#000',
        fontSize: 28,
        position: 'absolute',
        bottom: 5,
        right: 15,
      },
});
    