import React from 'react'
import './demandeItem.css'

const DemandeItem = ({demande}) => {
    return (
        <div className="demande__item">
            <img className="demande__icon" src="/images/telegram.png"/>
             <h4 className="to">{demande.fullName}</h4>
             <h4 className="job">Specialité</h4>
             <h4 className="jobtitle">{demande.spec}</h4>
        </div>
    )
}

export default DemandeItem
