import React,{useEffect,useState} from 'react'
import Comment_item from '../comment_item/Comment_Item'
import './comment.css'
import axios from 'axios'

const Comment = ({details}) => {
    const [mycomment,setComment]=useState([])
    useEffect(()=>{
      const getAllComments=async()=>{
          try {
            let comments=await axios.get(`/api/user/comments/${details._id}`)
            await setComment(comments.data)
          } catch(err) {
              console.log(err)
          }
         

      }
      getAllComments()
    })

    return (
        <div className="comment">
             {mycomment.map(item=><Comment_item key={item.id} item={item} /> )}
              
        </div>
    )
}

export default Comment
