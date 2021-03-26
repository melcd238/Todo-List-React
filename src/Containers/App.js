import React, { useState, useRef, useEffect } from 'react'
import './App.css';
import TodoTask from '../Components/TodoTask'
import axios from '../Axios/Axios.firebase'

function App() {
  // States:
  const [task, setTask]=useState([])

  const [input ,setInput]=useState(" ")

  // Ref:

  const inputRef = useRef()
  // ETATS: 
  useEffect(()=>{
    console.log('[App.js] useEffect');
    inputRef.current.focus();
    fetchTask();
   
    
    return()=>{
      console.log('[App.js] useEffect (didUnmount)');
    }
  
  },[])

  // Variables:

  let taskDisplay = task.map((todo , index )=>{
    return(
    <TodoTask
    key={index}
    done={todo.done}
    content={todo.content}
    onCheck={()=>checkingHandler(index)}
    delete={()=>deleteTaskHandler(index)}
   />)
  })

   // Methodes:
  const checkingHandler = (index)=>{
      const newtask = [...task];
      newtask[index].done = !task[index].done;
      setTask(newtask)
      axios.put('task/' + task[index].id + '.json', newtask[index])
      .then(response=>{
        console.log(response)
      })
      .catch(error=>{
        console.log(error)
      })
  }

  
  const deleteTaskHandler = (index)=>{
    const newTask = [...task];
   newTask.splice(index,1)
    setTask(newTask)
    axios.delete('task/' + task[index].id + '.json')
    .then(response=>{
      console.log(response)
    })
    .catch(error=>{
      console.log(error)
    })
  }
  const submitHandler = (event)=>{
    event.preventDefault()
    // Ajouter tes task dans notre state
    const newTask = {
      content : input,
      done : false
    }
    setInput('')
    axios.post('task.json', newTask)
    .then(response=>{
       console.log(response)
       fetchTask();
    })
    .catch(error=>{
      console.log(error)
    })
  }
  const changedInputHandler = (event)=>{
     setInput(event.target.value);
  }

  const fetchTask = ()=>{
    axios.get('task.json')
    .then(response=>{
      const newTasks=[]
      for(let key in response.data){
          newTasks.push({
            ...response.data[key],
            id : key
          })
      }
      setTask(newTasks)

    })
    .catch(error=>{
      console.log(error)
    })
  }

  return (
    <div className="App">
       <h1 className="titreH1"> Todo List</h1>
       <div className="todo">
         <form onSubmit={(e)=> submitHandler(e)}>
         <input className="inputTodo"
                ref={inputRef}
                value={input}
                placeholder="Que souhaitez-vous ajouter?" 
                type="text"
                onChange={(e)=> changedInputHandler(e)}
                ></input>
         <button type="submit" className="btnAjout" style={{cursor:"pointer"}}> Ajouter</button>
         </form>
       </div>

      
         <>
         {taskDisplay}
         </>
      
       
       
    </div>
  );
}

export default App;
