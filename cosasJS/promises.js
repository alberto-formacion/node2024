// devuelve una promesa que se resuelve después de un segundo con un número aleatorio, pero solo si ese número es par. De lo contrario, se rechaza con un mensaje de error.
function obtenerNumeroAleatorio() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const numero = Math.floor(Math.random() * 10);
        if (numero % 2 === 0) {
          resolve(numero);
        } else {
          reject("El número no es par");
        }
      }, 1000);
    });
  }
  
  // Primera promesa
  obtenerNumeroAleatorio()
    //Usamos el método .then() para encadenar las promesas. Cada vez que una promesa se resuelve, el código dentro de su bloque .then() se ejecuta.
    .then(numero => {
        console.log("Número obtenido:", numero);
        // Encadenamiento: devolver una nueva promesa
        // Siempre que devolvemos un valor dentro de un .then(), automáticamente se envuelve en una nueva promesa, lo que nos permite encadenar más operaciones asincrónicas.
        return numero * 2;
    })
    .then(resultado => {
        console.log("Resultado del doble:", resultado);
        // Encadenamiento: devolver otra promesa
        return obtenerNumeroAleatorio();
    })
    .then(nuevoNumero => {
        console.log("Nuevo número obtenido:", nuevoNumero);
    })
    .catch(error => {
        //Utilizamos .catch() para manejar cualquier error que pueda ocurrir en cualquier punto de la cadena de promesas.
        console.error("Error:", error);
    });