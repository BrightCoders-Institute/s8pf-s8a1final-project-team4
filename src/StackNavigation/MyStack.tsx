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
import VirtualSelectContact from '../Screens/VirtualSelectContact';
import Transferir from '../Screens/Transferir';
import VirtualTransferir from '../Screens/VirtualTransferir';
import TransferDetalles from '../Screens/TransferDetalles';
import AddContact from '../Screens/AddContact';
import VirtualAddContact from '../Screens/VirtualAddContact';
import Config from '../Screens/Config';
import Retirar from '../Screens/Retirar';
import RetiroDetalles from '../Screens/RetiroDetalles';
import History from '../Screens/History';
import SecurityScreen from '../Screens/SecurityScreen';
import Mapsview from '../Components/MapView';
import DatosPersonales from '../Screens/DatosPersonales';
import PasswordRe from '../Screens/PasswordRe';
import VirtualCreditRetiro from '../Screens/VirtualCreditRetiro';

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
        name="VirtualCreditRetiro"
        component={VirtualCreditRetiro}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PasswordRe"
        component={PasswordRe}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DatosPersonales"
        component={DatosPersonales}
        options={{
          title: 'Datos Personales',
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
        name="VirtualTransferirA"
        component={VirtualSelectContact}
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VirtualAddContact"
        component={VirtualAddContact}
        options={{
          title: 'Agregar contacto',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Transferir"
        component={Transferir}
        options={{
          title: 'Transferir',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VirtualTransferir"
        component={VirtualTransferir}
        options={{
          title: 'Transferir',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TransferDetalles"
        component={TransferDetalles}
        options={{
          title: 'Transferir',
          headerShown: false,
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Mapas"
        component={Mapsview}
        options={{
          title: 'Mapas',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Security"
        component={SecurityScreen}
        options={{
          headerShown: false,
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
