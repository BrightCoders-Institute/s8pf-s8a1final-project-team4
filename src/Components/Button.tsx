import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import  Icon  from 'react-native-vector-icons/AntDesign';
interface buttonInterface {
    text:string;
    fn:() => void;
    iconName?:string;
}
export default function FormButton({text ,fn,iconName}:buttonInterface) {
    return (
        
            <TouchableOpacity onPress={fn} style={styles.buttons}>
                <Text style={styles.btnText}>{text}</Text>
                {
                    iconName != null && 
                    <Icon name={iconName} size={30} style={styles.icon}></Icon>
                }
                
            </TouchableOpacity>
        

    )
}
const styles = StyleSheet.create({
    buttons: {
        display:"flex",
        flexDirection:"row",
        backgroundColor: "rgba(74, 82, 255, 1)",
        color: "white",
        width: "55%",
        margin: 10,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        borderRadius: 5

    },
    btnText:{
        color:"white",
        fontSize:20,
        fontWeight:"bold"
      },
      icon:{
        position:"absolute",
        alignSelf:"center",
        right:10,
        color:"white"
      }
})
