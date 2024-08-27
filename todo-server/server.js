import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connect } from "./dataBase/conn.js";
import router from "./routes/router.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.status(200).json("Welocome to shapify Todo");
});

app.use('/api',router)

app.listen(PORT, () => {
  connect()
    .then(() => {
      console.log(`Server running on port http://localhost:${PORT}/`);
    })
    .catch((err) => console.log(err));
});
