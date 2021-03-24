import React, { useState, useEffect, useContext } from 'react'
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom'
import MenuPro from '../MenuPro/MenuPro'
import MenuUser from '../MenuUser/MenuUser'
import AuthContext from '../../AuthContext'
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
    let role = getRole();



    return (
        <div className="navbar">
            <div className="navbar__leftside">
                <Link className="Link" to='/'><h5 className="navbar__brand"><span>Pure</span>box</h5></Link>
            </div>
            <div className="navbar__rightside">
                {userAuth.state === false ? <>
                    <Link to="/login"><button className="navbar__login">Login</button></Link>
                    <Link to="/register"><button className="navbar__register">S'inscrire</button></Link>
                </> : role === 2 ? <MenuPro /> : role === 1 ? <MenuUser /> : ''}
            </div>
        </div>
    )
}

export default Navbar
