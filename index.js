const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

//Rate Limiting
const limiter = rateLimit({
  windowMs: 1 * 1000,
  max: 15,
});

app.use(limiter);
app.set("trust proxy, 1");
//Enable cors
app.use(cors());

app.use("/summoner", require("./routes/riot"));

app.set;
app.listen(PORT, () => console.log("workin"));
