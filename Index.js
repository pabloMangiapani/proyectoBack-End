
// >> Consigna:
// Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
// Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
// Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles
// Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

// Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.



const express = require("express");
const app = express();
const PORT = 8080;
const fs = require('fs').promises;


class Contenedor {
  constructor(fileName) {
    this.fileName = fileName
  }
  static id = [];

  async getAll() {
    try {
        const productos = await fs.readFile(
            this.fileName,
            'utf-8'
        );
        const arrayProductos = JSON.parse(productos);
        console.log("Productos: ", arrayProductos); 
    }catch(error){
        console.log(`Ha ocurrido un error' ${error.message}`);
    }
}

async getById(id) {
  try {
      const productos = await fs.readFile(
          this.fileName,
          'utf-8'
      );
      const pds = JSON.parse(productos);
      const producto = pds.find(p => p.id === id);
      producto ? console.log("Productos: ", producto) : console.log(null);
  }catch(error){
      console.log(`Ha ocurrido un error' ${error.message}`);
  }
}
}

let count = 0;

const random = (min, max) => {
  const num = max - min;
  let random = Math.random() * (num + 1);
  random = Math.floor(random);
  return min + random;
};

app.get("/", (req, res) => {
  res.send("Las rutas definidas son: /productos /productoRandom");
});

app.get("/productos", async (req, res) => {
  const productos = new Contenedor("productos.txt");
  res.send(await productos.getAll());
});

app.get("/productorandom", async (req, res) => {
  const productos = new Contenedor("productos.txt");
  const producto = await productos.getById(+random(1, 3));
  // console.log(producto);
  res.send(producto);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
