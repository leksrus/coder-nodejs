import {collection, getFirestore, doc, getDoc, getDocs, addDoc, setDoc, deleteDoc } from "firebase/firestore/lite";
import {firebaseApp} from "../config/configurations.js";


class FirebaseContainer {
    async save(object, collectionName) {
        try {
            const db = getFirestore(firebaseApp);
            const collectionData = collection(db, collectionName);

            await addDoc(collectionData, object);
        } catch (error) {
            console.log(error);
            throw  error;
        }
    }


    async update(object, collectionName, filter) {
        try {
            const db = getFirestore(firebaseApp);
            const docData = doc(db, collectionName, filter);

            await setDoc(docData, object);
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id, collectionName) {
        try {
            const db = getFirestore(firebaseApp);
            const docData = doc(db, collectionName, id);
            const dataSnapshot = await getDoc(docData);

            return Object.assign({id: dataSnapshot.id}, dataSnapshot.data());
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(collectionName) {
        try {
            const db = getFirestore(firebaseApp);
            const collectionData = collection(db, collectionName);
            const dataSnapshot = await getDocs(collectionData);

            return dataSnapshot.docs.map(x => ({id: x.id, ...x.data() }));
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id, collectionName) {
        try {
            const db = getFirestore(firebaseApp);
            const docData = doc(db, collectionName, id);
            await deleteDoc(docData);
        } catch (error) {
            console.log(error);
        }
    }
}

export default FirebaseContainer;