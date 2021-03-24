import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useEffect, useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AuthContext from '../../AuthContext'
import './style.css'
import {  alertE } from '../../Alert'

const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const userAuth = useContext(AuthContext)
    const history = useHistory()
    const userEmail = useRef()
    const userPass = useRef()
    useEffect(() => {

        if (userAuth.state) {
            userAuth.setState(true)
            history.push('/')
        }

    })
    const Login = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            let response = await axios.post('/api/user/login',
                {
                    "email": userEmail.current.value,
                    "password": userPass.current.value
                })

            localStorage.setItem('token', response.data.token)
            userAuth.setState(true)
            history.push('/')
        } catch (error) {
            setLoading(false)
            console.log(error.message)
            alertE('Informations Invalid')


        }
    }
    return (
        <>
            {loading && <center><CircularProgress /></center>}
            <div className="login">
                <form onSubmit={(event) => Login(event)}>
                    <input ref={userEmail} className="login__input" type="email" placeholder="Email" required />
                    <input ref={userPass} className="login__input" type="password" placeholder="Mot de passe" required />
                    <button className="login__button">Login</button>
                    <Link to='/register'><button className="register-button">Creer un compte</button></Link>
                </form>
            </div>
        </>

    )
}

export default LoginPage
