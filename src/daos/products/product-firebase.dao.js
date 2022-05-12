import FirebaseContainer from "../../continers/firebase-container.js";


class ProductFirebaseDao extends FirebaseContainer{
    async saveProduct(product) {
        await this.save({
            timestamp: product.timestamp,
            name: product.name,
            description: product.description,
            code:  product.code,
            price: product.price,
            stock:  product.stock,
            thumbnails: product.thumbnails
        }, 'products');
    }

    async getAllProducts() {
        return this.getAll('products');
    }

    async getProductByID(id) {
        return this.getById(id, 'products');
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
        }, 'products', id);

    }

    async deleteProductById(id) {
        return this.deleteById(id, 'products');
    }
}

export default ProductFirebaseDao;