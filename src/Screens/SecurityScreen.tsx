import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function SecurityScreen() {
  return (
    <View style= {style.main}>

            <View style={style.content}>
                <Text style={style.Title}> Seguridad y Protección de Datos:</Text>
                <ScrollView>
                    <Text style={style.P}>En FurryBank, la seguridad de nuestros usuarios es nuestra máxima prioridad.
                    Nuestra aplicación está diseñada con los más altos estándares de seguridad para proteger su información personal y financiera en todo momento.</Text>

                    <Text style={style.P}>Utilizamos tecnologías avanzadas de encriptación para garantizar que sus datos estén
                    protegidos durante todas las transacciones realizadas a través de nuestra aplicación. Además, implementamos
                    medidas de seguridad adicionales, como la autenticación de dos factores, para asegurarnos de que solo usted pueda acceder a su cuenta.</Text>

                    <Text style={style.P}>Es importante que mantenga su información de inicio de sesión segura y nunca la comparta con terceros. 
                    Nunca solicitaremos su contraseña por correo electrónico o mensaje de texto.
                    Si sospecha de actividad fraudulenta o tiene alguna pregunta sobre la seguridad de su cuenta, no dude en ponerse en contacto con nuestro equipo de soporte.</Text>

                    <Text style={style.P}>No olvide que puede ponerse en contacto para recibir soporte de forma remota tanto por via telefonica como nuestro correo 
                    de sporte tecnico anexados acontinuacion. O si lo prefiere de manera presencial en nuestras sucursales a las cuales puede acceder desde el apartado de 
                    sucursales cercanas o haciando click aqui</Text>
                    
                    <Text style={style.P}>Telefono: +52 777 549 8597 </Text>

                    <Text style={style.Contacto}>Correo Electronico: </Text>
                    <Text style={style.Contacto}>FurroSoporte_BC@gmail.com </Text>

                    <Text style={style.Agradecimiento}>Gracias por confiar en FurryBank para sus necesidades bancarias. 
                    Estamos comprometidos a proporcionarle una experiencia segura y sin preocupaciones en nuestra aplicación.</Text>
                </ScrollView>
            </View>
    </View>
  )
}

const style = StyleSheet.create({
    main:{
        flex:1,
    },
    content:{
        flex:1,
        margin:15,
    },
    Title:{
        color:'black',
        fontSize:25,
        textAlign:'center',
        marginBottom:20,
    },
    P: {
        color: 'black',
        fontSize: 18,
        marginVertical: 10,
        textAlign: 'justify',
        letterSpacing: .5 
      },
      Agradecimiento: {
        color: 'black',
        fontSize: 18,
        marginVertical: 15,
        textAlign: 'justify',
        letterSpacing: .5 
      },
      Contacto: {
        color: 'black',
        fontSize: 18,
        marginVertical: 2,
        textAlign: 'justify',
        letterSpacing: .5 
      },
      
})
