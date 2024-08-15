import dotenv from "dotenv";
dotenv.config({ path: ".env" })
const PORT = process.env.PORT;
import { app } from "./app.js";
import connectToDb from "./db/conn.js";


connectToDb()
    .then(() => {
        app.on("error", () => {
            console.log("Error on Express App", error);
            throw error;
        })
        app.listen(PORT, () => {
            console.log(`Server Listen at PORT ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("Connection Failed!!", err);
        throw err;
    })

