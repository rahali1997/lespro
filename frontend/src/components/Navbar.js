import React,{useContext} from 'react'
import { Link,useHistory } from 'react-router-dom'
import AuthContext from '../AuthContext'



const Navbar = () => {
    const history=useHistory()
    const userAuth=useContext(AuthContext)

    const logout=()=>{
        localStorage.clear()
        userAuth.setState(false)
        history.push('/')
    }
    return (
        <div>
            <div className="mynavbar">
                <div className="left-side">
                    <h5 className="brand-title"><span style={{ color: '#51c2d5' }}>M</span>ern </h5>
                </div>
                <div className="right-side">
                    {!userAuth.state ?
                        <>
                            <Link className="link" to='/'>
                                <button className=" button login-button">Login</button>
                            </Link>

                            <Link className="link" to='/register'>
                                <button className="button register-button">Register</button>
                            </Link>
                        </>
                        : <button onClick={()=>logout()} className="button logout-button">Logout</button>}
                </div>
            </div>
        </div>
    )
}

export default Navbar
