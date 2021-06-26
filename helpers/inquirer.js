const inquirer = require("inquirer");
const InputPrompt = require("inquirer/lib/prompts/input");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "6",
        name: `${('6').green}.Crear tarea`,
      },
      {
        value: "5",
        name: `${('5').green}.Listar tareas`,
      },
      {
        value: "4",
        name: `${('4').green}.Listar tareas pendientes`,
      },
      {
        value: "3",
        name: `${('3').green}.Listar tareas completadas`,
      },
      {
        value: "2",
        name: `${('2').green}.Borrar tarea`,
      },
      {
        value: "1",
        name: `${('1').green}.Completar tarea(s)`,
      },
      {
        value: "0",
        name: `${('0').green}.Salir`,
      },
    ],
  },
];
const inquirerMenu = async () => {
  console.clear();
  console.log("======================".green);
  console.log("Seleccione una Opcion".white);
  console.log("======================\n".green);
  const { opcion } = await inquirer.prompt(preguntas);
  console.log(opcion);
  return opcion;
};

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: "Enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];
  await inquirer.prompt(question);
  console.log('\n');
};

const leetInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return ' Por favor ingresa un valor';
        }
        return true;
      }
    }
  ]
  const { desc } = await inquirer.prompt(question);
  return desc
}
const confirmar = async (message) => {
  const question = [{
    type: 'confirm',
    name: 'ok',
    message
  }]
  const { ok } = await inquirer.prompt(question);
  return ok;
}

const listadoTareaBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`
    }
  });
  choices.unshift({
    value:'0',
    name:'0.'.green + 'Cancelar'
  });
  const preguntas = [
    {
      type: 'list',
      name: 'id',
      menssage: 'borrar',
      choices
    }
  ]
  const { id } = await inquirer.prompt(preguntas);
  return id;
}

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked:(tarea.completadoEn) ? true : false
    }
  });
  
  const preguntas = [
    {
      type: 'checkbox',
      name: 'ids',
      menssage: 'Selecciones',
      choices
    }
  ]
  const { ids } = await inquirer.prompt(preguntas);
  return ids;
}

module.exports = {
  inquirerMenu,
  pause,
  leetInput,
  confirmar,
  listadoTareaBorrar,
  mostrarListadoChecklist
 
};
