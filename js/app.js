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
        const carritoStorage = JSON.parse(localStorage.getItem("carrito"))
        if(localStorage.getItem("carrito")){
            this.carrito = carritoStorage;
        }else{
            this.carrito = [];
        }
        this.total = 0;
        this.totalProductos = 0;
        this.listar()
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
        localStorage.setItem("carrito", JSON.stringify(this.carrito))
        this.listar()
    }

    quitar(id){
        const indice = this.carrito.findIndex((producto) => producto.id === id);
        if(this.carrito[indice].cantidad > 1){
            this.carrito[indice].cantidad--;
        }else{
            this.carrito.splice(indice, 1);
        }
        localStorage.setItem("carrito", JSON.stringify(this.carrito))
        this.listar();
    }



    //como parametro el producto.id de la funcion de cargarProducto--> si el id q en el carrito coincide con el id del producto
    //me muestra como resultado el producto (con el uso del find)
    //recorre todo el array del carrito con el carrito.find y compara el id.
    estaEnCarrito({id}){ //desestructuro el objeto y busco solamente el id.
        return this.carrito.find((producto) => producto.id === id);
    }

    listar(){
        this.total = 0;
        this.totalProductos = 0;
        divCarrito.innerHTML = "";
        for(const producto of this.carrito){
            divCarrito.innerHTML += `
                <div class="producto">
                    <h2>${producto.nombre}</h2>
                    <img src="img/${producto.imagen}" width="50"/>
                    <p>$ ${producto.precio}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <p><a href="#" class="btnQuitar" data-id="${producto.id}">Eliminar</a></p>
                </div> 
            `;
            this.total += producto.cantidad * producto.precio;
            this.totalProductos += producto.cantidad;
        }
        
        //creo evento para el boton de "eliminar del carrito"
        const botonesQuitar = document.querySelectorAll(".btnQuitar")
        for(const boton of botonesQuitar) {
            boton.onclick = (event) =>{
                event.preventDefault();
                this.quitar(Number(boton.dataset.id));
            }
        }
        spanCantidadProductos.innerHTML = this.totalProductos;
        spanTotalCarrito.innerHTML = this.total;
    }
    
}

//simula la base de datos con los productos del e-commerce
class BaseDeDatos{
    constructor(){
        this.productos = [];
        //cargamos los productos que apareceran siempre en la bd
        this.agregarRegistro(1, "Arroz Doble Carolina", 430, "Alimentos", "arroz.png");
        this.agregarRegistro(2, "Galletitas chips", 350, "Alimentos", "galletitas.png");
        this.agregarRegistro(3, "Alfajor Marplatense", 300, "Alimentos", "alfajor.png");
        this.agregarRegistro(4, "Harina 0000", 450, "Alimentos", "harina.png");
        this.agregarRegistro(5, "Tallarines 1kg", 850, "Alimentos", "tallarines.png");
        this.agregarRegistro(6, "Dentifrico", 550, "Perfumeria", "pasta-dientes.png");
        this.agregarRegistro(7, "Jabon", 310, "Perfumeria", "jabon.png");
        this.agregarRegistro(8, "Vaso templado", 1250, "Bazar", "vaso-templado.png");
        this.agregarRegistro(8, "Taza y plato", 1900, "Bazar", "taza-cafe.png");
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

    registroPorNombre(palabra){
        return this.productos.filter((producto) => producto.nombre.toLowerCase().includes(palabra));
    }
}

const bd = new BaseDeDatos();

//elementos
const divProductos = document.querySelector("#productos");
const divCarrito = document.querySelector("#carrito");
const spanCantidadProductos = document.querySelector("#cantidadProductos");
const spanTotalCarrito = document.querySelector("#totalCarrito");
const formBuscar = document.querySelector("#formBuscar");
const inputBuscar = document.querySelector("#buscarProducto");


cargarProductos(bd.traerRegistros());

function cargarProductos(productos){
    divProductos.innerHTML = "";
    for(const producto of productos){
        divProductos.innerHTML += `
        <div class="producto">
            <h2>${producto.nombre}</h2>
            <img src="img/${producto.imagen}" width="200"/>
            <p class="producto--precio">$ ${producto.precio}</p>
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
            //invoco la funcion del carrito "agregar" con los datos del producto seleccionado.
            carrito.agregar(producto);
        })
    }
}

//evento buscador

formBuscar.addEventListener("submit",(event)=>{
    event.preventDefault();
    const palabra = inputBuscar.value;
    cargarProductos(bd.registroPorNombre(palabra.toLowerCase()));
})

inputBuscar.addEventListener("keyup",(event)=>{
    event.preventDefault();
    const palabra = inputBuscar.value;
    cargarProductos(bd.registroPorNombre(palabra.toLowerCase()));
})

//objeto carrito
const carrito = new Carrito();
