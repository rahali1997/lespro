
import mongoose from 'mongoose'

const ConnectDb = async () => {
    try {
        const conn = await mongoose.connect("put your mongouri here !",
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
            })
        console.log("MongoDB Connected")

    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

export default ConnectDb;