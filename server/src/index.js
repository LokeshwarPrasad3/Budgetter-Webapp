import dotenv from "dotenv";
dotenv.config({ path: ".env" })
const PORT = process.env.PORT;
import { app } from "./app.js";




app.on("error", () => {
    console.log("Error occured");
    throw error
})
app.listen(PORT, () => {
    console.log(`Server Listen at ${PORT}`);
})

