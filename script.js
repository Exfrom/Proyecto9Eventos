// Arreglo para almacenar los eventos
let eventos = [];
// Otro arreglo temporal
let arr = [];

// Selección de elementos del DOM
const nombreEvento = document.querySelector("#nombreEvento");
const fechaEvento = document.querySelector("#fechaEvento");
const botnAgregar = document.querySelector("#agregar");
const listaEventos = document.querySelector("#listaEventos");

// Variable que almacena el resultado de la función cargar y los datos guardados
const json = cargar();

// Agregar un evento al formulario
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    agregarEvento();
});

// Función para agregar eventos
function agregarEvento() {
    // Validación: nombre del evento no puede estar vacío
    if (nombreEvento.value === "") {
        error = "Debe ingresar un nombre de evento";
        return alert(error);
    }
    // Validación: fecha del evento no puede estar vacía
    if (fechaEvento.value === "") {
        error = "Debe seleccionar una fecha";
        return alert(error);
    }
    // Validación: la fecha del evento debe ser posterior a la fecha actual
    if (diferenciasFecha(fechaEvento.value) < 0) {
        error = "Debe agregar fechas posteriores";
        return alert(error);
    }
    // Crear un nuevo objeto evento
    const nuevoEvento = {
        id: (Math.random() * 100).toString(36).slice(3),
        nombre: nombreEvento.value,
        fecha: fechaEvento.value,
    };
    // Agregar el nuevo evento al inicio del array
    eventos.unshift(nuevoEvento);
    // Actualizar y mostrar los eventos almacenados
    guardar(JSON.stringify(eventos));
    // Limpiar el campo de nombre del evento
    nombreEvento.value = "";
    // Mostrar la lista actualizada de eventos
    mostrarEventos();
}

// Función para calcular la diferencia en días entre dos fechas
function diferenciasFecha(destino) {
    let fechaDestino = new Date(destino);
    let fechaActual = new Date();
    let diferencias = fechaDestino.getTime() - fechaActual.getTime();
    let dias = Math.ceil(diferencias / (1000 * 3600 * 24));
    return dias;
}

// Función para mostrar la lista de eventos en el DOM
function mostrarEventos() {
    // Crear un array de HTML con los eventos
    const eventosHTML = eventos.map((evento) => {
        return `
        <div class="evento">
         <div class="dias">
            <span class="diasFaltantes">${diferenciasFecha(evento.fecha)}</span>
            <span class="texto">dias<br>para</span>
         </div>      
         <div class ="nombreEvento">${evento.nombre}</div>
         <div class ="fechaEvento">${evento.fecha}</div>
         <div class="acciones">
          <button data-id="${evento.id}" class="eliminar">Eliminar</button>
        </div>   
        </div>        
        `;
    });
    // Mostrar los eventos en el elemento con id listaEventos
    listaEventos.innerHTML = eventosHTML.join("");
    // Agregar event listeners a los botones de eliminar
    document.querySelectorAll('.eliminar').forEach(button => {
        button.addEventListener("click", e => {
            const id = button.getAttribute('data-id');
            // Filtrar y eliminar el evento con el ID correspondiente
            eventos = eventos.filter(evento => evento.id !== id);
            // Actualizar la lista de eventos almacenados
            guardar(JSON.stringify(eventos));
            // Mostrar la lista actualizada de eventos
            mostrarEventos();
        });
    });
}

// Función para guardar datos en el localStorage
function guardar(datos) {
    localStorage.setItem("lista", datos);
}

// Función para cargar datos desde el localStorage
function cargar() {
    return localStorage.getItem("lista");
}

// Intentar parsear los datos almacenados en el localStorage
try {
    arr = JSON.parse(json);
} catch (error) {
    arr = [];
}

// Asignar eventos (o un array vacío) usando un operador ternario
eventos = arr ? [...arr] : [];
// Mostrar la lista de eventos al cargar la página
mostrarEventos();
