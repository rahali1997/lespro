import React, { useEffect, useContext, useRef,useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import  AuthContext  from '../AuthContext'
import Loader from '../components/Loader'


const RegisterPage = () => {
    const [loading,setLoading]=useState(false)

    const userAuth=useContext(AuthContext)
    const history = useHistory()
    const userRef = useRef()
    const emailRef = useRef()
    const passRef = useRef()

    useEffect(() => {

        if (userAuth.state) {
            userAuth.setState(true)
            history.push('/home')
        } 
    })

    const register = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            let response = await axios.post('/api/user/register',
                {
                    "username": userRef.current.value,
                    "email": emailRef.current.value,
                    "password": passRef.current.value
                }
            )

            localStorage.setItem('token', response.data.token)
            userAuth.setState(true)
            history.push('/home')
        } catch (error) {
            setLoading(false)
            console.log(error.message)
            alert("Email Already Exist")
        }
    }
    return (
        <div>
             {loading && <Loader />}
            <div className='register-box'>
                <br />
                <form onSubmit={(event) => register(event)}>
                    <input ref={userRef} className='username' type='text' placeholder="Username" required />
                    <input ref={emailRef} className='username' type='email' placeholder="Email" required />
                    <input ref={passRef} className='password' type='Password' placeholder="Password" required />
                    <button className='btn-login'>Register</button>
                    <Link to='/'>
                        <button className='btn-register'>Login</button>
                    </Link>
                </form>
                <br />
            </div>
        </div>
    )
}

export default RegisterPage
