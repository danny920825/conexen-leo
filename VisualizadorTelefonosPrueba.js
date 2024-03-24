(function() {
  const rutaDeseada = "/provider/services/top-up-provider/available";

  // Función auxiliar para esperar un tiempo especificado usando promesas
  function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Función principal para procesar las filas en la tabla y mostrar los números de teléfono
  async function procesarFilas() {
    const filas = document.querySelectorAll('tbody tr');
    
    if (filas.length < 1) {
      console.log('No hay filas para procesar. Revisando nuevamente en 1 segundo...');
      await esperar(1000); // Espera y revisa nuevamente
      return procesarFilas(); // Reintenta procesar las filas
    }
    
    for (let i = 0; i < filas.length; i++) {
      // Busca el segundo td para cada fila, que asumimos contiene el número de teléfono
      const celdaTelefono = filas[i].querySelector('td:nth-child(2)');
      if (celdaTelefono) {
        console.log(`Número de teléfono encontrado en la fila ${i + 1}: ${celdaTelefono.textContent}`);
        // Aquí podrías hacer algo más con el número de teléfono, como mostrarlo en una interfaz gráfica o almacenarlo
      } else {
        console.log('Celda de teléfono no encontrada en la fila', i);
      }
    }

    console.log('Proceso completado para todas las filas existentes. Revisando si hay más filas en 1 segundo...');
    await esperar(1000); // Espera antes de revisar de nuevo
    procesarFilas(); // Revisa si hay nuevas filas
  }

  // Función para verificar la ruta y ejecutar la lógica de procesamiento si coincide
  async function verificarRutaYProcesar() {
    if (window.location.pathname === rutaDeseada) {
      console.log("Ruta deseada detectada. Iniciando procesamiento de filas...");
      await procesarFilas();
    } else {
      console.log("No estamos en la ruta deseada. Revisando nuevamente en 10 segundos...");
      await esperar(10000); // Espera más tiempo antes de volver a comprobar
      verificarRutaYProcesar(); // Reintenta verificar la ruta
    }
  }

  verificarRutaYProcesar(); // Inicia la verificación de la ruta al cargar el script
})();
