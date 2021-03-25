import React from 'react'
import styled from 'styled-components'


let BackgroundTask = styled.div`
    border: 1px solid slategray;
    width: 600px;
    height: 30px;
    margin-left: 5px;
    border-radius: 20px;
    background-color: ${props=> props.backCheck ? "rgb(100, 155, 211)" : "slategray"}; 
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    padding-left:16px;
    padding-right:16px;
    align-items: center;
   `
let Ptask = styled.p`
    text-decoration: ${props=>props.backCheck ? "line-through black 2px" : "none"};
`



function TodoTask (props){

    // l'icone carré sera modifiée si check ou pas <i className="far fa-check-square"></i>
    return(
        <BackgroundTask  backCheck={props.done}>
            {props.done ? <i style={{cursor:"pointer"}} className="far fa-check-square" onClick={props.onCheck}></i> 
            : <i style={{cursor:"pointer"}} className="far fa-square" onClick={props.onCheck}></i> }
            
            <Ptask backCheck={props.done} >{props.content}</Ptask>
            <i style={{cursor:"pointer"}} className="fas fa-times" onClick={props.delete}></i>
       </BackgroundTask>
    )
}

export default TodoTask