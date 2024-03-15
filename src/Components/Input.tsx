import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import  Icon  from 'react-native-vector-icons/AntDesign';
interface FormInput {
    text:string;
    iconName:string;
    onInputChange:(value:string) => void;
}
export default function FormInput({text,iconName,onInputChange}:FormInput) {
  return (
    <View style={styles.inputView}>
        <TextInput style={styles.inputs} placeholder={text} onChangeText={onInputChange}></TextInput>
        <Icon name={iconName} size={30} color={"rgba(74, 82, 255, 1)"} style={styles.icon} onPress={() => {}}></Icon>
    </View>
    
  )
}
const styles = StyleSheet.create({
    inputs:{
   
        width:"70%",
        backgroundColor:"white",
        elevation:5,
        borderRadius:5
      },
      inputView:{
        
        width:"100%",
        justifyContent: "center",
        alignItems: "center",
        
    
      },icon:{
        bottom:39,
        alignSelf:"flex-end",
        right:80
      }
      
})
