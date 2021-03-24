import React from 'react'
import {Link} from 'react-router-dom'
import './card.css'

const Card = ({item}) => {
    return (
        <div className="card">
            <div className="card__title">
                <img className="card__image" src="./images/construction.PNG" />
                <p className="card__title-text">{item.fullName}</p>
                {/* <img className="card__job" src="./images/suitcase.png" /> */}
                 <p className="card__spec-text">{item.spec}</p>
                 <Link className="link" to={`/details/${item._id}`}><p className="card__title-details">Voir Détails</p></Link>
            </div>
            <div className="card__body">
               <p>
                {item.description.slice(1,100)}...
               </p>
            </div>
            <div className="card__footer">
              <p>{item.region}</p>
            </div>
        </div>
    )
}

export default Card
