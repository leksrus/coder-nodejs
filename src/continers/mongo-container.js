import mongoose from 'mongoose';

class MongoContainer {

    async save(object, model) {
        try {
            const data = new model({...object});
            await data.save();
        } catch (error) {
            console.log(error);
            throw  error;
        }
    }


    async update(object, model, filter) {
        try {
            await model.findOneAndUpdate(filter, object);
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id, model) {
        try {
            return await model.findById({_id: id}).exec();
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(model) {
        try {
            return await model.find().exec();
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id, model) {
        try {
            await model.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll(model) {
        try {
            await model.deleteAll();
        } catch (error) {
            console.log(error);
        }
    }
}


export default MongoContainer;