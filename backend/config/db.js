
import mongoose from 'mongoose'

const ConnectDb = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://ahmed77:ahmed77@build.0jcnp.mongodb.net/store?retryWrites=true&w=majority",
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