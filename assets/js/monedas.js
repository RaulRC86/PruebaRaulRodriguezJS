async function getMonedas() {
    const endpoint = "https://mindicador.cl/api/";
    const res = await fetch(endpoint);
    const monedas = await res.json();
    return monedas;
}