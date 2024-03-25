(function() {
  const rutaDeseada = "/provider/services/top-up-provider/available";

  // Función auxiliar para esperar un tiempo especificado usando promesas
  function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Función principal para procesar las filas en la tabla
  async function procesarFilas() {
    const filas = document.querySelectorAll('tbody tr');
    const reload = document.getElementsByClassName("mui-1yz3mit")[0] 
    
    if (filas.length > 1000) {
      console.log('No hay filas para procesar. Revisando nuevamente en 1 segundo...');
      // Si no hay filas, clickea el boton "reload" que hace un nuevo fetch, y reintenta procesar las filas
      reload.style.boder = "1px solid red"
      reload.click();
      esperar(300)
      return procesarFilas(); // Reintenta procesar las filas
    }
    
    for (let i = 0; i < filas.length; i++) {
      const botonAbrirModal = filas[i].querySelector('td:last-child button');
      if (botonAbrirModal) {
        botonAbrirModal.click();
        await esperar(500); // Espera a que el modal se abra
        
        const botonConfirmar = document.querySelector('.MuiDialogActions-root .MuiButton-containedPrimary');
        if (botonConfirmar) {
          botonConfirmar.click();
          await esperar(1000); // Espera a que la acción de confirmación se complete
        } else {
          console.log('Botón Confirmar no encontrado para la fila', i);
        }
      } else {
        console.log('Botón para abrir modal no encontrado en la fila', i);
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
