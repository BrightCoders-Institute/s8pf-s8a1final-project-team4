import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';

import LogInFingerprint from '../Screens/LogInFingerprint';
import LogIn from '../Screens/LogIn';
import SignUp from '../Screens/SignUp';
import Home from '../Screens/Home';
import DebitCardDetails from '../Screens/DebitCardDetails';
import CreditCardDetails from '../Screens/CreditCardDetails';
import TarjetaDebito from '../Screens/TarjetaDebito';
import TarjetaCredito from '../Screens/TarjetaCredito';
import AddContact from '../Screens/AddContact';
import Destinatario from '../Screens/Destinatario';
import Transferir from '../Screens/Transferir';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName="LogInFingerprint">
      <Stack.Screen
        name="LogInFingerprint"
        component={LogInFingerprint}
        options={{
          headerShown: false,
        }}
      />
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
          headerTitleStyle: styles.title,
          headerStyle: styles.background,
        }}
      />
      <Stack.Screen
        name="CuentaCreditoFisica"
        component={CreditCardDetails}
        options={{
          title: 'Mi Cuenta',
          headerTitleStyle: styles.title,
          headerStyle: styles.background,
        }}
      />
      <Stack.Screen
        name="TarjetaDebito"
        component={TarjetaDebito}
        options={{
          title: 'Cuenta',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TarjetaCredito"
        component={TarjetaCredito}
        options={{
          title: 'TarjetaCredito',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TransferirA"
        component={AddContact}
        options={{
          title: 'Transferir a:',
          headerTitleStyle: styles.title,
          headerStyle: styles.background,
        }}
      />
      <Stack.Screen
        name="AddContact"
        component={Destinatario}
        options={{
          title: 'Agregar contacto',
          headerTitleStyle: styles.title,
          headerStyle: styles.background,
        }}
      />
      <Stack.Screen
        name="Transferir"
        component={Transferir}
        options={{
          title: 'Transferir',
          headerTitleStyle: styles.title,
          headerStyle: styles.background,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontWeight: '900',
    fontSize: 25,
  },
  background: {
    backgroundColor: '#4A52FF',
  },
});
