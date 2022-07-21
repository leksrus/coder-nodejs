import CartMongoDao from "./cart-mongo.dao.js";
import CartFirebaseDao from "./cart-firebase.dao.js";


class CartDaoFactory {
    static getCartDao(option){
        return getDao(option);
    }
}

const getDao = (option) => {
    let dao;
    switch (option) {
        case 'Mongo':
            dao = dao || new CartMongoDao();
            break
        case 'Firestore':
            dao = dao || new CartFirebaseDao();
            break
        default:
            break;
    }
    dao.init();
    return dao;
}

export default CartDaoFactory;