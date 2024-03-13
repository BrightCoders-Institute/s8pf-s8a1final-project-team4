/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/StackNavigation/stackNavigation';
import LogIn from './src/Screens/LogIn';
import LogInFingerprint from './src/Screens/LogInFingerprint';


function App() {
  return (
      <NavigationContainer>
        <LogInFingerprint />
      </NavigationContainer>
  );
}

export default App;
