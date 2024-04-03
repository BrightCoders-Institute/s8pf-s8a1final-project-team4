/* eslint-disable prettier/prettier */
import React, {createContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/StackNavigation/MyStack';

const UserContext = createContext({
  userInfo: {
    email: '',
    name: '',
    photo: '',
    password: '',
    tarjetaDebito: {monto: '', number: '', movimientos: []},
    tarjetaCredito: {monto: '', number: '', movimientos: []},
    contactos: [],
  },
  handleUserActive: () => {},
});

function App() {
  const [userInfo, setUserInfo] = useState({});

  function handleUserActive(user) {
    setUserInfo(user);
  }

  return (
    <UserContext.Provider value={{userInfo, handleUserActive}}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
export {UserContext};
