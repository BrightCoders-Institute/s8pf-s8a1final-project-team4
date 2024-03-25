/* eslint-disable prettier/prettier */
import React, {createContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/StackNavigation/MyStack';
import {db} from './src/Firebase/firebaseconfig';
import {doc, setDoc, collection, addDoc, getDoc} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext({
  handleUserActive: () => {},
});

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [userActive, setUserActive] = useState(false);

  function handleUserActive() {
    setUserActive(!userActive);
  }

  useEffect(() => {
    console.log('useEffect running');
    console.log(userActive);
    (async () => {
      try {
        const userUid = await AsyncStorage.getItem('userUID');
        const userDocRef = doc(db, 'users', userUid);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          console.log(userData);
          setUserInfo(userData);
        } else {
          console.log('no funciona');
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userActive]);

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
