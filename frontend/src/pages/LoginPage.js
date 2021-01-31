import React, { useEffect, useContext, useRef,useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AuthContext from '../AuthContext'
import Loader from '../components/Loader'


const LoginPage = () => {

   const [loading,setLoading]=useState(false)

    const userAuth = useContext(AuthContext)
    const history = useHistory()
    const userEmail = useRef()
    const userPass = useRef()

    useEffect(() => {

        if (userAuth.state) {
            userAuth.setState(true)
            history.push('/home')
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
            
            history.push('/home')
        } catch (error) {
            setLoading(false)
            console.log(error.message)
            alert('Wrong Credentials!')
           
        }
    }
    return (
        <div>
            {loading && <Loader />}
            <div className='login-box'>
                <br />
                <form onSubmit={(event) => Login(event)}>
                    <input ref={userEmail} className='username' type='Email' placeholder="Email" required />
                    <input ref={userPass} className='password' type='Password' placeholder="Password" required />
                    <button className='btn-login'>Login</button>
                    <Link to='/register'>
                        <button className='btn-register'>Register</button>
                    </Link>
                </form>
                <br />
            </div>
        </div>
    )
}

export default LoginPage
