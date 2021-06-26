require("colors");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const { inquirerMenu, pause, leetInput, listadoTareaBorrar, confirmar,mostrarListadoChecklist } = require("./helpers/inquirer");
const { Tareas } = require("./models/tareas");

const main = async () => {
  opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "6":
        const desc = await leetInput("Descripcion :");
        tareas.crearTarea(desc);

        break;
      case "5":
        tareas.listadoCompleto();

        break;
      case "4":
        tareas.listarPendientesCompletadas(false);

        break;
      case "3":
        tareas.listarPendientesCompletadas(true);

        break;
      case "2":
        const id = await listadoTareaBorrar(tareas.listadoArr);
        if (id !== '0') {
          const ok = await confirmar('¿Estas seguro?');
          if (ok) {
            tareas.borrarTarea(id);
            console.log('Tarea Borrada');
          }

        }
        break;

        case "1":
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        console.log(ids);
        tareas.toggleCompletadas(ids);

        break;



    }
    guardarDB(tareas.listadoArr);

    await pause();
  } while (opt !== "0");
};

main();
