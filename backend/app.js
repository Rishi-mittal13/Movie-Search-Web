const express =  require("express") ; 
const app =  express() ; 
const mongoose  = require("mongoose") ; 
const dotenv =  require("dotenv") ; 
const authRoutes = require("./routes/auth") ; 
const cors = require("cors") ; 
const bodyParser =  require('body-parser') ; 
const helmet =  require("helmet") ; 
const  morgan = require("morgan") ; 
// const session = require('express-session');

app.use(express.json()) ; 
dotenv.config() ; 
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors()) ; 
app.use("/auth" , authRoutes) ; 
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.get('/' , (req , res)=>{
    res.send("<h1> Hello Pyare Bachho Kaise ho  </h1>")
});
const PORT = 6050; 
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  }) 
.catch((error) => console.log(`${error} did not connect`));
