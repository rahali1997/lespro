import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../../AuthContext'
import {alertS,alertE} from '../../Alert'
import './profile.css'


const Profile = () => {
    const userAuth = useContext(AuthContext)
    const [phone,setPhone]=useState('')
    let history = useHistory()
    useEffect(() => {
        if (!userAuth.state) {
            userAuth.setState(false)
            history.push('/login')
        }
    })

    useEffect(()=>{
        function getUserData(){
            axios.get('/api/user/details',
            {headers:{
                'header-token':localStorage.token
            }}).then(res=>setPhone(res.data.phone)).catch(err=>console.log(err))
        }
        getUserData()    

    },[])
    function updateProfile(event) {
        event.preventDefault()
        axios.post('/api/user/profile',{"phone":phone},{
            headers:{
                'header-token':localStorage.token
            }
        }
        ).then(res=>setPhone(res.data.message)).catch(err=>alertE("quelque chose a mal tourné"))
        alertS("Mise à jour du profil réussie")
        

    }
    return (
        <div className="profile">
            <label className="label__form">Numéro du telephone</label>
            <form onSubmit={(e)=>updateProfile(e)}>
                <input onChange={(e)=>setPhone(e.target.value)} value={phone} className="profile__number" type="number" placeholder="Numero de telephone" required />
                <button className="profile__button">Mettre à jour</button>
            </form>
        </div>
    )
}

export default Profile
