import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './pages/Login/LoginPage'
import Register from './pages/Register/RegisterPage'
import Navbar from '../src/components/Navbar/Navbar'
import Landing from '../src/pages/Landing/Landing'
import DetailsPage from '../src/pages/Details/DetailsPage'
import Contact from '../src/pages/Contact/Contact'
import Service from '../src/pages/proService/Service'
import Verif from '../src/pages/verification/Verif'
import Profile from '../src/pages/profile/Profile'
import Demande from '../src/pages/demandes/Demande'
import axios from 'axios'
import AuthContext from './AuthContext'


const App = () => {
  const [state, setState] = useState(false)
  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token === null) { localStorage.setItem('token', '') }
  }, [])
  async function checkAuth() {
    let token = localStorage.getItem('token')
    try {
      let result = await axios.post('http://127.0.0.1:5000/api/user/check', null, {
        headers: {
          'header-token': token
        }
      })
      if (result.data === true) { setState(true) }
    } catch (error) {

    }
  }
  checkAuth()

  return (
    <AuthContext.Provider value={{state,setState}}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/details/:id" component={DetailsPage} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/service" component={Service} />
        <Route exact path="/check" component={Verif} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/demande" component={Demande} />
      </Router>
    </AuthContext.Provider>

  )
}

export default App
