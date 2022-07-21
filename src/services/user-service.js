import UsersMongoDao from "../daos/users/users-mongo.dao.js";
import bcrypt from "bcrypt";
import {sendEmail, uploadImage} from "../helpers/helper.js";
import User from "../models/user.js";


class UserService {
    constructor() {
        this.usersMongoDao = new UsersMongoDao();
    }

    async createUser(user, file) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(user.password, salt);
        const imageUrl = await uploadImage(file);
        const newUser = new User(user.email, password, user.firstname, user.lastname, user.address, user.age, user.phone, imageUrl);

        await this.usersMongoDao.saveUser(newUser);

        const data = {
            subject: 'New user register',
            message: `<b>New account created -> email: ${newUser.email}, firstname: ${newUser.firstname}, lastname: ${newUser.lastname}, address: ${newUser.address}, age: ${newUser.age}, phone: ${newUser.phone}</b>`
        }
        await sendEmail(data);
    }

    async getUserByEmailAndPassword(email, password) {
        return this.usersMongoDao.getUserByEmailAndPassword(email, password);
    }
}


export  default UserService;