import express, { response } from 'express'
import { connection } from './db/db.connections.js'
import cookieParser from 'cookie-parser'
import { configDotenv } from 'dotenv'
import cors from 'cors'

export const app = express()
configDotenv()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}))

const PORT = process.env.PORT || 5000
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true,limit:'16kb'}))

connection().then((data)=>{
    console.log("connection to db successfull ");
}).catch((error)=>{
    console.log("error in connection with database ");
} )

app.get('/',(req,res)=>{
   res.send("server is working")
})


// auth routes 
import authRoute from './routes/auth.routes.js'

app.use('/api/v1/auth',authRoute)


// food rotues
import foodRoute from './routes/foodItem.routes.js'

app.use('/api/v1/food',foodRoute)


// food partner routes
import foodPartnerRoute from './routes/foodPartner.routes.js'

app.use('/api/v1/foodpartner',foodPartnerRoute)



// global error handler 

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.statuscode || 500).json({message:err.message,success:false})
})