class Producto{
    constructor(id, nombre, precio, categoria, imagen = false ){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio,
        this.categoria = categoria;
        this.imagen = imagen;
    }
}

//simula la base de datos con los productos del e-commerce
class BaseDeDatos{
    constructor(){
        this.productos = []
        //cargamos los productos que apareceran siempre en la bd
        this.agregarRegistro(1, "Arroz", 230, "Alimentos", "arroz.png");
        this.agregarRegistro(2, "Galletitas", 350, "Alimentos", "galletitas.png");
        console.log(this.productos);
    }

    agregarRegistro(id, nombre, precio, categoria, imagen){
        const producto = new Producto(id, nombre, precio, categoria, imagen);
        this.productos.push(producto);
    }

    traerRegistros(){
        return this.productos
    }

    registroPorId(id){
        return this.productos.find((producto) => producto.id === id);
    }
}

const bd = new BaseDeDatos();

//elementos
const divProductos = document.querySelector("#productos");
const divCarrito = document.querySelector("#carrito");

cargarProductos();

function cargarProductos(){
    const productos = bd.traerRegistros();
    for(const producto of productos){
        divProductos.innerHTML += `
            <div class="producto">
                <h2>${producto.nombre}</h2>
                <img src="img/${producto.imagen}" width="200"/>
                <p>${producto.precio}</p>
                <p><a href="#" class="btnAgregar" data-id="${producto.id}">Agregar al carrito</a></p>
            </div> 
            `
    }
    //botones de agregar al carrito
    const botonesAgregar = document.querySelectorAll(".btnAgregar");
    for(const boton of botonesAgregar){
        boton.addEventListener("click", (event) =>{
            event.preventDefault();
            const id = Number(boton.dataset.id);
            const producto = bd.registroPorId(id)
            console.log("estas agregar el producto: " + producto.nombre)
        })
    }
}
