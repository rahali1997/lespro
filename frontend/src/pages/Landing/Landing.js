import React, { useEffect, useState, useRef } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '../../components/card/Card'
import axios from 'axios'
import './landing.css'


const Landing = () => {
    const specRef = useRef()
    const regionRef = useRef()
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getAllServices = async () => {
            setLoading(true)
            try {
                let services = await axios.get('/api/user/services')
                setServices(services.data)
                setLoading(false)

            } catch (error) { console.log(error.message) }
        }
        getAllServices()
    }, [])
    function filter() {
        setLoading(true)
        async function getAllServices() {
            try {
                let services = await axios.get('/api/user/services')
                setServices(services.data)
                if (regionRef.current.value === "Tous" || specRef.current.value === "Tous") {
                    setServices(services.data)
                } else {
                    setServices(services.data.filter(item => item.region == regionRef.current.value && item.spec == specRef.current.value))
                }
                setLoading(false)
            } catch (error) { console.log(error.message) }
        }
        getAllServices()

    }
    return (<>
        <div className="home">
            <div className="home__body">
                <h1 className="home__title">VOUS PREVOYEZ DES TRAVAUX?</h1>
                <p className="home__des">LesPro VOUS MET EN RELATION AVEC LES PROFESSIONNELS DU BÂTIMENT</p>
            </div>
            <div className="home__img">
                <img src="./images/landing.PNG" />
            </div>
        </div>
        <div className="services-wrapper">
            <div className="services-select">
                <select  className="form-select" ref={specRef}
                    defaultValue={'Tous'}>
                    <option value='Tous'>Tous</option>
                    <option value='Electricité'>Electricité</option>
                    <option value="Plomberie">Plomberie</option>
                    <option value="Chauffage">Chauffage</option>
                    <option value="Climatisation">Climatisation</option>
                    <option value="Alarme">Alarme</option>
                </select>
                <select className="form-select" ref={regionRef}>
                    <option defaultValue={'Tous'}>Tous</option>
                    <option value="Tunis">Tunis</option>
                    <option value="Ariana">Ariana</option>
                    <option value="Manouba">Manouba</option>
                    <option value="sousse">Sousse</option>
                </select>
                <button onClick={() => filter()} id="btn__filter">Rechercher</button>
            </div>
            <div className="services-items">

                {loading ? <center style={{ marginTop: '20px' }}><CircularProgress /></center> : services.map(item => <Card key={item._id} item={item} />)}
            </div>
        </div>
    </>

    )
}

export default Landing
