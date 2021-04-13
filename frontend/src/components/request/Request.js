import React, { useState, useEffect, useRef, useContext } from 'react'
import AuthContext from '../../AuthContext'
import { useHistory } from 'react-router-dom'
import { alertE, alertS } from '../../Alert'
import axios from 'axios'
import './request.css'


const Request = () => {
    const PhoneRef = useRef()
    const FiscRef = useRef()
    const SpecRef = useRef()
    const RegionRef = useRef()
    const descRef = useRef()
    const history = useHistory()
    const userauth = useContext(AuthContext)
    useEffect(() => {

        if (!userauth.state) {
            history.push('/login')
        }
    }, [])
    const sendRequest = async (e) => {
        e.preventDefault()
        if (PhoneRef.current.value.length != 8)  {
            alertE('Numero de telephone invalid')
        }
        else {
            if (FiscRef.current.value.length != 8) {
                alertE('Matricule fiscale invalid')
            } else {


                try {
                    let result = await axios.post('/api/user/service/request',
                        {
                            "phone": PhoneRef.current.value,
                            "specialite": SpecRef.current.value,
                            "region": RegionRef.current.value,
                            "fiscale": FiscRef.current.value,
                            "description": descRef.current.value,
                            "spec": SpecRef.current.value
                        },
                        {
                            headers: {
                                'header-token': localStorage.token
                            }
                        }
                    )
                    history.push('/')
                    alertS('Demande envoyée')

                } catch (error) {
                    console.log(error.message)
                    alertE('erreur')
                }


            }
        }
    }

    return (
        <div className="request">
            <form onSubmit={(e) => sendRequest(e)}>
                <input ref={PhoneRef} maxLength="8" className="input" type="number" placeholder="Numéro de telephone" required />
                <input ref={FiscRef} className="input" type="text" placeholder="matricule fiscale" required />
                <label className="service_label">Sélectionnez une spécialité:</label>
                <select ref={SpecRef} className="select" defaultValue={'Electricité'}>
                    <option value='Electricité'>Electricité</option>
                    <option value="Plomberie">Plomberie</option>
                    <option value="Chauffage">Chauffage</option>
                    <option value="Climatisation">Climatisation</option>
                    <option value="Alarme">Alarme</option>
                </select>
                <label className="service_label">Sélectionnez votre region</label>
                <select ref={RegionRef} className="select" defaultValue={'tunis'}>
                    <option value="Tunis">Tunis</option>
                    <option value="Ariana">Ariana</option>
                    <option value="Manouba">Manouba</option>
                    <option value="sousse">Sousse</option>
                </select>
                <textarea ref={descRef} className="textarea" type="text" placeholder="
                 décrivez votre expertise!" required />
                <button className="service__button">Envoyer</button>
            </form>
        </div>
    )
}

export default Request

