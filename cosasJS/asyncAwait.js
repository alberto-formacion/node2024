// es azucar sintactico para las promesas
// Función que devuelve una promesa para simular una operación asincrónica
function obtenerNumeroAleatorio() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const numero = Math.floor(Math.random() * 10);
        if (numero % 2 === 0) {
          resolve(numero);
        } else {
          reject('El número 🧮 no es par');
        }
      }, 1000);
    });
  }
  
  // Función async que maneja las operaciones de forma secuencial
  async function ejecutarOperaciones() {
    try {
      const numero = await obtenerNumeroAleatorio();
      console.log("Número obtenido:", numero);
  
      const resultado = numero * 2;
      console.log("Resultado del doble:", resultado);
  
      const nuevoNumero = await obtenerNumeroAleatorio();
      console.log("Nuevo número obtenido:", nuevoNumero);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  // Llamada a la función async para ejecutar las operaciones
  ejecutarOperaciones();