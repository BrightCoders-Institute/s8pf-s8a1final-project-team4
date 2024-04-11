import {
  Firestore,
  collection,
  where,
  addDoc,
  query,
  getDocs,
  getDoc,
  Timestamp,
  doc,
  DocumentReference,
  DocumentData,
  setDoc,
  runTransaction,
} from 'firebase/firestore';
import {db, auth} from './firebaseconfig';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

async function getDocRef() {
  //this function return the document Reference for the current user
  try {
    const uid: string | any = await AsyncStorage.getItem('userUID');
    const docRef: DocumentReference | any = doc(db, 'users', uid);
    return docRef;
  } catch (err) {
    console.log('1', err);
  }
}

export async function AddContactDoc(name: string, number: number) {
  try {
    const ref = await getDocRef();
    const doc = getDoc(ref);
    const data: DocumentData = (await doc).data();
    data.contactos.push({
      nombre: name,
      numero: number,
    });
    setDoc(ref, data);
  } catch (err) {
    console.log('2', err);
  }
}

export async function getContact() {
  try {
    let contacts: Array<object> = [];
    const ref = await getDocRef();
    const doc = getDoc(ref);
    const data: DocumentData | any = (await doc).data();
    contacts = data.contactos;
    console.log('contacots', contacts);
    return contacts;
  } catch (err) {
    console.log('error en getContact', err);
  }
}

async function minusTransfer(amount: number, concepto: string) {
  try {
    const ref = await getDocRef();
    const doc = getDoc(ref);
    const data: DocumentData = (await doc).data();
    data.tarjetaDebito.saldo -= amount;
    //generar movimiento de transferencia
    data.tarjetaDebito.movimientos.push({
      fecha: getCurrentDate(),
      monto: -amount,
      descripcion: concepto,
      tipo: 'Transferencia bancaria',
    });
    setDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
}

export async function transferToCard(
  amount: number,
  destination: string,
  concept: string,
  myBalance: number,
  transferTo: string,
) {
  try {
    const q = query(
      collection(db, 'users'),
      where('tarjetaDebito.number', '==', destination.toString()),
     
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      await runTransaction(db, async transaction => {
        querySnapshot.forEach(async document => {
          const destinyRef = doc(db, 'users', document.id);
          const destinyData = document.data();

          if (myBalance < amount) {
            Alert.alert("No tienes suficiente saldo")
            return false;

          }else {
            destinyData.tarjetaDebito.saldo += parseInt(amount);
            destinyData.tarjetaDebito.movimientos.push({
              fecha: getCurrentDate(),
              monto: amount,
              descripcion: concept,
              tipo: 'Transferencia bancaria',
            });
            transaction.set(destinyRef, destinyData);
            await minusTransfer(amount, concept); //descontar del usuario activo
            Alert.alert(`Has transferido con exito a: ${transferTo}`);
          }
        });
      });
    } else {
      console.log('No se encontró ningún usuario con esta tarjeta');
    }
  } catch (err) {
    console.log(err);
  }
}

export async function userWithdraw(quantity: any, concepto: any) {
  //use
  try {
    const ref = await getDocRef();
    const doc = getDoc(ref);
    const data: DocumentData = (await doc).data();
    data.tarjetaDebito.saldo -= quantity;
    //generar movimiento del retiro
    data.tarjetaDebito.movimientos.push({
      fecha: getCurrentDate(),
      monto: -quantity,
      descripcion: concepto,
      tipo: 'Retiro de efectivo',
    });
    await setDoc(ref, data);
  } catch (err) {
    console.log('2', err);
  }
}
