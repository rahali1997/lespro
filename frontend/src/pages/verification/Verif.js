import React,{useEffect,useState} from 'react'
import Check from '../../components/check/Check'
import axios from 'axios'

const Verif = () => {
    
    return (
        <div>
             { true ? <Check/>:<img className="check__img" src='/images/check2.png'/>}
        </div>
     
    )
}

export default Verif
