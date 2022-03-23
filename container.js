const fs = require("fs");

class Container {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async save(object) {
    try {
      const isExist = fs.existsSync(this.fileName);
      let arrayData = [];

      if (isExist) {
        const data = await fs.promises.readFile(this.fileName, "utf8");
        arrayData = JSON.parse(data);
        const ids = arrayData.map((object) => object.id);
        const max = Math.max(...ids);
        object.id = max + 1;
        arrayData.push(object);
        const content = JSON.stringify(arrayData);
        await fs.promises.writeFile(this.fileName, content);

        return object.id;
      }

      object.id = 1;
      arrayData.push(object);
      const content = JSON.stringify(arrayData);
      await fs.promises.writeFile(this.fileName, content);

      return 1;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf8");

      if (data) {
        const arrayData = JSON.parse(data);
        const product = arrayData.find((x) => parseInt(x.id) === parseInt(id));

        if (product) return product;

        return null;
      }

      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf8");

      if (data) return JSON.parse(data);

      return [];
    } catch (error) {
      console.log(error);
    }
  }

  async deletById(id) {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf8");

      if (data) {
        const arrayData = JSON.parse(data);
        const filteredArray = arrayData.filter((x) => x.id !== id);
        const content = JSON.stringify(filteredArray);
        await fs.promises.writeFile(this.fileName, content);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.unlink(this.fileName);
    } catch (error) {
      console.log(error);
    }
  }
}


module.exports = Container;

// const container = new Container("products.txt");

// const product = { title: "soap", proce: 10.33, thumbnails: "/##/##" };

// container.save(product).then((id) => {
//   console.log(id);
//   container.save(product).then((id) => {
//     console.log(id);
//     container.getById(2).then((data) => {
//       console.log(data);
//       container.getAll().then((data) => {
//         console.log(data);
//         container.deletById(1).then(() => {
//           container.getAll().then((data) => {
//             console.log(data);
//             container.deleteAll();
//           });
//         });
//       });
//     });
//   });
// });
