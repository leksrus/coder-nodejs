import User from "../models/user.js";
import bcrypt  from 'bcrypt';
import UsersMongoDao from "../daos/products/users-mongo.dao.js";
import {sendEmail, uploadImage} from "../helpers/helper.js";

export const createUser = ( async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const photo = req.file;
    const imageUrl = await uploadImage(photo);
    const user = new User(req.body.email, password, req.body.firstname, req.body.lastname, req.body.address, req.body.age, req.body.phone, imageUrl);
    const userDao = new UsersMongoDao();

    await userDao.saveUser(user);
    await sendEmail(user.email);

    return res.status(200).json({user: user, message: 'User created'});

});

export const getUser = ( async (req, res) => {
    const userDao = new UsersMongoDao();

    const user = await userDao.getUserByEmailAndPassword(req.body.email, req.body.password);

    if(user) {
        const responseUser = new User(user.email, undefined, user.firstname, user.lastname, user.address, user.age, user.phone, user.photo);

        return res.status(200).json({user: responseUser, message: 'User found'});
    }

    return res.status(404).json({user: undefined, message: 'User not found'});

});


export default { createUser, getUser };