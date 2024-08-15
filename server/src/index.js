import dotenv from "dotenv";
dotenv.config({ path: ".env" })
const PORT = process.env.PORT;


import express from "express";
const app = express();



app.get("/", (req, res) => {
    res.status(200).json({ success: true });
})


app.listen(PORT, () => {
    console.log(`Server Listen at ${PORT}`);
})

