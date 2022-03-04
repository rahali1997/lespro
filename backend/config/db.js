
import mongoose from 'mongoose'

const ConnectDb = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://admin:admin123@cluster0.5l8yq.mongodb.net/store?retryWrites=true&w=majority",
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
