import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DemandeItem from '../../components/demandeItem/DemandeItem'
import CircularProgress from '@material-ui/core/CircularProgress';
import './demande.css'

const Demande = () => {
    const [loading, setLoading] = useState(false)
    const [demandes,setdemandes]=useState([])
    useEffect(() => {
        const getDemandesById = async () => {
            setLoading(true)
            try {
                let demandes = await axios
                    .get('/api/user/demande',
                        { headers: { 'header-token': localStorage.token } })
                await setdemandes(demandes.data)        
                setLoading(false)
                console.log(demandes)
            }
            catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
        getDemandesById()
    }, [])
    return (
        <div className="demande">
            <h3 className="demande__text">
                Vous avez envoyé une demande à:
            </h3>
             {loading ? <center style={{ marginTop: '20px' }}><CircularProgress /></center>:
               demandes.map(demande=><DemandeItem key={demande.id} demande={demande}/>)
             }
        </div>
    )
}

export default Demande
