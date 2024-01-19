const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

//import routes middleware
const schedulesRouter=require("./routes/schedules.routes")

//use  routes middlewares
//https://data-plant-assignment-rho.vercel.app
app.use(
  cors({
    origin: `https://data-plant-assignment-rho.vercel.app`,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    credentials: true,
  })
);
app.use(express.json());
app.use("/schedules", schedulesRouter)





app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
