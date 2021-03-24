import React, { useEffect, useState, useRef } from 'react'
import { alertE, alertS } from '../../Alert'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './contact.css'

const Contact = (props) => {
  const [state, setState] = useState({ phone: "", description: "" })
  let history = useHistory()
  let phoneR = useRef()
  let desR = useRef()
  useEffect(() => {
    function getUserData() {
      axios.get('/api/user/details',
        {
          headers: {
            'header-token': localStorage.token
          }
        }).then(res => setState({ phone: res.data.phone })).catch(err => console.log(err))
    }
    getUserData()

  }, [])

  const sendDemande = async (e) => {
    e.preventDefault()
    let email = props.location.data.name;
    let fullName = props.location.data.proName;
    let spec = props.location.data.spec;
    try {
      let result = await axios
        .post('/api/user/service/send',
          {
            "phone": phoneR.current.value,
            "description": desR.current.value,
            "email": email,
            "fullname": fullName,
            "spec": spec
          }, {
          headers: {
            'header-token': localStorage.token
          }
        })
      alertS('Demande envoyée')
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }



  return (
    <div className="contact">
      <form onSubmit={(e) => sendDemande(e)}>
        <input ref={phoneR} onChange={e => setState({ phone: e.target.value })} value={state.phone} className="contact__number" type="number" placeholder="Numero de telephone" required />
        <textarea ref={desR} className="contact__input" type="text" placeholder="
 Quel est ton problème ?" required />
        <button className="contact__button">Envoyer</button>
      </form>
    </div>
  )
}

export default Contact
