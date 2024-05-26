require("dotenv").config();

const express = require('express');
const cors = require('cors');

const connectDB = require("./config/db");
const router = require("./routes/users");
const errorHandler = require("./middleware/error");

connectDB();



const port = process.env.PORT || 5000;

const app = express();

//middlewares
app.use(cors({
    origin:'*'
}));
app.use(express.json())


app.use("/api/users", router);

app.use("/",(req,res)=>{
    return res.json({
        message: "Welcome to the node.js REST API using ExpressJS and MongoDB",
    })
});

app.use(errorHandler);

const server = app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
})


process.on("unhandledRejection",(error,promise)=>{
    console.log(`Logged Error : ${error}`);
    server.close(()=> process.exit(1));
})