import mongoose from "mongoose";

const connectDb = async () => {
    if(mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGODB_URI)
    .catch(err => console.error(err))
    
}
export default connectDb
