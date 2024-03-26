/* eslint-disable prettier/prettier */
import React, {createContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/StackNavigation/MyStack';
import {db} from './src/Firebase/firebaseconfig';
import {doc, getDoc} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext({
  userInfo: {
    email: '',
    name: '',
    photo: '',
    password: '',
    tarjetaDebito: {monto: '', number: '', movimientos: []},
    tarjetaCredito: {monto: '', number: '', movimientos: []},
  },
  handleUserActive: () => {},
});

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [userActive, setUserActive] = useState(false);

  function handleUserActive() {
    setUserActive(!userActive);
  }

  useEffect(() => {
    (async () => {
      try {
        const userUid = await AsyncStorage.getItem('userUID');
        const userDocRef = doc(db, 'users', userUid);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          console.log(userData);
          setUserInfo(userData);
          // const cardsCollectionRef = collection(db, `users/${userUid}/cards`);
          // const cardSnapshot = await getDocs(cardsCollectionRef);
          // const userCards = cardSnapshot.docs.map(card => card.data());
          // console.log(userCards);
        } else {
          console.log('no se puedo recuperar la informacion del usuario');
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
