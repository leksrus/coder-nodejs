import passport from 'passport';
import passportLocal from "passport-local";
import UserService from "../services/user-service.js";
import User from "../models/user.js";


const userService = new UserService();

export const createUser = ( async (req, res) => {

    const user = Object.assign(req.body.email, req.body.firstname, req.body.lastname, req.body.address, req.body.age, req.body.phone);
    await userService.createUser(user, req.file);

    return res.status(200).json({user: user, message: 'User created'});
});

export const getUser = ( async (req, res) => {
    const user = await userService.getUserByEmailAndPassword(req.body.email, req.body.password);

    if(user) {
        const responseUser = new User(user.email, undefined, user.firstname, user.lastname, user.address, user.age, user.phone, user.photo);

        return res.status(200).json({user: responseUser, message: 'User found'});
    }

    return res.status(404).json({user: undefined, message: 'User not found'});

});

export const loginPage = ( (req, res) => {
    return  res.render("view", {
        isLoggedIn: req.user ? true : false,
        user: req.user
    });

});

export const login = ( (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(user) {
            return req.login(user, (err) => {
                return res.redirect('/api/users/login');
            });
        }
        return res.render('error',{
            message: 'Wrong username or password'
        } )

    })(req, res, next);
});

export const registerPage = ( (req, res, next) => {
    res.render("register");
});

export const register = ( async (req, res, next) => {

    const user = await userService.getUserByEmailAndPassword(req.body.email, req.body.password);

    if(user) return  res.redirect('/api/users/login');


    return res.status(404).json({user: undefined, message: 'User not found'});

});

export const logout = ( (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect('/api/users/login');
    });
});


const LocalStrategy = passportLocal.Strategy;

const verifyCallBack = async (username, password, done) => {
    const user = await userService.getUserByEmailAndPassword(username, password);
    if(user) return done(null, user);

    return done(null, false)
}


passport.use(new LocalStrategy({ usernameField: "username", passwordField: 'password' },
    verifyCallBack
));

passport.serializeUser((user, done) =>{
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});



export default { createUser, getUser, loginPage, login, registerPage, register};