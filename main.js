const fs = require("fs");

class Container {
  constructor(fileName) {
    this.fileName = fileName;
  }

  save(object) {
    let arrayData = [];
    exists(this.fileName).then((isExist) => {
      if (isExist) {
        readFile(this.fileName).then((fileData) => {
          arrayData = JSON.parse(fileData);
          const ids = arrayData.map((object) => object.id);
          const max = Math.max(...ids);
          object.id = max + 1;
          arrayData.push(object);
          const data = JSON.stringify(arrayData);
          writeFile(this.fileName, data);
        });
      } else {
        object.id = 1;
        arrayData.push(object);
        const data = JSON.stringify(arrayData);
        writeFile(this.fileName, data);
      }
    });
  }

  getById(id) {
    exists(this.fileName).then((isExist) => {
      if (isExist) {
        readFile(this.fileName).then((fileData) => {
          const arrayData = JSON.parse(fileData);
          const product = arrayData.find((x) => parseInt(x.id) === parseInt(id));
          console.log(product);
          if (product) return product;

          return null;
        });
      }

      return null;
    });
  }

  async getAll() {
    const isExists = await exists(this.fileName);

    if (isExists) {
      const data = await readFile(this.fileName);

      return JSON.parse(data);
    }

    return null;
  }

  deletById(id) {
    exists(this.fileName).then((isExist) => {
      if (isExist) {
        readFile(this.fileName).then((fileData) => {
          const arrayData = JSON.parse(fileData);
          const filteredArray = arrayData.filter((x) => x.id !== id);
          const data = JSON.stringify(filteredArray);
          writeFile(this.fileName, data);
        });
      }
    });
  }

  deleteAll() {
    exists(this.fileName).then((isExist) => {
      if (isExist) {
        deleteFile(this.fileName);
      }
    });
  }
}

async function readFile(fileName) {
  try {
    return await fs.promises.readFile(fileName, "utf8");
  } catch (err) {
    console.error(err);
  }
}

async function writeFile(fileName, content) {
  try {
    await fs.promises.writeFile(fileName, content);
  } catch (err) {
    console.error(err);
  }
}

async function exists(fileName) {
  try {
    await fs.promises.access(fileName, fs.constants.F_OK);

    return true;
  } catch (err) {
    console.error(err);

    return false;
  }
}

async function deleteFile(fileName) {
  try {
    await fs.promises.unlink(fileName);
  } catch (error) {
    console.error(err);
  }
}

const container = new Container("products.txt");

const product = { title: "soap", proce: 10.33, thumbnails: "/##/##" };

// container.save(product);

// console.log(container.getById(1));

// console.log(container.getById(2));

container.getAll().then((data) => console.log(data));

// console.log(container.deletById(1));

// container.deleteAll();
