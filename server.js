import {app} from './src/app.js'
import { configDotenv } from 'dotenv'
configDotenv()
const PORT = process.env.PORT || 5000
app.listen(PORT,(req,res,next)=>{
    console.log("server is listening to a ",PORT)
})