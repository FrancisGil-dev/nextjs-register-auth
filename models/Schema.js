import mongoose from "mongoose";


const {Schema} = mongoose;
const userSchema = new Schema(
    {
        email:{
            type: String,
            unique : true,
            required :true,
        },
        password:{
            type: String,
            required: true,
            unique: true
        }
    },
    {timestamps: true}
)

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User
