import React, { useEffect, useState } from 'react'
import Comment from '../../components/comment/Comment'
import AddComment from '../../components/addComment/AddComment'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom'
import './details.css'

const DetailsPage = ({ match }) => {
    const [result, setResult] = useState({})
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            let token = localStorage.token
            try {
                let res = await axios
                    .get('/api/user/details',
                        { headers: { 'header-token': token } }
                    )
                await setResult(res.data)
                try {
                    let details = await axios.get(`/api/user/service/${match.params.id}`)
                    await setDetails(details.data)
                }
                catch (error) { console.log(error) }
            } catch (error) {
                console.log(error)
            }

            setLoading(false)

        }
        getData()
    }, [])
    return (
        <div>
            {loading === true ? <center> <CircularProgress /></center> :
                <div className="details-wrapper">
                    <div className="details-header">
                        <img className="card__image" src="/images/construction.PNG" />
                         <p className="details__proName">{details.fullName}</p>
                        <Link  to={{pathname:'/contact',data:{name:details.email,spec:details.spec,proName:details.fullName}}} className="Link">
                            {result === false ? '' : result.isEmailVerified ? <button id="details__btn">Contacter</button> :
                                <Link to="/check" className="Link"><button id="details__btnV">Verifier votre mail</button></Link>}
                        </Link>
                          <p className="card__spec-text">{details.spec}</p>
                    </div>
                    <div className="details-body">
                     <p className="details-text">{details.description}</p>
                    </div>
                    <div className="details__footer">
                        <p>{details.region}</p>
                    </div>
                    <Comment  details={details}  />
                    {result === false ? '' : result.isEmailVerified ? <AddComment details={details} /> : ''}
                </div>

            }

        </div>
    )
}

export default DetailsPage
