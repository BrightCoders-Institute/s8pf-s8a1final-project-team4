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
} from 'firebase/firestore';
import {db} from './firebaseconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getDocRef() {
  //this function return the document Reference for the current user
  try {
    const uid: string | any = await AsyncStorage.getItem('userUID');
    const q = query(collection(db, 'users'), where('__name__', '==', uid)); //change to user UID from async storage or global context
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
    console.log('Nuevo documento agregado con ID:');
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
async function minusTransfer(amount: number) {
  try {
    const ref = await getDocRef();
    const doc = getDoc(ref);
    const data: DocumentData = (await doc).data();
    data.tarjetaDebito.saldo -= amount;
    setDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
}

export async function transferToCard(amount: number, destination: number) {
  try {
    minusTransfer(amount);
    const q = query(
      collection(db, 'users'),
      where('tarjetaDebito.number', '==', destination),
    );
    const querySnapshot: DocumentReference | any = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (document: DocumentData) => {
        console.log('Usuario encontrado:', document.id, document.data());
        const docref: DocumentReference = doc(db, 'users', document.id);
        const data: DocumentData = document.data();
        data.tarjetaDebito.saldo =
          Number(data.tarjetaDebito.saldo) + Number(amount);
        setDoc(docref, data);
      });
    } else {
      console.log('No se encontró ningún usuario con esta tarjeta');
    }
  } catch (err) {
    console.log(err);
  }
}
