import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';

import LogIn from '../Screens/LogIn';
import SignUp from '../Screens/SignUp';
import Home from '../Screens/Home';
import DebitCardDetails from '../Screens/DebitCardDetails';
import VirtualCardDetails from '../Screens/VirtualCardDetails';
import MisTarjetas from '../Screens/MisTarjetas';
import SelectContact from '../Screens/SelectContact';
import Transferir from '../Screens/Transferir';
import AddContact from '../Screens/AddContact';
import Config from '../Screens/Config';
import Retirar from '../Screens/Retirar';
import RetiroDetalles from '../Screens/RetiroDetalles';
import History from '../Screens/History';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName="LogIn">
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CuentaDebitoFisica"
        component={DebitCardDetails}
        options={{
          title: 'Mi Cuenta',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CuentaDebitoVirtual"
        component={VirtualCardDetails}
        options={{
          title: 'Mi Cuenta',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MisTarjetas"
        component={MisTarjetas}
        options={{
          title: 'Cuenta',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TransferirA"
        component={SelectContact}
        options={{
          title: 'Transferir a:',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddContact"
        component={AddContact}
        options={{
          title: 'Agregar contacto',
          headerTitleStyle: styles.title,
          headerStyle: styles.background,
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="Transferir"
        component={Transferir}
        options={{
          title: 'Transferir',
          headerTitleStyle: styles.title,
          headerStyle: styles.background,
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="Configuracion"
        component={Config}
        options={{
          title: 'Configuracion',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Retirar"
        component={Retirar}
        options={{
          title: 'Retiro sin tarjeta',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RetiroDetalles"
        component={RetiroDetalles}
        options={{
          title: 'Retiro sin tarjeta',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{
          title: 'Historial',
          headerTitleStyle: styles.title,
          headerStyle: styles.background,
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    // fontWeight: '100',
    fontSize: 24,
  },
  background: {
    backgroundColor: '#021B9E',
    padding: 20,
  },
});
