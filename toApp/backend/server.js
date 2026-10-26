import express from 'express';
import cors from "cors" ;
import connectDB from './config/database.js';
import TaskRoutes from './routes/tasksRoutes.js';

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "https://todo-app-five-inky-77.vercel.app"]
}))
app.use("/tasks",TaskRoutes)
const startServer = async () => { 
    try{
        await connectDB();

        const PORT = process.env.PORT || 3005;
        app.listen(PORT, ()=>{
            console.log(`Serveur démarré sur le port ${PORT}`)
        })
    }
    catch(error){
        console.error("Impossible de démarrer le serveur:", error.message)
    }
    
} 


app.get('/',(req,res)=>{
    res.send("le serveur est en marche")
})



startServer()