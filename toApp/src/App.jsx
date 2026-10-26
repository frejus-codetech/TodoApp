import { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './composant/sidebar/sidebar.jsx';
import Header from './composant/header/header.jsx'; 
import Todo from './composant/todo/todo.jsx'; 
import API_URL from '../API.js';
function App() {
    const [tasks, setTasks] = useState( () => {
      const saveTask = localStorage.getItem("tasks");
      return saveTask ? JSON.parse(saveTask) : [];
    });
      
  /*useEffect(
    () => { localStorage.setItem("tasks", JSON.stringify(tasks))} , [tasks]);*/

    useEffect(() => {
      fetch(API_URL)
        .then(response => {
          if(!response.ok){
            throw new Error ("Erreur lors de la récupération de la tâche");
          }
          return response.json();
        })
        .then(data => setTasks(data))
        .catch(error => {
          console.error(error);
        })
        .finally(() => { setLoading(false); });
    }, []);


    //Chargement des tâche en cour

    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState("all");

  return (
    
    <>  
      <Sidebar  tasks={tasks} filter={filter}  setFilter={setFilter}/>
      <Header />
      <Todo tasks={tasks} setTasks={setTasks} filter={filter}  setFilter={setFilter}  loading={loading}/>
    </>
    
  )
}

export default App
