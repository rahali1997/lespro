import React from 'react'

const Loader = () => {
    return (
        <div style={{textAlign:'center',marginLeft:"auto"}}>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    )
}

export default Loader
