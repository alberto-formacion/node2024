//esto funciona porque los ecmascript modules tienen por defecto la funcion de utilizar await en el cuerpo del archivo (top-level await)
//https://blog.stackademic.com/top-level-await-in-node-js-es-modules-vs-commonjs-c72313ca6685
import { readFile } from 'node:fs/promises';

console.log('Leyendo el primer archivo...');
const text = await readFile('./archivo.txt', 'utf-8');
console.log('primer texto:', text);
console.log('--> Hacer cosas mientras lee el archivo...');

console.log('Leyendo el segundo archivo...');
const secondText = await readFile('./archivo2.txt', 'utf-8');
console.log('segundo texto:', secondText);