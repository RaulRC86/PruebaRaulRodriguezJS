async function getMonedas() {
    try {
        const endpoint = "https://mindicador.cl/api/";
        const res = await fetch(endpoint);
        const data = await res.json();
        return data; // Retorna todos los datos de la API
    } catch (e) {
        const error=document.querySelector("#error")
        error.innerHTML="¡Algo salió mal!";
    }
}

async function llenarSelectConMonedas() {
    const selectMoneda = document.querySelector("#moneda");
    const monedas = await getMonedas();

    selectMoneda.innerHTML = ""; // Limpiamos el select para llenarlo con las monedas disponibles

    // Añadimos las opciones de moneda al select
    for (let moneda in monedas) {
        if (monedas[moneda].codigo && monedas[moneda].nombre) {
            const option = document.createElement("option");
            option.value = moneda; // 'moneda' sería algo como 'usd', 'eur'
            option.text = monedas[moneda].nombre; // 'nombre' sería algo como 'Dólar', 'Euro'
            selectMoneda.appendChild(option);
        }
    }
}

async function convertirMoneda() {
    const valorCLP = Number(document.querySelector("#monedasInput").value); // Valor ingresado en CLP
    const selectMoneda = document.querySelector("#moneda");
    const monedaSeleccionada = selectMoneda.value; // Obtiene el valor de la moneda seleccionada (por ejemplo 'usd', 'eur')

    const resultadoDiv = document.querySelector("#resultado");

    if (valorCLP && monedaSeleccionada) {
        // Obtenemos los datos de las monedas desde la API
        const monedas = await getMonedas();
        const valorMonedaSeleccionada = monedas[monedaSeleccionada].valor; // Obtenemos el valor de la moneda seleccionada

        if (valorMonedaSeleccionada) {
            // Realizamos la conversión
            const resultado = valorCLP / valorMonedaSeleccionada;
            resultadoDiv.innerHTML = `Resultado: $${resultado.toFixed(2)} ${monedas[monedaSeleccionada].codigo.toUpperCase()}`; // Muestra el resultado con dos decimales
        } else {
            resultadoDiv.innerHTML = "No se pudo obtener la tasa de la moneda seleccionada.";
        }
    } else {
        resultadoDiv.innerHTML = "Por favor ingresa un valor en CLP y selecciona una moneda.";
    }
}

llenarSelectConMonedas(); // Llenar el select con las opciones de moneda

