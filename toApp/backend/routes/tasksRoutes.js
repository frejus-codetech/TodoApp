import mongoose from "mongoose";
import express, { json } from "express"
import Task from "../models/tasks.js";

const router = express.Router();


//Récupérer toutes les tâches

router.get("/", async(req,res)=> {
    try{
        const task = await Task.find().sort({createAt: -1});

        res.status(200).json(task);
    }

    catch(error){
        console.error(error)

        res.status(500).json({ 
            message: "erreur lors de la récupération des tâches"
        });
    }
}) 

//Récupérer une tâche par son identifiant

router.get("/:id" , async(req, res)=>{
    if( !mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({
            message:"Identifiant invalide"
        })
    }

    try{
        const task = await Task.findById(req.params.id)
        
        if(!task){
            return res.status(404).json({
                message:"Tache introuvable"
            })
        }

        res.status(200).json(task);
    }
    catch(error){
        console.error(error)

        res.status(500).json({ 
            message: "erreur lors de la récupération de la tâches"
        });
    }
})

//Créer une tâche

router.post("/", async (req,res)=>{

    const title = req.body?.title ;

    if(typeof title !== "string" || title.trim() === ""){
        return res.status(400)({
            message:"la tâche est obligatoire"
        })
    }

    try{
        const task = await Task.create({
            title: title.trim(),
            completed: false
        })

        res.status(200).json({
            message: "Tâche créée avec succès", task
        })
    }
    catch(error){
        console.error(error)

        res.status(500).json({ 
            message: "erreur lors de la création de la tâche"
        });
    }

})


// Update a task

router.patch("/:id", async (req,res)=>{

    if( !mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({
            message:"Identifiant invalide"
        })
    }

    const update = {};
if (Object.hasOwn(req.body ?? {}, "title")){
    if(typeof req.body.title !== "string" || req.body.title.trim() === ""){
        return res.status(400).json({
            message:"le title ne peut pas être vide"
        })
    }

    update.title = req.body.title.trim()
}

if (Object.hasOwn(req.body ?? {}, "completed")){
    if(typeof req.body.completed !== "boolean"){
        return res.status(400).json({
            message:"completed doit être un boléen"
        })
    }

    update.completed = req.body.completed;
}

    if (Object.keys(update).length === 0) {
        return res.status(400).json({
            message: "Aucun champ valide à modifier."
        });
    }

    try{
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            update,{
                new:true,
                runValidators:true
            })

        if(!task){
        res.status(404).json({
            message:"Tâche introuvable"
        })
        }

        res.status(200).json({
            message:"Tâche modifiée avec succès", task
        })
    }
    catch(error){
        console.error(error)

        res.status(500).json({ 
            message: "erreur lors de la modification des tâches"
        });
    }

    



})




//Delete a task

router.delete("/:id" , async(req, res)=>{
    if( !mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({
            message:"Identifiant invalide"
        })
    }

    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        
        if(!task){
            return res.status(404).json({
                message:"Tache introuvable"
            })
        }

        res.status(200).json({
            message:"Task delete with success"
        });
    }
    catch(error){
        console.error(error)

        res.status(500).json({ 
            message: "erreur lors de la suppression de la tâches"
        });
    }
})

export default router

 