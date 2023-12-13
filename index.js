const fs = require("fs").promises;
const path = require("path");

class ProductManager {
    constructor(path) {
        this.products = [];
        this.productIdCounter = 0;
        this.path = path;
        this.initialize();
    }

    async initialize() {
        try {
          await fs.access(this.path);
        } catch (error) {
          await fs.mkdir(path.dirname(this.path), { recursive: true });
        }
      }

     async addProduct(nuevoObjeto) {
    let {title, description, price, thumbnail, code, stock} = nuevoObjeto;
    
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios.");
            return;
        }

        const codeExists = this.products.some(product => product.code === code);
        if (codeExists) {
            console.log("Ya existe un producto con ese código.");
            return;
        }

        const product = {
            id: ++this.productIdCounter,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);
        console.log("Producto agregado:", product);

        await this.guardarArchivo (this.products);
    }
    
    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            console.log("Producto encontrado:", product);
        } else {
            console.error("Producto no encontrado. ID:", id);
        }
    }

async leerArchivo() {
    try {
        const respuesta = await fs.readFile (this.path, "utf-8");
        const arrayProductos = JSON.parse  (respuesta);
         return arrayProductos;
    } catch (error) {
        console.log("Error al leer un archivo", error)
    }
} 

async guardarArchivo(arrayProductos) {
    try {
        await fs.writeFile (this.path , JSON.stringify 
            (arrayProductos, null, 2));
    } catch (error) {
        console.log ("Error al guardar el archivo" , error )
    }
}
}



//Testing: 

//Se creará una instancia de la clase “ProductManager”

const manager = new ProductManager("./productos.json");

//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []


manager.getProducts();
//Se llamará al método “addProduct” con los campos:
//title: “producto prueba”
//description:”Este es un producto prueba”
//price:200,
//thumbnail:”Sin imagen”
//code:”abc123”,
//stock:25

const macarrons = {
    title: "Macarrons",
    description:"tapitas con harina de almendras y rellenos varios",
    price: 150,
    thumbnail: "sin imagen",
    code: "00004",
    stock: 150
} 

manager.addProduct (macarrons);

//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE



const alfajor1 = {
    title: "Alfajor de almendras",
    description: "Masa de cacao y almendras, relleno de DDL",
    price: 1150,
    img: "sin imagen",
    code: "00005",
    stock: 86
}


manager.addProduct(alfajor1);

const alfajor2 = {
    title: "Alfajor de coco y DDL",
    description: "Tapas de coco, rellenos de DDL",
    price: 1250,
    img: "sin imagen",
    code: "00006",
    stock: 90
}

//Repetimos el codigo: 

//manager.addProduct(alfajor2);
//Las validaciones funcionan. 

//Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado


manager.getProducts();

//Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.

async function testeamosBusquedaPorId() {
    const buscado = await manager.getProductById(2);
    console.log(buscado);
}

testeamosBusquedaPorId();



