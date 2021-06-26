require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("======================".green);
    console.log("Seleccione una Opcion".green);
    console.log("======================\n".green);

    console.log(`${"6.".green} Crear tarea`);
    console.log(`${"5.".green} Listar tareas`);
    console.log(`${"4.".green} Listar tareas completadas`);
    console.log(`${"3.".green} Listar tareas pendientes`);
    console.log(`${"2.".green} completar tarea(s)`);
    console.log(`${"1.".green} borrar tarea`);
    console.log(`${"0.".green} salir\n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question(`Seleccione una opcion: \n`, (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`Presione ${"ENTER".green} para continuar\n`, (opt) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
