// este js es el encargado de interactuar con el frontend de esta app

import { 
  saveTask , 
  getTasks , 
  onGetTasks , 
  deleteTask ,
  getTask ,
  updateTaks
 } from './firebase.js'

const taskForm = document.getElementById('task-form')
const tasksContainer = document.getElementById('tasks-container')

let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async () => {

  onGetTasks((querySnapshot) => { 
    // cada vez que se detecta un cambio en la db se hace todo este proceso para mostrar la info

    let html = '';
    
    querySnapshot.forEach((doc) => {
      const task = doc.data(); // el objeto data() es el objeto que tiene el title y description de la task
      html += `
      <div class="card card-body mt-2 border-dark">
        <h3> ${task.title} </h3>
        <p> ${task.description} </p>
          <div>
            <button class='btn btn-danger btn-delete' data-id='${doc.id}'>Delete</button>
            <button class='btn btn-outline-secondary btn-edit' data-id='${doc.id}'>Edit</button>
          </div>
      </div>
      `;
    });
    
    tasksContainer.innerHTML = html




    const btnsDelete = tasksContainer.querySelectorAll('.btn-delete')

    btnsDelete.forEach(btn => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        // aca se usa una desestructuracion super poderosa para no hacer esto: event.target.dataset.id
        deleteTask(dataset.id)
        // el id que tiene la tarea que es extraido del boton se la damos a la funcion de borrar
      })
    })



    const btnsEdit = tasksContainer.querySelectorAll('.btn-edit')

      btnsEdit.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();

          taskForm['task-title'].value = task.title
          taskForm['task-description'].value = task.description
          // de esta forma estamos accediendo al formulario y poniendo los datos dentro de los input para poder editarlos

          editStatus = true;
          // esta variable es para saber si se esta editando una tarea o se quiere agregar una nueva en caso de no estar editando
          id = doc.id
          // aca se guarda el id de la task para poder identificarla cuando se quiere editar una task
          taskForm['btn-task-save'].innerHTML = 'Edit!'

        })
      })



  });

});



taskForm.addEventListener('submit', (e) => {
  
  e.preventDefault()

  const title = taskForm['task-title']
  const description = taskForm['task-description']
  // esas dos constantes guardan el codigo HTML entero es decir todo el input no solo el valor y para acceder a su valor hay que usar el dot notation de esta manera: title.value y ahora si podemos obtener el valor ingresado en el input



  if ( (title.value.length > 3) && (!editStatus) ){
    // que la lonjitud del titulo sa mayor a 0 y que edicion sea false, esto se hace para que no se creen tareas vacias
    saveTask(title.value , description.value)
    // esta funcion viene del archivo firebase.js
  }else{
    updateTaks(id,{ // este id es el id que esta guardado en la variable global
      title: title.value, 
      description: description.value
    })
    // a la funcion de editar tarea en db se le dan los datos necesarios como el id y los campos
    editStatus = false
    window.location.reload() // esto recarga la pagina, por que este hard codeo? hay un bug; cuando actualizas una tarea se queda con el estado de actualizar en el boton y en el formulario, no se actualiza por mas que haga en form reset o ponga en false el estado de edicion y solo se actualizaba cuando se recargaba la pagina, cuando se le encuentre una solucion al bug de edicion se sacara este hardcodeo
  }

  taskForm.reset()

})


