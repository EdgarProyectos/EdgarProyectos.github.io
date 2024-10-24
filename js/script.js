document.getElementById('calcularBtn').addEventListener('click', function() {
    const nombre = document.getElementById('nombre').value;
    const nit = document.getElementById('nit').value;
    const dpi = document.getElementById('dpi').value;
    const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
    const direccion = document.getElementById('direccion').value;
    const empresa = document.getElementById('empresa').value;
    const anios = parseInt(document.getElementById('anios').value);
    const meses = parseInt(document.getElementById('meses').value);
    const sueldoPromedio = parseFloat(document.getElementById('sueldo').value);
    const tipoIndemnizacion = document.getElementById('tipoIndemnizacion').value;

    const edad = calcularEdad(fechaNacimiento);
    
    let totalIndemnizacion;
    let reporteTipo;

    if (tipoIndemnizacion === "justificado") {
        const aniosTrabajados = sueldoPromedio * anios;
        const mesesTrabajados = (sueldoPromedio / 12) * meses;
        totalIndemnizacion = aniosTrabajados + mesesTrabajados;
        reporteTipo = "Justificada";
    } else {
        const preAviso = sueldoPromedio;
        const bonificacionAnual = sueldoPromedio / 12;
        const vacaciones = (sueldoPromedio / 12) * (15 / 30);
        const aniosTrabajados = sueldoPromedio * anios;
        const mesesTrabajados = (sueldoPromedio / 12) * meses;
        const totalIndemnizacionJ = aniosTrabajados + mesesTrabajados;
        totalIndemnizacion = totalIndemnizacionJ + preAviso + bonificacionAnual + vacaciones;
        reporteTipo = "Injustificada";
    }

    mostrarResultado(nombre, nit, dpi, edad, sueldoPromedio, anios, meses, totalIndemnizacion, reporteTipo);
});

function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    return edad;
}

function mostrarResultado(nombre, nit, dpi, edad, sueldo, anios, meses, total, tipo) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <h2>Hola, ${nombre.split(' ')[0]}! Tu indemnización ${tipo}</h2>
        <h3>- Datos Personales -</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>NIT:</strong> ${nit}</p>
        <p><strong>DPI:</strong> ${dpi}</p>
        <p><strong>Edad:</strong> ${edad}</p>
        <h3>- Indemnización -</h3>
        <p><strong>Sueldo Mensual:</strong> Q${sueldo}</p>
        <p><strong>Años de Trabajo:</strong> ${anios}</p>
        <p><strong>Meses de Trabajo:</strong> ${meses}</p>
        <p><strong>Total de Indemnización:</strong> Q${total.toFixed(2)}</p>
    `;
}
