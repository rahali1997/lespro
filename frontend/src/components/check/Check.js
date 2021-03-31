import React, { useRef,useState } from 'react'
import { useHistory } from 'react-router-dom'
import { alertS, alertE } from '../../Alert'
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import './check.css'



const Check = () => {
    const [Code,setCode]=useState("5")
    const history = useHistory()
    const sendV = async (e) => {
        e.preventDefault()
        try {
            let result = await axios.post('http://127.0.0.1:5000/api/user/verify',
                { "verifcode": Code},
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
          <center>
          <Alert id="myalert"  severity="info">Vérifiez votre boîte mail</Alert>
          </center>
          
        <div className="check">

            <form onSubmit={(e) => sendV(e)}>
               <TextField onChange={(e)=>setCode(e.target.value)}  value={Code} className="check__input" id="standard-basic" label="code de verification" required />
                {/* <input className="check__input" type="text" placeholder="code de verification" required /> */}
                <button className="check__button">Verifier</button>
            </form>
        </div>
        </>
    )
}

export default Check
