import React, { useEffect, useContext, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom'
import Request from '../../components/request/Request'
import Waiting from '../../components/waiting/Waiting'
import Edit from '../editService/Edit'
import AuthContext from '../../AuthContext'
import axios from 'axios'

import './service.css'

const Service = () => {
    const [loading, setLoading] = useState(false)
    const [isSubmitted, setSub] = useState({ isRequestSubmitted: false, isVerified: false })
    const history = useHistory()
    const userauth = useContext(AuthContext)

    useEffect(() => {

        if (!userauth.state) {
            history.push('/login')
        } else {
            history.push('/service')
        }
    }, [])
    useEffect(() => {
        setLoading(true)
        const getResult = async () => {
            let res = await axios
                .get('/api/user/details',
                    {
                        headers: {
                            'header-token': localStorage.token
                        }
                    }
                )
            await setSub({ isRequestSubmitted: res.data.isRequestSubmitted, isVerified: res.data.isVerified })
            setLoading(false)

        }
        getResult()
    }, [])
    return (
        <>
            {loading ? <center><CircularProgress /></center> :
                <div className="service">
                    {isSubmitted.isRequestSubmitted === false ?
                        <Request /> : isSubmitted.isVerified === false ?
                            <Waiting /> : <Edit />}
                </div>
            }

        </>
    )
}

export default Service
