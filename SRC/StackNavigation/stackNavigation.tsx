import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {CardScreen} from '../StackScreens/CardScreen';
import HomeScreen from '../StackScreens/HomeScreen';
import RegisterScreen from '../StackScreens/RegisterScreen';
import Login from '../StackScreens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="LogIn" component={Login} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Card" component={CardScreen} />
    </Stack.Navigator>
  );
}
