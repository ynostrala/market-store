class Producto{
    constructor(id, nombre, precio, categoria, imagen = false ){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio,
        this.categoria = categoria;
        this.imagen = imagen;
    }
}

//clase para carrito
class Carrito{
    constructor(){
        this.carrito = [];
        this.total = 0;
        this.totalProductos = 0;
    }

    agregar(producto){
        //primero analiza si el producto esta en el carrito.
        let productoEnCarrito = this.estaEnCarrito(producto);
        if(productoEnCarrito){
            //si el producto ya esta en el carrito, suma 1 de cantidad
            productoEnCarrito.cantidad++;
        }else{
            //si no está en el carrito, se agrega al mismo.
            // this.carrito.push(producto)
            this.carrito.push({...producto, cantidad: 1}) //le agrego al constructor de Producto, un nuevo parametro de cantidad.
        }
        console.log(this.carrito);
        this.listar()
    }

    quitar(){

    }
    //como parametro el producto.id de la funcion de cargarProducto--> si el id q en el carrito coincide con el id del producto
    //me muestra como resultado el producto (con el uso del find)
    //recorre todo el array del carrito con el carrito.find y compara el id.
    estaEnCarrito({id}){ //desestructuro el objeto y busco solamente el id.
        return this.carrito.find((producto) => producto.id === id)
    }

    listar(){
        divCarrito.innerHTML = "";
        for(const producto of this.carrito){
            divCarrito.innerHTML += `
                <div class="productoCarrito">
                    <h2>${producto.nombre}</h2>
                    <img src="img/${producto.imagen}" width="200"/>
                    <p>$ ${producto.precio}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <p><a href="#" class="btnQuitar" data-id="${producto.id}">Eliminar</a></p>
                </div> 
            `;
        }
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
                <p>$ ${producto.precio}</p>
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
            //invoco la funcion del carrito "agregar" con los datos del producto seleccionado.
            carrito.agregar(producto);
        })
    }
}

//objeto carrito
const carrito = new Carrito();
