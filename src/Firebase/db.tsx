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

async function getDocRef() {
  //this function return the document Reference for the current user
  try {
    let refId = '';
    const q = query(collection(db, 'users'), where('__name__','==','AN5sIdahDCZORtbNPAoTd00zOgA3')); //change to user UID from async storage or global context
    const docRef:DocumentReference | any  = doc(db,'users', 'AN5sIdahDCZORtbNPAoTd00zOgA3')
    return docRef;
  } catch (err) {
    console.log('1', err);
  }
}

export async function AddContactDoc(name: string, number: number) {
  try {
    const ref = await getDocRef();
   const doc = getDoc(ref);
   const data:DocumentData  = (await doc).data()
   data.contactos.push({
     nombre:name,
     numero:number
   })
   setDoc(ref,data)
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
    const data:DocumentData | any = (await doc).data()
    contacts = data.contactos
    console.log("contacots", contacts)
    return contacts;
  } catch (err) {
    console.log('error en getContact', err);
  }
}
export async function transfer() {
  //
  try {
    const ref = await getDocRef();
  } catch (err) {
    console.log(err);
  }
}
