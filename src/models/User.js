import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: { type:String, required:true, unique:true },
    username: { type:String, required:true, unique:true },
    password: { type:String, required:true },
    name: { type:String, required:true },
    location:String,
})

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 5); //5는 saltRound 자리, hash를 5번해서 저장하겠단 뜻
})

const User = mongoose.model("User", userSchema);

export default User;
