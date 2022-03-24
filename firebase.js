// este js es el encargado de interactuar con firebase

// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { 
  getFirestore , // se conecta a la db
  collection , // arma una coleccion de datos 
  addDoc , // agrega un documento
  getDocs , // obtiene los documentos de la db
  onSnapshot , // escucha cambios  en la db
  deleteDoc , // borra un documento
  doc , // selecciona un solo documento, NO una coleccion
  getDoc , // trae de la db un solo documento
  updateDoc // actualiza un documento de la db
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js"
  


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzGSRElwKFpL74g50S9mni4XO12_8xQ5c",
  authDomain: "todo-dbb18.firebaseapp.com",
  projectId: "todo-dbb18",
  storageBucket: "todo-dbb18.appspot.com",
  messagingSenderId: "496390912842",
  appId: "1:496390912842:web:fc055f745d14e5566adfb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

// AGREGAR TAREA
export const saveTask = ( title , description ) =>
  // esta funcion lo que hace es guardar los datos del form y mandarlos a la db de firestore
  addDoc(collection(db, 'tasks'), {title, description});

// OBTENER TAREAS
export const getTasks = () => getDocs(collection(db, 'tasks'));

// ESCUCHAR CAMBIOS EN LAS TAREAS
export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback)
// esto esta escuchando constantemente por cambios en la db

// ELIMINAR TAREA
export const deleteTask = id => deleteDoc(doc(db, 'tasks', id)); 
// se llama a delete doc para borrar un documento, se le pasa un documento de la db y se declara el nombre ademas de darle el id

// OBTENER TAREA A EDITAR
export const getTask = id => getDoc(doc(db , 'tasks' , id))

// EDITANDO LA TAREA EN LA DB
export const updateTaks = (id, newFields) => {
  updateDoc(doc(db , 'tasks' , id), newFields)
}
