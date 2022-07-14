import ProductsMongoDao from "../daos/products/products-mongo.dao.js";

class ProductService {
    constructor() {
        this.productsMongoDao = new ProductsMongoDao();
    }


    async getProductById(id){
        return this.productsMongoDao.getProductByID(id);
    }

    async getAllProducts(){
        return this.productsMongoDao.getAllProducts();
    }

    async modifyProductById(id, product) {
        return this.productsMongoDao.updateProductById(id, product);
    }

    async createProduct(product) {
        return this.productsMongoDao.saveProduct(product);
    }

    async deleteProductById(id) {
        return this.productsMongoDao.deleteProductById(id);
    }
}

export default ProductService;