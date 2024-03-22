import { Firestore, collection, where, addDoc, query, getDocs, getDoc, Timestamp, doc, DocumentReference, DocumentData } from "firebase/firestore"
import { db } from "./firebaseconfig"


async function getDocRef() { //this function return the document Reference for the current user 
    try {

        let refId = ''
        const q = query(collection(db, 'users'), where("uid", "==", 'av8HMqyBekaael8CIuuQAekQnCd2')) //change to user UID from async storage or global context
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            refId = doc.id
        })
        const docRef:DocumentReference = doc(db, "users", refId);
        return docRef
    } catch (err) {
        console.log("1", err)
    }
}

export async function AddContactDoc(name: string, number: number) { 
    try {
        const ref = await getDocRef()
        const collectionRef = collection(ref, 'contacts');
        const newDocRef = await addDoc(collectionRef, {
            name: name,
            numero: number
        });
        console.log('Nuevo documento agregado con ID:', newDocRef.id);
    } catch (err) {
        console.log("2", err)
    }
}
export async function getContact() {
     try {
        let contacts:Array<object> = []
        const ref = await getDocRef()
        const collectionRef = collection(ref, 'contacts');
        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach((doc) => {
            contacts.push(doc.data())
        });
        return contacts
    } catch (err) {
        console.log("error en getContanc", err)
    }
}
export async function transfer(){ //
    try{
        const ref = await getDocRef()

    }catch(err){
        console.log(err)
    }
}
