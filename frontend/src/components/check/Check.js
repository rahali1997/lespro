import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { alertS, alertE } from '../../Alert'
import Alert from '@material-ui/lab/Alert';
import axios from 'axios'
import './check.css'



const Check = () => {
    const code = useRef()
    const history = useHistory()
    const sendV = async (e) => {
        e.preventDefault()
        try {
            let result = await axios.post('http://127.0.0.1:5000/api/user/verify',
                { "verifcode": code.current.value },
                {
                    headers: {
                        'header-token': localStorage.token
                    }
                }
            )
            alertS(result.data.message)
            history.push('/')

        } catch (error) {
            console.log(error)
            alertE('code  invalid')
        }


    }
    return (
        <>
          <Alert severity="info">Vérifiez votre boîte e-mail</Alert>
        <div className="check">

            <form onSubmit={(e) => sendV(e)}>
                <input ref={code} className="check__input" type="text" placeholder="code de verification" required />
                <button className="check__button">Verifier</button>
            </form>
        </div>
        </>
    )
}

export default Check
