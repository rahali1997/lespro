import mongoose from 'mongoose'

const CommentSchema = mongoose.Schema({
  userId:{
      type:String,
  },

  comment:{
      type:String,
  },
  serviceId:{
      type:String,
      default:""
  }

}, { timestamps: true })

const Comment = mongoose.model('Comment', CommentSchema)

export default Comment;