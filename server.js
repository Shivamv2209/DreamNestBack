import express from "express";
import db from "./controllers/mongoose_connection.js"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import listingroutes from "./routes/listingRoutes.js" 
import bookingroutes from "./routes/bookingRoutes.js"
import triproutes from "./routes/tripRoutes.js"


const app = express();

const port =3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/auth",userRoutes)
app.use("/list",listingroutes);
app.use("/book",bookingroutes); 
app.use("/triplist",triproutes)




app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})