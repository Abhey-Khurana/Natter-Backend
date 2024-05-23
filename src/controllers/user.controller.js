import User from "../models/user.model.js";
import bcrypt from "bcrypt";

async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        const userNameCheck = await User.findOne({ username });
        // console.log(userNameCheck);
        if (userNameCheck) {
            return res.json({ message: "Username already exists.", status: false });
        }

        const emailCheck = await User.findOne({ email });

        if (emailCheck) {
            return res.json({ message: "Email already exists", status: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        delete user.password;
        // console.log(user);
        return res.status(201).json({ message: "User created Successfully.", status: true, user });
    }
    catch (err) {
        next(err);
    }



}

async function login(req, res) {
    try {
        // console.log(req.body);


        const { username, password } = req.body;
        const user = await User.findOne({ username });
        // console.log(user);

        if (!user) {
            return res.json({ message: "Enter Correct Username.", status: false });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.json({ message: "Enter Correct Password.", status: false });
        }

        delete user.password;
        return res.status(201).json({ message: "User Logged in Successfully.", status: true, user });
    }
    catch (err) {
        next(err);
    }
}

async function setAvatar(req, res, next) {
    // console.log(req.params);
    try {
        const userId = req.params.id;
        const avatarImage = req.body.avatarImage;

        const userData = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet: true,
                avatarImage,
            },
            { new: true }
        );

        return res.status(200).json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage
        });
    }
    catch (err) {
        next(err);
    }

}
async function getAllUsers(req, res, next) {

    // console.log(req.params);
    try {
        const currUserId = req.params.id;
        const allusers = await User.find({ _id: { $ne: currUserId } }).select([
            "_id",
            "email",
            "username",
            "avatarImage"
        ]);
        return res.json(allusers);
    }
    catch (err) {
        next(err);
    }

}

export { register, login, setAvatar, getAllUsers };