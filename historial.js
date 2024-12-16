window.onload = function() {
    // Obtener historial del localStorage
    let historial = JSON.parse(localStorage.getItem("historial")) || [];

    // Mostrar los registros en la tabla
    let tabla = document.getElementById("tabla-historial").getElementsByTagName('tbody')[0];

    // Variables para calcular el total de pensiones y estudiantes
    let totalPensiones = 0;
    let totalEstudiantes = historial.length;

    // Recorrer cada pago y agregarlo a la tabla
    historial.forEach(function(pago, index) {
        let fila = tabla.insertRow();

        fila.insertCell(0).textContent = pago.recibo;
        fila.insertCell(1).textContent = pago.grado;
        fila.insertCell(2).textContent = `$${pago.pensio.toFixed(2)}`;
        fila.insertCell(3).textContent = pago.nombreEstudiante;
        fila.insertCell(4).textContent = pago.fechaPago;
        fila.insertCell(5).textContent = pago.comentarios;

        // Agregar botón de eliminar
        let accionesCell = fila.insertCell(6);  // Nueva celda para los botones
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = function() { eliminarPago(index); };
        accionesCell.appendChild(botonEliminar);

        // Sumar el monto de la pensión
        totalPensiones += pago.pensio;
    });

    // Mostrar los totales
    document.getElementById("total-pensiones").textContent = `$${totalPensiones.toFixed(2)}`;
    document.getElementById("total-estudiantes").textContent = totalEstudiantes;
};

// Función para eliminar el pago
function eliminarPago(index) {
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    if (confirm("¿Estás seguro de que quieres eliminar este registro?")) {
        historial.splice(index, 1);  // Eliminar el pago del historial

        // Guardar el historial actualizado en localStorage
        localStorage.setItem("historial", JSON.stringify(historial));

        // Recargar la página para actualizar la tabla
        location.reload();
    }
}

// Función para volver al formulario de registro
function volver() {
    window.location.href = "index.html";
}

// Función para borrar historial
function borrarHistorial() {
    if (confirm("¿Estás seguro de que quieres borrar todos los registros?")) {
        localStorage.removeItem("historial");
        location.reload();  // Recargar la página para actualizar el historial
    }
}
