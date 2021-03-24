import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    phone: {
        type: String,
        default: "none"

    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isRequestSubmitted: {
        type: Boolean,
        default: false
    },

    verifCode: {
        type: String,
    },


    role: {
        type: Number,

    },
    spec: {
        type: String,
        default: "none"
    },
    region: {
        type: String,
        default: 'none'
    },

    verifCode: {
        type:String
    },

    description: {
        type: String,
        default: "none"
    },
    fiscale:{
        type:String,
        default:"none",
    },
    isBlocked:{
        type:String,
        default:false
    }

}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

export default User;