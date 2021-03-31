import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './style.css'


const Comment_Item = ({ item }) => {
    const remove = async () => {
       if( window.confirm('voulez-vous vraiment supprimer ce commentaire ?')) {
        axios
            .post(`/api/user/remove`, { "commentID": item._id },
                {
                    headers: {
                        'header-token': localStorage.token
                    }
                })
            .then(res => console.log(res))
            .catch(err => console.log(err)) }
    }

    let d = {
        user: {
            id: "454dxs"
        }
    }
    try {

        d = jwt_decode(localStorage.token);

    } catch (err) {
        console.log(err)
    }

    return (
        <div className="commment-wrapper">
            <Avatar src={`/images/profile.png`} />
            <p className="Comment__item-name">Avis client</p>
            <div className="comment__box">
                <p>{item.comment}</p>
            </div>
            {d.user.id === item.userId ?
                <IconButton onClick={() => remove()} id="delete__button" aria-label="delete">
                    <DeleteIcon fontSize="small" />
                </IconButton> : ''

            }
        </div>
    )
}

export default Comment_Item
