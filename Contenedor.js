// class Usuario {
    

//     constructor ( nombre, apellido, libros, mascotas ) {
//         this.nombre = nombre;
//         this.apellido = apellido;
//         this.libros = libros;
//         this.mascotas = mascotas;
//     }

//     getFullName() {
//         return this.nombre + this.apellido;
//     }

//     getMacotas() {
//         return this.mascotas;
//     }

//     addMascota(mascota) {
//         return this.mascotas.push(mascota);
//     }

//     countMascotas() {
//         return this.mascotas.length;
//     }
  
//     addBook(libro) {

//         return this.libros.push(libro);
//     }

//     getBookNames() {

//         const rtnLibros = [];
        
//         for(var i=0 ;i<this.libros.length ;i++) {
//             rtnLibros.push(this.libros[i].nombre);
//         }
//         return rtnLibros;
//     }

// }

// const Elon = new Usuario("Elon"," Musk", [{nombre:"El señor de las moscas", autor:"William Golding"},{nombre:"Fundacion", autor:"Isaac Asimov"}], ["perro","gato"] );
// console.log( Elon.getFullName());
// console.log(Elon.addBook({nombre:"El Psicoanalista", autor:"Jhon katzenbach"}));
// console.log( Elon.addMascota("loro"));
// console.log(Elon.getMacotas())
// console.log(Elon.countMascotas());
// console.log(Elon.getBookNames());




// Consigna: Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a 
// trabajar e implemente los siguientes métodos:

// save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
// getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
// getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
// deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
// deleteAll(): void - Elimina todos los objetos presentes en el archivo.

console.clear();

const fs = require('fs').promises;


class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
    }
    static id = [];
    
    async save(producto) {
        try{
            producto.id = Contenedor.id.lenght++;
            Contenedor.id.push(producto);
            await fs.writeFile(
                this.fileName,
                JSON.stringify(Contenedor.id, null, 2)
            );
            console.log("id del producto", producto.id);
        }catch(error) {
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
    async deleteById(id) {
        try{
            const productos = await fs.readFile(
                this.fileName,
                'utf-8'
            );
            const arrayProductos = JSON.parse(productos);
            const producto = arrayProductos.find(p =>p.id === id);
            const newArray = arrayProductos.filter(p => p.id != producto.id);
            Contenedor.id = newArray;
            await fs.writeFile(this.fileName, JSON.stringify(newArray, null, 2));
            console.log(`Producto  ${producto.title} eliminado`);
        }catch(error){
            console.log(`Ha ocurrido un error' ${error.message}`);
        }
    }
    async deleteAll() {
        try{
            Contenedor.id = [];
            await fs.writeFile(
                this.fileName,
                JSON.stringify(Contenedor, id, null, 2)
            );
        }catch(error){
            console.log(`Ha ocurrido un error' ${error.message}`);
        }
    }
}

const productos = new Contenedor('productos.txt');


productos.save({
    title: "galletira oreo",
    price: 120,
    thumbnail: "url de la foto del producto"
});

productos.save({
    title: "galletira mana",
    price: 100,
    thumbnail: "url de la foto del producto"
});

productos.save({
    title: "galletira oreo",
    price: 130,
    thumbnail: "url de la foto del producto"
});

// productos.getById(1);
// productos.getAll();
// productos.deleteById(2);
// productos.deleteAll();