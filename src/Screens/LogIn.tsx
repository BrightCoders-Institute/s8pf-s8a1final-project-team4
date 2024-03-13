import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/AntDesign'
import FormButton from '../Components/Button'
import FormInput from '../Components/Input'
export default function LogIn() {
    
  return (
    <View style={styles.container}>
      <View style={styles.imgView}>
        <View style={styles.userImg}></View>
      </View>
      <View style={styles.inputView}>
        <FormInput text='No de cuenta' iconName='creditcard'></FormInput>
        <FormInput text='Contraseña' iconName='eyeo'></FormInput>
      </View>
      <View style={styles.buttonView}>
        <FormButton text={"Log in"} fn={() => { }}></FormButton>
        <FormButton text={"Log in with google"} fn={() => { }}></FormButton>
      </View>
      <View style={styles.linksView}>
        <Text style={styles.links}>If you don't have an account, <Text onPress={() => { }} style={{ color: "blue", textDecorationLine: "underline" }}>register</Text> now</Text>
      
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flex: 2,
    display: "flex"

  },
  imgView: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 2,

  },
  userImg: {
    borderRadius: 100,
    width: 120,
    height: 120,
    backgroundColor: "white"
  },
  buttonView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 2,

  },

  linksView: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",


  },
  links: {
    fontSize: 15
  },
  inputView:{
    flex:3,
 
    justifyContent: "center",
    alignItems: "center",
   

  },
  inputs:{
   
    width:"70%",
    backgroundColor:"white",
    elevation:5,
    borderRadius:5
  }
  

})
