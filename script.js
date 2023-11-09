let eventos = [];
let arr = [];

const nombreEvento = document.querySelector("#nombreEvento");
const fechaEvento = document.querySelector("#fechaEvento");
const botnAgregar = document.querySelector("#agregar");
const listaEventos = document.querySelector("#listaEventos");
//variable que me trae la funcion cargar y los muestra los datos guardados
const json = cargar();

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    agregarEvento();
});

//Agregar eventos
function agregarEvento() {
    if (nombreEvento.value === "") {
        error = "Debe ingresar un nombre de evento"
            return alert(error);
    }
        if (fechaEvento.value === "") {
            error = "Debe seleccionar una fecha"
            return alert(error);
        }
    if (diferenciasFecha(fechaEvento.value) < 0) {
        error = "Debe agregar fechas posteriores"
        return alert(error)
    }
    const nuevoEvento = {
        id: (Math.random() * 100).toString(36).slice(3),
        nombre: nombreEvento.value,
        fecha: fechaEvento.value,
    };
    // agrega uno o más elementos al inicio del array, y devuelve la nueva longitud del array
    eventos.unshift(nuevoEvento);
    // actualiza y muestra los eventos que estan almacenados
    guardar(JSON.stringify(eventos));
    nombreEvento.value = "";
    mostrarEventos();
}
function diferenciasFecha(destino) {
    let fechaDestino = new Date(destino);
    let fechaActal = new Date();
    let diferencias = fechaDestino.getTime() - fechaActal.getTime();
    let dias = Math.ceil(diferencias / (1000 * 3600 * 24));
    return dias;
}
function mostrarEventos() {
    const eventoshtml = eventos.map((evento) => {
        return `
        <div class="evento">
         <div class="dias">
            <span class="diasFaltantes">${diferenciasFecha(evento.fecha)}</span>
            <span class="texto">dias<br>para</span>
         </div>      
         <div class ="nombreEvento">${evento.nombre}</div>
         <div class ="fechaEvento">${evento.fecha}</div>
         <div class="acciones">
          <button data-id="${evento.id}"class="eliminar">Eliminar</button>
        </div>   
        </div>        
        `;
    })
    listaEventos.innerHTML = eventoshtml.join("");
    document.querySelectorAll('.eliminar').forEach(buttom => {
        buttom.addEventListener("click", e => {
            const id = buttom.getAttribute('data-id');
            eventos = eventos.filter(evento => evento.id !== id);
            guardar(JSON.stringify(eventos));
            mostrarEventos();
        });
    });
}

function guardar(datos) {
    localStorage.setItem("lista", datos);

}
function cargar() {
    return localStorage.getItem("lista");
}
try {
    arr = JSON.parse(json);
} catch (error) {
    arr = []
}
// operador ternario
eventos = arr ? [...arr] : [];
mostrarEventos();