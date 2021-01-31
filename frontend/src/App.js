import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import AuthContext from './AuthContext'
import axios from 'axios'

const App = () => {
    const [state, setState] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token === null) { localStorage.setItem('token', '') }
    }, [])

    async function check() {
        let token = localStorage.getItem('token')
        try {

            let result = await axios.post('/api/user/check', null, {
                headers: {
                    'header-token': token
                }
            })

            if (result.data === true) { setState(true) } 

        } catch (error) {
             console.log(error.message)
        }

    }
    check()


    return (
        <AuthContext.Provider value={{ state, setState }}>
            <Router>
                <Navbar />
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/home" component={HomePage} />
            </Router>
        </AuthContext.Provider>

    )
}

export default App
