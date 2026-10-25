import React from 'react';
import "./sidebar.css";   
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,faChartLine,faBolt } from "@fortawesome/free-solid-svg-icons";      
import { faClock, faCircle, faHouse,faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import Todo from '../todo/todo.jsx' 

function Sidebar({tasks ,filter, setFilter}) {
const staall = tasks.length
const statodo = tasks.filter((task) => task.completed === false ).length
const stacomplet = tasks.filter((task) => task.completed === true ).length
    
  return (
    <div>
        <aside> 
            <div className='lg-to'>
                <div className='logo-container'>
                    <div className='logo'>  
                            <FontAwesomeIcon icon={faCheck} className='faCheck' />
                    </div>
                    <h3>To Do <span style={{color: '#4537c9'}}>List</span></h3>
                </div>
                
               
            </div>

            <div className='side-content'> 
                <ul>
                    <li className={filter === "all" ? 'filter active' :'filter'} onClick={ () => setFilter ("all")}><FontAwesomeIcon icon={faHouse} className='icons' />Toutes les tâches <span className='badge'>{staall}</span></li>
                    <li className={filter === "completed" ? 'filter active' :'filter'} onClick={ () => setFilter ("completed")}><FontAwesomeIcon icon={faCircleCheck} className='icons'  />Terminées <span className='badge'>{stacomplet}</span></li>
                    <li className={filter === "todo" ? 'filter active' :'filter'} onClick={ () => setFilter ("todo")}><FontAwesomeIcon icon={faCircle} className='icons'  />À faire <span className='badge'>{statodo}</span></li>
                </ul>
            </div>

            <div className='side-content'>
                <ul>
                    <h3><FontAwesomeIcon icon={faChartLine} />Statistiques</h3>
                    <li>Total <span className='badg'>{staall}</span></li>
                    <li>Terminées <span className='badg'  style={{color:"  rgba(11, 231, 121, 0.9)"}}>{stacomplet}</span></li>
                    <li>À faire <span className='badg'  style={{color:"rgb(247, 9, 61)"}}>{statodo}</span></li>
                </ul>
            </div>

            <div className='side-footer'>
                <p className='bade'>
                    <FontAwesomeIcon icon={faBolt}/>
                </p>

                <p className='bird'>
                    <small>
                        Petits pas, grands résultat !
                    </small>
                </p>

                <p className='bird'>Chaque tâche accomplie vous rapproche de vos objectifs.</p>

            </div>
            
        </aside>
    </div>
  )
}

export default Sidebar