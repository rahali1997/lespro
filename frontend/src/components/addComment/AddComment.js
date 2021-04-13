import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import './style.css'



const AddComment = ({ details }) => {
    const [comment, setComment] = useState('')


    const sendComment = async (e) => {
        e.preventDefault()
        if (comment !== "") {
            try {
                let result = await axios
                    .post("/api/user/add", { "comment": comment, "serviceId": details._id }, {
                        headers: {
                            "header-token": localStorage.token
                        }
                    })
                setComment('')
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <div className="comment-area">

            <input onChange={e => setComment(e.target.value)} value={comment} type="text" placeholder="Donner ton avis" required />
            <div className='iconbtn'>
                <form>
                    <IconButton onClick={(e) => sendComment(e)} className="IconButton" required><SendIcon className="sendIcon" /></IconButton>
                </form>
            </div>
        </div>
    )
}

export default AddComment
