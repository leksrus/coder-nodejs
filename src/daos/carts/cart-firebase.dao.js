import {initializeApp} from "firebase/app";
import {collection, getFirestore, doc, getDoc, getDocs, addDoc, setDoc, deleteDoc } from "firebase/firestore/lite";


class CartFirebaseDao {

    init() {
        const firebaseConfig = {
            apiKey: "AIzaSyBFLmN0nu3_lRIiZdyTXItCF5SpZm_IFbE",
            authDomain: "tech-market-bad6f.firebaseapp.com",
            projectId: "tech-market-bad6f",
            storageBucket: "tech-market-bad6f.appspot.com",
            messagingSenderId: "298042791231",
            appId: "1:298042791231:web:6489e41392983a8f79af8a",
            measurementId: "G-V186TXRKVV"
        };

        this.firebaseApp = initializeApp(firebaseConfig);
    }

    async saveProduct(product) {
        const db = getFirestore(this.firebaseApp);
        const collectionData = collection(db, product);

        return addDoc(collectionData, 'carts');
    }

    async getAllProducts() {
        const db = getFirestore(this.firebaseApp);
        const collectionData = collection(db, 'carts');
        const dataSnapshot = await getDocs(collectionData);

        return dataSnapshot.docs.map(x => ({id: x.id, ...x.data() }));
    }

    async getProductByID(id) {
        const db = getFirestore(this.firebaseApp);
        const docData = doc(db, 'carts', id);
        const dataSnapshot = await getDoc(docData);

        return Object.assign({id: dataSnapshot.id}, dataSnapshot.data());
    }

    async updateProductById(id, product) {
        const db = getFirestore(this.firebaseApp);
        const docData = doc(db, 'carts', id);

       return  setDoc(docData, product);
    }

    async deleteProductById(id) {
        const db = getFirestore(this.firebaseApp);
        const docData = doc(db, 'carts', id);
        return deleteDoc(docData);
    }
}

export  default CartFirebaseDao;