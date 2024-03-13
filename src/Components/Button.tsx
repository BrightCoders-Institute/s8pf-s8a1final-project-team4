import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
interface buttonInterface {
    text:string;
    fn:() => void;
    iconName?:string;
}
export default function FormButton({text ,fn,iconName}:buttonInterface) {
    return (
        
            <TouchableOpacity onPress={fn} style={styles.buttons}>
                <Text style={styles.btnText}>{text}</Text>
            </TouchableOpacity>
        

    )
}
const styles = StyleSheet.create({
    buttons: {
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
      }
})
