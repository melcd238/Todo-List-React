import React, { useState } from 'react'
import './App.css';
import TodoTask from '../Components/TodoTask'

function App() {
  // State 
  const [task, setTask]=useState([])

  const [input ,setInput]=useState(" ")

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
  }

  
  const deleteTaskHandler = (index)=>{
    const newTask = [...task];
   newTask.splice(index,1)
    setTask(newTask)
  }
  const submitHandler = (event)=>{
    event.preventDefault()
    // Ajouter tes task dans notre state
    const newTask = {
      content : input,
      done : false
    }
    setTask([...task,newTask])
    setInput('')
  }
  const changedInputHandler = (event)=>{
     setInput(event.target.value);
  }

  return (
    <div className="App">
       <h1 className="titreH1"> Todo List</h1>
       <div className="todo">
         <form onSubmit={(e)=> submitHandler(e)}>
         <input className="inputTodo"
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
