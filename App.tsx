/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/StackNavigation/stackNavigation';


function App() {
  return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
  );
}

export default App;
