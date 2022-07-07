const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al carrito":
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito:
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el Carrito:
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //Resetamos el ARRAY

        limpiarHTML(); //Eliminamos todo el HTML
    });
}


// Funciones:


function agregarCurso(e) {
    e.preventDefault(); //Con este preventDefault ya no se nos va hacia arriba de la web.
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }
}


// Elimina un curso del CARRITO:

function eliminarCurso(e) {
    // console.log('desde eliminar curso...');
    if(e.target.classList.contains('borrar-curso')) {
        const cursoID = e.target.getAttribute('data-id');

        // Elimina del ARRAY de articulosCarrito por el data-id:
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoID );

        carritoHTML(); //Volvemos a ITERAR sobre el CARRITO y MOSTRAR su HTML:
    }
}


// Lee el contenido del HTML al que le dimos click y extrae la información del curso:

function leerDatosCurso(curso) {
    // console.log(curso);

    // Creamos un OBJETO con el CONTENIDO DEL CURSO ACTUAL:
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // console.log(infoCurso);

    // Revisa si un elemento ya existe en el carrito: Vamos a utilizar .SOME, esto nos permite iterar sobre un ARRAY de OBJETOS y verificar si un ELEMENTO existe en él:
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe) {
        // Actualizamos sólo la cantidad en el carrito:
        const cursos = articulosCarrito.map( curso => { 
        //.MAP va a iterar sobre todos los productos del carrito, y cuando encuentre cuál es el que ya está iterado, aumenta la cantidad - .MAP crea un ARRAY nuevo.

        if( curso.id === infoCurso.id ){
            curso.cantidad++;
            return curso; //Retorna el Objeto actualizado.
        } else {
            return curso; //Retorna los Objetos que no son los duplicados, pero que no podemos pederlos.
        }

        });
        articulosCarrito = [...cursos];
    } else {
        // Agregamos el curso al carrito:
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    // Agrega elementos al ARRAY de carrito: En este caso utilizando el Spread Operator, pero también podríamos haber utilizado .PUSH: Primero nos traemos una copia de nuestro carrito vacío, y luego se va añadiendo cada nuevo OBJETO al ARRAY:
    // articulosCarrito = [...articulosCarrito, infoCurso]; // Esto lo pasamos arriba, a nuestro ELSE: 

    console.log(articulosCarrito);

    carritoHTML();
}

// Muestra el Carrito de compras en el HTML: Esto va a generar el HTML basado en nuestro Carrito de Compras:

function carritoHTML() {

    // Limpiar el HTML:
    limpiarHTML();


    // Recorre el carrito y genera el HTML:
    articulosCarrito.forEach(curso => {
        // Destructuring - Mejorando nuestro código una vez que funciona:
        const { imagen, titulo, precio, cantidad, id } = curso;

        // console.log(curso);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100" />
            </td>
            <td>${titulo}</td>
            <td style="text-align:center;">${precio}</td>
            <td style="text-align:center;">${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody:
        contenedorCarrito.appendChild(row);
    });
}

// Elimina los cursos del tbody:
function limpiarHTML() {

    // Forma lenta de limpiar el HTML:
    // contenedorCarrito.innerHTML = ''; //Al ser un String vacío el HTML se limpia.

    // Buena práctica para mejorar el performance - Utilizamos While:

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

