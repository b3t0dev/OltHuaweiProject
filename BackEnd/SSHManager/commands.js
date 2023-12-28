import classe from "./Manager.js";

const oltA = classe;

const comandos = ['display sysuptime', 'display ont autofind all','display ont info summary 0/17'];
oltA.connect();

const teste = await oltA.addToQueue(comandos);
console.log(teste.length);