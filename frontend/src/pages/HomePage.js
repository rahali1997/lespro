import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../AuthContext'




const HomePage = () => {

    const userAuth=useContext(AuthContext)
    const history = useHistory()


    useEffect(() => {

        if (!userAuth.state) {
            history.push('/')
        }

    }, [])
    return (
        <div>
            <h1 className="welcom-title"><span style={{ color: '#51c2d5' }}>W</span>elcom !</h1>
        </div>
    )
}

export default HomePage
