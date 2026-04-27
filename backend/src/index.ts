import express from "express";
import controService from "./controService.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use('/api', controService);




app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});