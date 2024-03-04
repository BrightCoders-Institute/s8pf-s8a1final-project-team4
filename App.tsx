/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './SRC/StackNavigation/stackNavigation';


function App() {
  return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
  );
}

export default App;
