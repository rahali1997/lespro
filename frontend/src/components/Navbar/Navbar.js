import React, { useState, useEffect, useContext } from 'react'
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom'
import MenuPro from '../MenuPro/MenuPro'
import MenuUser from '../MenuUser/MenuUser'
import AuthContext from '../../AuthContext'
import axios from 'axios'
import './style.css'

const Navbar = () => {

    let token = localStorage.getItem('token')
    if (token === null) { localStorage.setItem('token', '') }
    const userAuth = useContext(AuthContext)
    function getRole() {
        let mytoken = localStorage.getItem('token')
        if (mytoken !== "") {
            let role = jwt_decode(mytoken)
            return (role.user.role)
        }

        return "";
    }
    function getName() {
        if(userAuth.state) {
            
            let mytoken = localStorage.getItem('token')
            if (mytoken !== "") {
                let role = jwt_decode(mytoken)
                return (role.user.fullName)
            }
        }
        return "";
    }
   
   
    
    let role = getRole();
    let username=getName();


    
   
      

    return (
        <div className="navbar">
            <div className="navbar__leftside">
                <Link className="Link" to='/'><h5 className="navbar__brand"><span>Les</span>Pro</h5></Link>
            </div>
            <div className="navbar__rightside">
                {/* {status===false ?<Link to="/check" className="Link"><button id="details__btnVr" color="secondary">Verifier votre mail</button></Link>:''} */}
                {username}
                {userAuth.state === false ? <>
                    <Link to="/login"><button className="navbar__login">Login</button></Link>
                    <Link to="/register"><button className="navbar__register">S'inscrire</button></Link>
                </> : role === 2 ? <MenuPro /> : role === 1 ? <MenuUser /> : ''}
            </div>
        </div>
    )
}

export default Navbar
