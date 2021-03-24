import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import {alertS,alertE} from '../../Alert'
import './edit.css'

const Edit = () => {
    const [state,setState]=useState({phone:"",des:""})
    let phoneRef=useRef()
    let desRef=useRef()
    useEffect(()=>{
        axios.get('/api/user/details', {
            headers: {
                'header-token': localStorage.token
            }
        }
        ).then(res => setState({phone:res.data.phone,des:res.data.description}))
        .catch(err =>console.log("done"))
    },[])
    const UpdateService=async(e)=>{
        e.preventDefault()
        try {
            let result=await axios
        .post('/api/user/service/update',
         {"phone":phoneRef.current.value,"description":desRef.current.value},
         {headers: {
            'header-token': localStorage.token
        }}
        )
        alertS('le service est mis à jour avec succès')
        } catch (error) {
            console.log(error.message)
        }
        

    }
    return (
        <div className="edit">
            <form onSubmit={(e)=>UpdateService(e)}>
            <label className="label__form">Numéro du telephone</label>
                <input ref={phoneRef} onChange={(e)=>setState({phone:e.target.value})} value={state.phone} maxLength="8" className="input" type="number" placeholder="Numéro de telephone" required />
                <label className="label__form">Description</label>
                <textarea ref={desRef} onChange={(e)=>setState({des:e.target.value})} value={state.des} className="textarea" type="text" placeholder="
                 décrivez votre expertise!" required />
                <button className="service__button">Mettre à jour </button>
                <img className="badge" src="/images/check.png"/>
            </form>
        </div>
    )
}

export default Edit
