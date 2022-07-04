import knex from 'knex'
import { initializeApp } from 'firebase/app';
import mongoose from 'mongoose';

export const mySqlDatabase = knex({
    client: 'mysql2',
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'admin',
        database : 'CODERDESA'
    }
});


export const sqlLite3Database = knex({
    client: 'sqlite3',
    connection: {
        filename: "./db/chats.sqlite"
    }
});

export const mongooseCon = async () => mongoose.connect('mongodb+srv://test:NMZQbTCltcIhpUa3@cluster0.zxw9v.mongodb.net/techno-market?retryWrites=true&w=majority')
    .then(() => console.log('Mongo connected'))
    .catch(err => console.log(err));


const firebaseConfig = {
    apiKey: "AIzaSyBFLmN0nu3_lRIiZdyTXItCF5SpZm_IFbE",
    authDomain: "tech-market-bad6f.firebaseapp.com",
    projectId: "tech-market-bad6f",
    storageBucket: "tech-market-bad6f.appspot.com",
    messagingSenderId: "298042791231",
    appId: "1:298042791231:web:6489e41392983a8f79af8a",
    measurementId: "G-V186TXRKVV"
};

export const firebaseApp = initializeApp(firebaseConfig);


export default { mySqlDatabase, sqlLite3Database, firebaseApp, mongooseCon };