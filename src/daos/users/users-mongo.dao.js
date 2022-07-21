import MongoContainer from "../../continers/mongo-container.js";
import mongoose from "mongoose";
import bcrypt  from 'bcrypt';


class UsersMongoDao extends MongoContainer{
    constructor() {
        super();
        this.model = mongoose.models.user || mongoose.model('user', this.getUserSchema());
    }

    async saveUser(user) {
        await this.save({
            email: user.email,
            password:  user.password,
            firstname: user.firstname,
            lastname: user.lastname,
            address: user.address,
            age: user.age,
            phone: user.phone,
            photo: user.photo
        }, this.model);
    }

    async getUserByEmailAndPassword(email, password) {
        const users = await this.getAll(this.model);

        return users.find(x => x.email === email && bcrypt.compareSync(password, x.password));
    }

    getUserSchema() {
        const { Schema } = mongoose;
        return new Schema({
            email: String,
            password: String,
            firstname: String,
            lastname:  String,
            address: String,
            age:  Number,
            phone: String,
            photo: String
        })
    }
}

export default UsersMongoDao;