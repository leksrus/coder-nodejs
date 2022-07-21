import knex from 'knex'
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

// export const mongooseCon = async () => mongoose.connect('mongodb+srv://test:NMZQbTCltcIhpUa3@cluster0.zxw9v.mongodb.net/techno-market?retryWrites=true&w=majority')
//     .then(() => console.log('Mongo connected'))
//     .catch(err => console.log(err));





export default { mySqlDatabase, sqlLite3Database, mongooseCon };