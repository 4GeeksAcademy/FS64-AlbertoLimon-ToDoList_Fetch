import React, { useState, useEffect } from 'react';
import '../../styles/home.css';

function Home() {
    const urlGet = "https://playground.4geeks.com/todo/users/alberto_l"
    const urlPost = "https://playground.4geeks.com/todo/todos/alberto_l"
    const urlDelete = "https://playground.4geeks.com/todo/todos"
    
    //const [inputState, setInputState] = useState('');
    //const [listaOriginal, setListaOriginal] = useState([]);
    //const [listaFiltrada, setListaFiltrada] = useState([]);
    const [textoNuevo, setTextoNuevo] = useState('');
    const [countTodos, setCountTodos] = useState(0);
/*
    useEffect(() => {
        if (inputState === '') setListaFiltrada(listaOriginal);
        if (inputState !== '') {
            const estadoActualizado = listaOriginal.filter((item) => {
                return item.name.toLowerCase().includes(inputState.toLowerCase());
            });
            setListaFiltrada(estadoActualizado);
        }
    }, [listaOriginal, inputState]);  
*/
    /*
    const agregarNuevoMiembro = () => {
        setListaOriginal([...listaOriginal, { name: textoNuevo }]);
        setTextoNuevo('');
    };

    const eliminarTarea = (index) => {
        const nuevaLista = listaOriginal.filter((_, i) => i !== index);
        setListaOriginal(nuevaLista);
    };
    */

    
    


    const addTodo = async (label) => {
      console.log("añadir ", label)
        const response = await fetch(`${urlPost}`, {
        method: "POST",
        body: JSON.stringify({
          "label": label, "is_done": false
        }),
        headers: {
          "Content-Type": "application/json"
      }
    })
    if(response.ok){
      const data = await response.json();
      return data;
    } else {
      console.log('error: ', response.status, response.statusText);
      /* Realiaza el tratamiento del error que devolvió el request HTTP */
      return {error: {status: response.status, statusText: response.statusText}};
    };
  }

    const deleteTodo = async (idTarea) => {
      console.log(idTarea)
      const response = await fetch(`${urlDelete}/${idTarea}` , {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
         },
      });
      if(response.ok){
        const data = await response.json();
        return data;
      } else {
        console.log('error: ', response.status, response.statusText);
        /* Realiaza el tratamiento del error que devolvió el request HTTP */
        return {error: {status: response.status, statusText: response.statusText}};
      };
    }

    const fetchTareas = async (setState) => {
      const response = await fetch(`${urlGet}` , {
        method: 'GET'
      });
      if(response.ok){
        const data = await response.json();
        setCountTodos(data.todos.length)
        setState(data.todos);
      };
      
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
                  
                  <button className='eliminar' onClick={() => deleteTodo(tarea.id)}>
                      <i className='fas fa-times'></i>
                  </button>
              </li>
            ))}
          </ul>
        </>
      );
    };

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
                    <button className='agregar' onClick={() => addTodo(textoNuevo)}>Agregar</button>
                    
                    <ToDoList />
                
					          <div className="task-counter">
                        Tareas: {countTodos} 
                    </div>
            </div>
				
          </div>
			
        </div>
    );
  
}

export default Home;