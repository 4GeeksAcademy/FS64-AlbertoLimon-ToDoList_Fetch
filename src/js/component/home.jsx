import React, { useState, useEffect } from 'react';
import '../../styles/home.css';

function Home() {
    const url = "https://playground.4geeks.com/todo/users/alberto_l"
    
    const [inputState, setInputState] = useState('');
    const [listaOriginal, setListaOriginal] = useState([]);
    const [listaFiltrada, setListaFiltrada] = useState([]);
    const [textoNuevo, setTextoNuevo] = useState('');

    useEffect(() => {
        if (inputState === '') setListaFiltrada(listaOriginal);
        if (inputState !== '') {
            const estadoActualizado = listaOriginal.filter((item) => {
                return item.name.toLowerCase().includes(inputState.toLowerCase());
            });
            setListaFiltrada(estadoActualizado);
        }
    }, [listaOriginal, inputState]);

    const agregarNuevoMiembro = () => {
        setListaOriginal([...listaOriginal, { name: textoNuevo }]);
        setTextoNuevo('');
    };

    const eliminarTarea = (index) => {
        const nuevaLista = listaOriginal.filter((_, i) => i !== index);
        setListaOriginal(nuevaLista);
    };



    const fetchTareas = async (setState) => {
        const data = await fetch(
          'https://playground.4geeks.com/todo/users/alberto_l'
        ).then((res) => res.json());
      
        setState(data.todos);
      };
      
      const ToDoList = () => {
        const [tareas, setTareas] = useState([]);
        useEffect(() => {
          fetchTareas(setTareas);
        }, []);
        return (
          <>
            <ul>
              {tareas.map((tarea, index) => (
                <li key={index}>
                    {tarea.label}
                    <button className='eliminar' onClick={() => eliminarTarea(index)}>
                        <i className='fas fa-times'></i>
                    </button>
                </li>
              ))}
            </ul>
          </>
        );
      };
    


    const addTodo = async (label) => {
        fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(tareas),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok);
        console.log(resp.status); 
        console.log(resp.text()); 
        return resp.json(); 
    })
    .then(data => {
        console.log(data); 
    })
    .catch(error => {
        // Manejo de errores
        console.log(error);
    });
    }

    return (
        <div className="background">
            <div className="task-list-container">
                <div className="task-list">
                    <input
                        type="text"
                        name=""
                        id=""
                        onChange={(event) => setTextoNuevo(event.target.value)}
                        value={textoNuevo}
                    />
                    <button className='agregar' onClick={agregarNuevoMiembro}>Agregar</button>
                    
                    <ToDoList />
                
					<div className="task-counter">
                        Tareas: {listaFiltrada.length} 
                    </div>
            </div>
				
          </div>
			
        </div>
    );
  
}

export default Home;