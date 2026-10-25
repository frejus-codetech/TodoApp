import './todo.css' ;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus, faPen } from "@fortawesome/free-solid-svg-icons";      
import { faClock, faCircle,faCircleCheck, faTrashCan, } from "@fortawesome/free-regular-svg-icons";
import { useState } from 'react';
import API_URL from "./api";



function Todo({tasks , setTasks , filter , setFilter, loading}) {
    const [Tasktitle, setTasktitle] = useState('');    
    
  
    //modifier une tache
    const handleChangeTask = (e) => {
        setTasktitle(e.target.value)
    }



    /*ajouter une tache
    const handleAddTask = () => {

        if (Tasktitle.trim() !== '') {  
            
            setTasks([
                ...tasks, 
                {title: Tasktitle, completed: false}
            ]);

            setTasktitle('');
        }
        else{
            return;
        }
    }*/


    //ajouter une tache
    const handleAddTask = () => {
         console.time("Modification de la tâche");
        if (Tasktitle.trim() == ''){
            return;
        }
    fetch(API_URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        title: Tasktitle
    })
    }).then(response => {
          if (!response.ok) {
    throw new Error("Erreur lors de la création de la tâche");
    }

    return response.json();

    
        })
    .then(data => {
        setTasks(previousTasks => [ ...previousTasks, data.task ]);
        setTasktitle('');
    })
    .catch((error)=>{
        console.error(error)
    })
    .finally(() => {
        console.timeEnd("Modification de la tâche");
    });

    }

    //status de la tache
    /*const handleToggleTask = (index) => {
    setTasks(
        tasks.map((task, i) => {

            if (index === i) {
                return{
                    ...task,
                completed: !task.completed
            }}

            // retourner task sans modification
            return task;
            })
        );
    }; */

        //status de la tache
    const handleToggleTask = (id) => {
            const task = tasks.find(task => task._id === id);
            if (!task) return;

        fetch(`${API_URL}/${id}` , {
            method:"PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify ({
                completed: !task.completed
            })
        })
        .then( response => {
            if(!response.ok){
                throw new Error("Erreur lors de la modification");  
            }

            return response.json();
        })
        .then( data => {
            setTasks( previousTasks => 
                previousTasks.map( 
                    task => task._id === id ? data.task : task )
            )
        })
        .catch((error)=>{
            console.error(error)
        })

    }
    

     //supprimer une tache
    const handleDeleteTask = (_id) => {
        fetch(`${API_URL}/${_id}`, {
            method: "DELETE"
        })
            .then(async response => {
    const data = await response.json();

    if (!response.ok) {
        console.error("Code HTTP :", response.status);
        console.error("Erreur du serveur :", data);
        throw new Error("Erreur lors de la modification");
    }

    return data;
})

            .then ( () => { 
                setTasks(previousTasks => previousTasks.filter(task => task._id !== _id));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    //supprimer une tache
    /*const handleDeleteTask = (index) => {
    setTasks(
        tasks.filter((task, i) => index !== i)
        );
    };*/

   

    //modifier une tache
    const [editingIndex,  setEditingIndex] = useState (null);
    const [editTitle,  setEditTitle] = useState ("");

    const handleStartEdit = (index, taskTitle) => {
        setEditingIndex(index);
        setEditTitle(taskTitle);                           
    }


//fonction de modification
   const handleEditTask = async (id, newTitle) => {
    try {
        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: newTitle
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        setTasks(previousTasks =>
            previousTasks.map(task =>
                task._id === id ? data.task : task
            )
        );
    } catch (error) {
        console.error("Erreur :", error.message);
    }

     setEditingIndex(null);
     
};

/*
    //fonction de modification
    const handleEditTask = (index, newTitle) => {
        if (newTitle.trim() !== "") {
            setTasks(
                tasks.map((task, i) => {
                    if (index === i) {
                        return {
                            ...task,
                            title: newTitle
                        };
                    }
                    return task;
                })
            );
            setEditingIndex(null);
        }
        else{
            return;
        }
    };
*/
   
        
    const filteredTasks = () =>{
         if (filter === 'todo'){
         return tasks.filter((task) => task.completed === false)
         
    }

    if (filter === 'completed'){
        return tasks.filter((task) => task.completed === true)
    }

        return   tasks
   
}






  return (
    <div className='todo'>
        <div className="start">
            <h3>Mes tâches</h3>
            <p>Organise tes idées, concrétise tes projets !</p>
        </div>

        <div className="addtas">
            <div className="add">
                <FontAwesomeIcon icon={faPlus} className='icadd'/>
                <input type="text" id='tach' value={Tasktitle} placeholder='Ajouter une nouvelle tâche...' onChange={handleChangeTask} />
            </div>
            <button type='submit' onClick={() => handleAddTask()} ><FontAwesomeIcon icon={faPlus} className='icad'/> Ajouter</button>
        </div>
        <div className="statut">
            <span className={ filter === "all" ? 'status active' : 'status'} onClick={() => setFilter("all")} >Toutes</span>
            <span className={ filter === "todo" ? 'status active' : 'status'} onClick={() =>  setFilter("todo")}><FontAwesomeIcon icon={faCircle} className='stat'/> À faire </span>
            <span className={ filter === "completed" ? 'status active' : 'status'}  onClick={() => setFilter("completed")}><FontAwesomeIcon icon={faCircleCheck} className='stat'/>Terminées</span>
        </div>

        <div className="tasklist">
            {loading ? (
                <p className='load'>Chargement des tâches...</p>
            ) : (
                filteredTasks().map((task, index) => (
                    <div key={index} className='taskcont'>
                        <input type="checkbox" className='check' id={`task-${index}`} checked={task.completed} onChange={() => handleToggleTask(task._id)} ></input>
                        <li className={task.completed ? 'completed' : 'task'}>
                            {
                                editingIndex === index ?
                                    <>
                                        <input className='champ' type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}></input>
                                        <button className='save' onClick={() => handleEditTask(task._id, editTitle)}>Save</button>
                                        <button className='cancel' onClick={() => setEditingIndex(null)}>Cancel</button>
                                    </> : task.title
                            }
                        </li>
                        <span className={task.completed ? 'termine' : 'faire'}>{task.completed ? 'Terminée' : 'À faire'}</span>
                        <span className='delete' onClick={() => handleDeleteTask(task._id)}><FontAwesomeIcon icon={faTrashCan}/></span>
                        <span className='edit' onClick={() => handleStartEdit(index, task.title)}><FontAwesomeIcon icon={faPen}/></span>
                    </div>
                ))
            )}
        </div>
    </div>
  )
}

export default Todo ;

