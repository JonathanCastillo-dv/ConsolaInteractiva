const colors = require("colors");
const { Tarea } = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      listado.push(this._listado[key]);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id=''){
      if(this._listado[id]){
        delete this._listado[id];
      }
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  cargarTareasFromArray = (tareas = []) => {
    tareas.forEach((t) => {
      this._listado[t.id] = t;
    });
  };

  listadoCompleto() {
    this.listadoArr.map(({ desc, completadoEn }, index) => {
      completadoEn == null
        ? console.log(
            colors.green(`${index + 1}.`),
            desc,
            "::",
            colors.red("Pendiente")
          )
        : console.log(
            colors.green(`${index + 1}.`),
            desc,
            "::",
            colors.green("Completada")
          );
    });
  }
  listarPendientesCompletadas(compl = true) {
    let contador = 0;
    this.listadoArr.forEach( tarea => {

        const { desc, completadoEn } = tarea;
        const estado = ( completadoEn ) 
                            ? 'Completada'.green
                            : 'Pendiente'.red;
        if ( compl ) {
           
            if ( completadoEn ) {
                contador += 1;
                console.log(`${ (contador + '.').green } ${ desc } :: ${ completadoEn.green }`);
            }
        } else {
          
            if ( !completadoEn ) {
                contador += 1;
                console.log(`${ (contador + '.').green } ${ desc } :: ${ estado }`);
            }
        }

    });     
  }

  toggleCompletadas(ids=[]){
    ids.forEach(id=>{
      const tarea = this._listado[id];
      if(!tarea.completadoEn){
        tarea.completadoEn =  new Date().toISOString();
      }
    });

    this.listadoArr.forEach(tarea=>{
        if(!ids.includes(tarea.id)){
          const tareas = this._listado[tarea.id];
          tareas.completadoEn = null; 
        }
    })
  }

}

module.exports = { Tareas };
