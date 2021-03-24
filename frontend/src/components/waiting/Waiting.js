import React from 'react'
import Alert from '@material-ui/lab/Alert';
import './waiting.css'


const Waiting = () => {
  
    return (
        <div className="waiting">  
            <img src="/images/investigation.png"/>
            <Alert className="waiting__alert" severity="warning"> Votre demande est en cours de traitement</Alert>
        </div>
    )
}

export default Waiting
