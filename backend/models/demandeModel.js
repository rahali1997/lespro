import mongoose from 'mongoose'

const demandeSchema = mongoose.Schema({

    userId: {
        type: String,

    },

    fullName: {
        type: String,
        default: "none"

    },
    spec: {
        type: String,
        default: "none"

    }

},{ timestamps: true })

const Demande = mongoose.model('Demande', demandeSchema)

export default Demande
