import FirebaseContainer from "../../continers/firebase-container.js";


class CartFirebaseDao extends FirebaseContainer{
    async saveProduct(product) {
        await this.save({
            timestamp: product.timestamp,
            name: product.name,
            description: product.description,
            code:  product.code,
            price: product.price,
            stock:  product.stock,
            thumbnails: product.thumbnails
        }, 'carts');
    }

    async getAllProducts() {
        return this.getAll('carts');
    }

    async getProductByID(id) {
        return this.getById(id, 'carts');
    }

    async updateProductById(id, product) {
        return this.update({
            timestamp: product.timestamp,
            name: product.name,
            description: product.description,
            code:  product.code,
            price: product.price,
            stock:  product.stock,
            thumbnails: product.thumbnails
        }, 'carts', id);

    }

    async deleteProductById(id) {
        return this.deleteById(id, 'carts');
    }
}

export  default CartFirebaseDao;