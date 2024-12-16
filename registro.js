// Función para registrar los pagos
document.getElementById("formulario-pago").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    let recibo = document.getElementById("recibo").value;
    let grado = document.getElementById("grado").value;
    let pensio = parseFloat(document.getElementById("pensio").value);
    let nombreEstudiante = document.getElementById("nombre-estudiante").value;
    let fechaPago = document.getElementById("fecha-pago").value;
    let comentarios = document.getElementById("comentarios").value;

    // Verificar si el número de recibo ya existe en el historial
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    let reciboExistente = historial.some(pago => pago.recibo === recibo);

    if (reciboExistente) {
        // Si el recibo ya existe, mostrar mensaje de error
        alert("Error: El número de recibo ya ha sido registrado. Por favor, ingrese un número de recibo único.");
        return;
    }

    // Crear objeto de pago
    let pago = {
        recibo: recibo,
        grado: grado,
        pensio: pensio,
        nombreEstudiante: nombreEstudiante,
        fechaPago: fechaPago,
        comentarios: comentarios
    };

    // Agregar nuevo pago al historial
    historial.push(pago);

    // Guardar el historial actualizado en el localStorage
    localStorage.setItem("historial", JSON.stringify(historial));

    // Limpiar formulario después de registrar
    document.getElementById("formulario-pago").reset();

    // Confirmación de registro
    alert("Pago registrado exitosamente.");
});

// Función para ver historial
function verHistorial() {
    window.location.href = "historial.html";
}
