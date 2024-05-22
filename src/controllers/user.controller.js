import User from "../models/user.model.js";
import bcrypt from "bcrypt";

async function register(req, res) {
    try {
        // console.log(req.body);
        const { username, email, password } = req.body;
        const userNameCheck = await User.findOne({ username });
        console.log(userNameCheck);
        if (userNameCheck) {
            return res.json({ message: "Username already exists.", status: false });
        }

        const emailCheck = await User.findOne({ email });

        if (emailCheck) {
            return res.json({ message: "Email already exists", status: false });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user=await User.create({
            username,
            email,
            password:hashedPassword
        });

        delete user.password;
        return res.status(201).json({message:"User created Successfully.",status:true,user});
    }
    catch (err) {   
        console.log(err);
    }



}

export { register };