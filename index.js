import dotenv from "dotenv"
import app from "./src/app.js"
import {connectDB} from "./src/db/server.js"

dotenv.config({
    path: "./.env"
})

connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`💻 SERVER IS RUNNING AT PORT ${process.env.PORT}`)
    })
})
    .catch((err) => {
        console.log("MONGODB CONNECTION FAILED", err);
    })
