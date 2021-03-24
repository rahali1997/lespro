import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useEffect, useContext, useRef,useState } from 'react'
import { useHistory } from 'react-router-dom'
import  AuthContext  from '../../AuthContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './style.css';
import { alertE} from '../../Alert'
const RegisterPage = () => {
     const [check,setCheck]=useState(true)
     const [loading,setLoading]=useState(false)
     const userAuth=useContext(AuthContext)
     const history=useHistory()
     const userRef=useRef()
     const userEmail=useRef()
     const userChoice=useRef()
     const userPass=useRef()

     useEffect(() => {

        if (userAuth.state) {
            userAuth.setState(true)
            history.push('/')
        } 
    })

    const register = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            let response = await axios.post('/api/user/register',
                {
                    "fullName": userRef.current.value,
                    "email": userEmail.current.value,
                    "role":userChoice.current.value,
                    "password": userPass.current.value,
                }
            )

            localStorage.setItem('token', response.data.token)
            userAuth.setState(true)
            history.push('/')
        } catch (error) {
            setLoading(false)
            console.log(error.message)
            alertE("Email exist déja")
        }
    }


    return (
        <>  
            {loading && <center><CircularProgress/></center>}
            <div className="register">
                <form onSubmit={(event) => register(event)}>
                    <input ref={userRef} type="text" className="register__input" placeholder="Nom et prenom" required />
                    <input ref={userEmail} type="Email" className="register__input" placeholder="Email" required />
                    <label>Sélectionnez un choix:</label>
                    <br />
                    <select ref={userChoice} className="input__select">
                        <option value="1">J'ai des travaux chez moi</option>
                        <option value="2">Je suis un pro du bâtiment</option>
                    </select>
                    <input ref={userPass} type={check  ? "password":"text"} className="register__input" placeholder="Mot de passe" required />
                    <br />
                    <div className="checkbox__wrapper">
                        <input  className="register__checkbox" type="checkbox" onChange={()=>setCheck(!check)} />
                        <p className="checkbox__text">montrer le mot de passe</p>
                    </div>
                    <br />
                    <button className="register__button">S'inscrire</button>
                    <Link to="/login"><button className="register__button register__button--login">Login</button></Link>
                </form>
            </div>
        </>

    )
}

export default RegisterPage
